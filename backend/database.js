const {Pool} = require("pg");
require("dotenv").config();
const conString = "postgres://xuqelbsh:X1LJj-YbnpvdMFNVYcfHEq_mEHtNLwmg@rosie.db.elephantsql.com/xuqelbsh"

const pool = new Pool({
    connectionString: conString,
    ssl: conString ? { rejectUnauthorized: false } : false, 
});

module.exports.pool = pool;

module.exports.initializeDatabase = async () => {
    const client = await pool.connect();
    // just testing
    // client.query(`Select * from users`, (err, res) => {
    //     if (!err) {
    //         console.log(res.rows);
    //     } else {
    //         console.log(err.message);
    //     }
    // })
    client.release();
};
