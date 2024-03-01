const {Pool} = require("pg");
require("dotenv").config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false, 
});

module.exports.pool = pool;

module.exports.initializeDatabase = async () => {
    const client = await pool.connect();
    client.query(`Select * from users`, (err, res) => {
        if (!err) {
            console.log(res.rows);
        } else {
            console.log(err.message);
        }
    })
    client.release();
};
