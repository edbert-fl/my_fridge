const createClient = require("@azure-rest/ai-vision-image-analysis").default;
const { AzureKeyCredential } = require("@azure/core-auth");

// Retrieve Azure Cognitive Services Vision API endpoint and key from environment variables
require("dotenv").config();

const endpoint =
  "https://elim3247-research-image-analysis.cognitiveservices.azure.com/"; // TODO: Move to .env
const key = "52cc7bcbdf0a459dbd16ce4075c051e7"; // TODO: Move to .env

const credential = new AzureKeyCredential(key);
const client = createClient(endpoint, credential);

// Specify the features to request from Vision API
const features = ["Read"];

async function analyzeImage(uint8Array) {
  const response = await client.path("/imageanalysis:analyze").post({
    body: uint8Array,
    queryParameters: {
      features: features,
    },
    contentType: "application/octet-stream",
  });

  const iaResult = response.body;

  let result = [];
  if (iaResult.readResult) {
    iaResult.readResult.blocks.forEach((block) =>
      block.lines.forEach((line) => result.push(line.text))
    );
  }

  return result;
}

module.exports = {
  analyzeImage
};
