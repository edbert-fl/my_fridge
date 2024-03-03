const bcrypt = require("bcrypt");
const { analyzeImage } = require("./vision");
const multer = require("multer");
const sharp = require("sharp");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { pool } = require("./database");

const { OpenAI } = require("openai");

const OPEN_AI_API_KEY = "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";

function convertToItem(data) {
  return {
    itemID: data.itemid,
    receiptID: data.receiptid,
    name: data.name,
    quantity: parseInt(data.quantity),
    expiryDate: new Date(data.expirydate),
    weight: parseFloat(data.weight),
    price: null,
    healthRating: data.healthrating,
    healthComment: data.healthcomment,
    art: data.art,
  };
}

module.exports.initializeRoutes = (app) => {
  app.get("/api", function (req, res, next) {
    res.json({ msg: "This is CORS-enabled for all origins!" });
  });

  app.post("/user/login", async function (req, res) {
    const { email, password } = req.body;
    let client;

    try {
      client = await pool.connect();
      const userResult = await client.query(
        "SELECT * FROM USERS WHERE email = $1",
        [email]
      );

      const userResultData = userResult.rows[0];

      if (userResult.rows.length === 1) {
        const storedHashedPassword = userResultData.hashedpassword;
        const salt = userResultData.salt;

        const hashedInputPassword = await bcrypt.hash(password, salt);

        if (hashedInputPassword === storedHashedPassword) {
          res.json({
            user: userResultData,
            message: "Authentication successful!",
          });
        } else {
          res.status(401).json({ error: "Authentication failed" });
        }
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      console.log("Error logging in user", error);
      res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
    } finally {
      if (client) {
        client.release();
      }
    }
  });

  app.post("/user/register", async function (req, res) {
    const { username, email, password, healthGoals, healthConditions } =
      req.body;
    let client;

    try {
      client = await pool.connect();
      const generatedSalt = await bcrypt.genSalt(16);
      const hashedPassword = await bcrypt.hash(password, generatedSalt);
      const result = await client.query(
        "INSERT INTO USERS (username, email, hashedPassword, salt, healthGoals, healthConditions) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [
          username,
          email,
          hashedPassword,
          generatedSalt,
          healthGoals,
          healthConditions,
        ]
      );
      console.log("Resulting Data:", result.rows[0]);
      res.json({
        user: result.rows[0],
        message: "User added successfully!",
      });
    } catch (error) {
      console.log("Error adding user", error);
      res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
    } finally {
      if (client) {
        client.release();
      }
    }
  });

  app.post("/user/register", async function (req, res) {
    const { displayName, email, password } = req.body;
    let client;

    try {
      client = await pool.connect();
      const generatedSalt = await bcrypt.genSalt(16);
      const hashedPassword = await bcrypt.hash(password, generatedSalt);
      const result = await client.query(
        "INSERT INTO USERS (username, email, hashed_password, salt) VALUES ($1, $2, $3, $4) RETURNING *",
        [displayName, email, hashedPassword, generatedSalt]
      );
      console.log("Resulting Data:", result.rows[0]);
      res.json({
        user: result.rows[0],
        message: "User added successfully!",
      });
    } catch (error) {
      console.log("Error adding user", error);
      res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
    } finally {
      if (client) {
        client.release();
      }
    }
  });

  app.post("/receipt/scan", async function (req, res, next) {
    const { receiptData, healthGoals, healthConditions } = req.body;

    // Some magic...
    const openai = new OpenAI({
      apiKey: OPEN_AI_API_KEY,
    });
    const userPrompt = `${receiptData} \n this person has ${healthConditions} and is aiming for ${healthGoals} provide recommendation`;
    const systemPrompt = `Use the following step-by-step instructions to respond to user inputs that come from scanning a receipt and transform it into a JSON data. Never assume the store. If there is no data in any field then return null.

        Step 1 - look for a supermarket name in the data.

        Step 2 - look for the supermarket store location in the data.

        Step 3 - look for the Date: dd/mm/year in the data.

        Step 4 - extract all the food items in the data. The data are the name and quantity.

        Step 5 - assume the food category from the name. either fresh produce or packaged food

        Step 6 - health rating is from 1 - 5. Make an assumption on the health benefit.

        Step 7 - for the health comment make an assumption and elaborate on the health benefits minimum 20 words.

        Step 8 - ALWAYS Return them in JSON like this:

        {
            "store_name": ...,
            "store_location": ...,
            "date_of_purchase": ...,
            "items": [
                {
                    "item_name": ...,
                    "food_category":...,
                    "quantity": ...,
                    "health_rating": ...,
                    "health_comment": ...
                }
            ],
            "recommendation": ...,
        }`;
    let result;
    let success = false;
    let retryCount = 0;
    const maxRetries = 3;

    while (!success && retryCount < maxRetries) {
      try {
        const completion = await openai.chat.completions.create({
          messages: [
            { role: "user", content: userPrompt },
            { role: "system", content: systemPrompt },
          ],
          model: "gpt-3.5-turbo",
          max_tokens: 2000,
        });

        console.log(
          "RESPONSE FROM OPEN AI: ",
          completion.choices[0].message.content
        );
        result = JSON.parse(completion.choices[0].message.content);
        success = true;
      } catch (error) {
        console.error("Error occurred during completion:", error);
        retryCount++;
        console.log(`Retrying... Attempt ${retryCount}/${maxRetries}`);
      }
    }

    if (success) {
      res.json({ result });
    } else {
      res
        .status(500)
        .json({ error: "Failed to generate correct JSON after retries" });
    }
  });

  app.post("generate/recipe", async function (req, res, next) {
    const { receiptData, healthGoals, healthConditions } = req.body;
    const openai = new OpenAI({
      apiKey: OPEN_AI_API_KEY,
    });
    const userPrompt = `5 recipes and macros for ${healthGoals} from beef chicken potato`;
    const systemPrompt = `you are a helpful assistant that is given list of ingredients and u need to give an JSON output like this:

        {
            "recipe_name": "Spicy Chili Beef Broccoli Stir-Fry",
            "ingredients": {
                "Beef strips",
                "Broccoli florets",
                "Chili sauce",
                "Soy sauce",
                "Garlic",
                "Ginger",
                "Cornstarch",
                "Vegetable oil",
                "Salt",
                "Pepper"
            },
            "instructions": {
                "1. In a bowl, mix chili sauce, soy sauce, minced garlic, grated ginger, and cornstarch to make the marinade.",
                "2. Marinate beef strips in the mixture for 30 minutes.",
                "3. Heat vegetable oil in a wok or skillet over high heat.",
                "4. Stir-fry marinated beef until browned. Remove from the wok and set aside.",
                "5. In the same wok, stir-fry broccoli florets until tender-crisp.",
                "6. Return the beef to the wok and toss with the broccoli.",
                "7. Season with salt and pepper to taste.",
                "8. Serve hot."
            },
            "macro": {
                "calories": "375 kcal",
                "protein": "25g",
                "carbohydrates": "15g",
                "fat": "24g",
                "sodium": "1080mg"
            }
        }
        `;
    let result;
    let success = false;
    let retryCount = 0;
    const maxRetries = 3;

    while (!success && retryCount < maxRetries) {
      try {
        const completion = await openai.chat.completions.create({
          messages: [
            { role: "user", content: userPrompt },
            { role: "system", content: systemPrompt },
          ],
          model: "gpt-3.5-turbo",
          max_tokens: 2000,
        });
        result = JSON.parse(completion.choices[0].message.content);
        success = true;
      } catch (error) {
        console.error("Error occurred during completion:", error);
        retryCount++;
        console.log(`Retrying... Attempt ${retryCount}/${maxRetries}`);
      }
    }

    if (success) {
      res.json({ result });
    } else {
      res
        .status(500)
        .json({ error: "Failed to generate correct JSON after retries" });
    }
  });

  /* 
    Endpoint to read a receipt.
    Expects a POST request with a single 'image' file.
  */
  app.post("/receipt/read", upload.single("image"), async (req, res) => {
    // Extract the file from the request
    const file = req.file;

    try {
      if (file) {
        // Convert the file to a uint8Array for analysis
        const imageBuffer = await sharp(file.buffer).toBuffer();
        const uint8Array = new Uint8Array(imageBuffer);

        // Analyze the image to check if a person is present
        const textFromImage = await analyzeImage(uint8Array);

        // Respond with the analysis result
        res.json({
          textFromImage: textFromImage,
        });
      } else {
        console.log("Error: No file found");
      }
    } catch (error) {
      // Handle errors during image verification
      console.error("Error reading receipt", error);
      res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
    }
  });

  app.get("/receipts/:userID", async function (req, res) {
    const { userID } = req.params;

    try {
      const query = `SELECT * FROM Receipts WHERE userID = $1`;
      const { rows } = await pool.query(query, [userID]);
      res.json({ receipts: rows });
    } catch (error) {
      console.error("Error fetching receipts:", error);
      res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
    }
  });

  // Route to get all items in a particular receipt based on receiptID
  app.get("/items/:receiptID", async function (req, res) {
    const { receiptID } = req.params;

    try {
      const query = `SELECT * FROM Items WHERE receiptID = $1`;
      const { rows } = await pool.query(query, [receiptID]);

      const items = rows.map((row) => convertToItem(row));

      res.json({ items });
    } catch (error) {
      console.error("Error fetching items:", error);
      res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
    }
  });

  // Route to get all items for a particular user that have not yet expired
  app.get("/user/:userID/items/notexpired", async function (req, res) {
    const { userID } = req.params;

    try {
      const query = `SELECT i.* 
                       FROM Items i
                       JOIN Receipts r ON i.receiptID = r.receiptID
                       WHERE r.userID = $1 AND i.expiryDate > CURRENT_DATE`;
      const { rows } = await pool.query(query, [userID]);
      res.json({ items: rows });
    } catch (error) {
      console.error("Error fetching items:", error);
      res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
    }
  });

  // Route to insert a new receipt
  app.post("/receipts", async function (req, res) {
    const { userID, store, dateOfPurchase, healthRating } = req.body;

    console.log(userID, store, dateOfPurchase, healthRating);

    try {
      const query = `INSERT INTO Receipts (userID, store, dateOfPurchase, healthRating)
                       VALUES ($1, $2, $3, $4) RETURNING *`;
      const { rows } = await pool.query(query, [
        userID,
        store_name,
        date_of_purchase,
        health_rating,
      ]);
      res.json({ receipt: rows[0] });
    } catch (error) {
      console.error("Error inserting receipt:", error);
      res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
    }
  });

  app.post("/items", async function (req, res) {
    const items = req.body.items;

    try {
      // Prepare the query string
      const query = `INSERT INTO Items (receiptID, name, quantity, expiryDate, weight, price, healthRating, healthComment)
                   VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;

      // Prepare an array to hold all inserted items
      const insertedItems = [];

      // Iterate over each item in the request body
      for (const item of items) {
        // Execute the query for each item
        const { rows } = await pool.query(query, [
          item.receiptID,
          item.name,
          item.quantity,
          item.expiryDate,
          item.weight,
          item.price,
          item.healthRating,
          item.healthComment,
        ]);

        // Push the inserted item to the array
        insertedItems.push(rows[0]);
      }

      // Respond with the array of inserted items
      res.json({ items: insertedItems });
    } catch (error) {
      console.error("Error inserting items:", error);
      res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
    }
  });
};
