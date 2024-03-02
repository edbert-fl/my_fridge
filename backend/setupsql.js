const { Pool } = require("pg");

// Database connection configuration
const conString =
  "postgres://xuqelbsh:X1LJj-YbnpvdMFNVYcfHEq_mEHtNLwmg@rosie.db.elephantsql.com/xuqelbsh";
const pool = new Pool({
  connectionString: conString,
  ssl: conString ? { rejectUnauthorized: false } : false,
});

// Function to create tables
const createTables = async () => {
  try {
    // Connect to the database
    const client = await pool.connect();

    // Create Users table
    await client.query(`
            CREATE TABLE IF NOT EXISTS Users (
                userID SERIAL PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                salt VARCHAR(255) NOT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                healthConditions VARCHAR(255)[] DEFAULT NULL,
                healthGoals VARCHAR(255)[] DEFAULT NULL
            )
        `);

    // Create Receipts table
    await client.query(`
            CREATE TABLE IF NOT EXISTS Receipts (
                receiptID SERIAL PRIMARY KEY,
                userID INT NOT NULL,
                store VARCHAR(255) NOT NULL,
                dateOfPurchase DATE NOT NULL,
                healthRating INT NOT NULL CHECK (healthRating >= 1 AND healthRating <= 10),
                FOREIGN KEY (userID) REFERENCES Users(userID)
            )
        `);

    // Create Items table
    await client.query(`
            CREATE TABLE IF NOT EXISTS Items (
                itemID SERIAL PRIMARY KEY,
                receiptID INT NOT NULL,
                name VARCHAR(255) NOT NULL,
                quantity INT NOT NULL,
                expiryDate DATE NOT NULL,
                weight NUMERIC DEFAULT NULL,
                price NUMERIC DEFAULT NULL,
                healthRating INT NOT NULL CHECK (healthRating >= 1 AND healthRating <= 10),
                healthComment TEXT NOT NULL,
                FOREIGN KEY (receiptID) REFERENCES Receipts(receiptID)
            )
        `);

    // Release the client
    client.release();

    console.log("Tables created successfully");
  } catch (error) {
    console.error("Error creating tables:", error);
  } finally {
    // End the client pool to close all connections
    await pool.end();
  }
};

// Call the function to create tables
createTables();
