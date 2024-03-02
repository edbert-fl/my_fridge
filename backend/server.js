const express = require("express");
const cors = require("cors");
const http = require("http");
const { ExitStatus } = require("typescript");

const app = express();
app.use(cors());
app.use(express.json());
require("dotenv").config();

const { initializeRoutes } = require("./routes");
const { initializeDatabase } = require("./database");

initializeRoutes(app);
initializeDatabase();

const PORT = 3000;

// Create an HTTP server using Express app
http.createServer(app).listen(PORT, function() {
    console.log(`CORS-enabled web server listening on port ${PORT}`);
});