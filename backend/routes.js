const {pool} = require("./database");
module.exports.initializeRoutes = (app) => {
    app.get("/api", function (req, res, next) {
        res.json({msg: "This is CORS-enabled for all origins!"});
    })
}