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

    // Check if the -d flag is provided
    const deleteTablesFlag = process.argv.includes("-d");

    if (deleteTablesFlag) {
      // Drop all tables if the -d flag is provided
      await client.query(`
        DROP TABLE IF EXISTS Items;
        DROP TABLE IF EXISTS Receipts;
        DROP TABLE IF EXISTS Users;
      `);
      console.log("Tables deleted successfully");
    } else {
      // Create Users table
      await client.query(`
            CREATE TABLE IF NOT EXISTS Users (
                userID SERIAL PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                hashedPassword VARCHAR(255) NOT NULL,
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
                quantity VARCHAR(255) NOT NULL,
                expiryDate DATE NOT NULL,
                weight VARCHAR(255) DEFAULT NULL,
                healthRating INT NOT NULL CHECK (healthRating >= 1 AND healthRating <= 10),
                healthComment TEXT NOT NULL,
                art VARCHAR(255),
                FOREIGN KEY (receiptID) REFERENCES Receipts(receiptID)
            )
        `);
      console.log("Tables created successfully");
    }

    // Release the client
    client.release();
  } catch (error) {
    console.error("Error creating/deleting tables:", error);
  } finally {
    // End the client pool to close all connections
    await pool.end();
  }
};

// Call the function to create/delete tables
createTables();
