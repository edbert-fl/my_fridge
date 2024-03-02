const {pool} = require("./database");
const { OpenAI } = require('openai');

module.exports.initializeRoutes = (app) => {
    app.get("/api", function (req, res, next) {
        res.json({msg: "This is CORS-enabled for all origins!"});
    })

    app.post("/scan/receipt",  async function (req, res, next) {
        const { receiptData, healthGoals, healthConditions } = req.body;
        
        // Some magic... 
        const openai = new OpenAI({ apiKey: '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'});
        const userPrompt = `${receiptData} \n this person has ${healthConditions} and is aiming for ${healthGoals} provide recommendation`
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
            store_name: ...,
            store_location: ...,
            date_of_purchase: ...,
            items: [
                {
                    item_name: ...,
                    food_category:...,
                    quantity: ...,
                    health_rating: ...,
                    health_comment: ...,
                }
            ],
            recommendation: ...,
        }`
        let result;
        let success = false;
        let retryCount = 0;
        const maxRetries = 3;

        while (!success && retryCount < maxRetries) {
            try {
                const completion = await openai.chat.completions.create({
                    messages: [
                        { role: "user", content: userPrompt },
                        { role: "system", content: systemPrompt }
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
            res.status(500).json({ error: "Failed to generate correct JSON after retries" });
        }
    })

    app.post("generate/recipe", async function (req, res, next) {
        const { receiptData, healthGoals, healthConditions } = req.body;
        const openai = new OpenAI({ apiKey: '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'});
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
        `
        let result;
        let success = false;
        let retryCount = 0;
        const maxRetries = 3;

        while (!success && retryCount < maxRetries) {
            try {
                const completion = await openai.chat.completions.create({
                    messages: [
                        { role: "user", content: userPrompt },
                        { role: "system", content: systemPrompt }
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
            res.status(500).json({ error: "Failed to generate correct JSON after retries" });
        }
    })
}