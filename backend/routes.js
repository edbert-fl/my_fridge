const bcrypt = require("bcrypt.js");

const {pool} = require("./database");
module.exports.initializeRoutes = (app) => {
    app.get("/api", function (req, res, next) {
        res.json({msg: "This is CORS-enabled for all origins!"});
    })

    app.post("/user/register", async function(req, res) {
        const { displayName, email, password } = req.body;
        let client;

        try {
            client = await pool.connect();
            const generatedSalt = await bcrypt.genSalt(16);
            const hashedPassword = await bcrypt.hash(password, generatedSalt);
            const result = await client.query(
                "INSERT INTO USERS (username, email, hashed_password, salt) VALUES ($1, $2, $3, $4) RETURNING *",
                [
                    displayName,
                    email,
                    hashedPassword,
                    generatedSalt,
                ]
            );
            console.log("Resulting Data:", result.rows[0]);
            res.json({
                user: result.rows[0],
                message: "User added successfully!",
            })
        } catch (error) {
            console.log("Error adding user", error);
            res.status(500).json({error: "Internal Server Error", details: error.message});
        } finally {
            if (client) {
                client.release();
            }
        }
    })

}