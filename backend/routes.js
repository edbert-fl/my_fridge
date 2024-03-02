// routes.js
const { analyzeImage } = require("./vision");
const multer = require("multer");
const sharp = require("sharp");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports.initializeRoutes = (app) => {
  app.get("/api", function (req, res, next) {
    res.json({ msg: "This is CORS-enabled for all origins!" });
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
      console.error("Error verifying person", error);
      res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
    }
  });
};
