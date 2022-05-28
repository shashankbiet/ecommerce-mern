const mongoose = require("mongoose");
require("dotenv").config();
let dbUrl = process.env.MONGO_URL;

module.exports = async () => {
    await mongoose
        .connect(dbUrl)
        // eslint-disable-next-line
        .then(() => console.log("MongoDB connected"))
        // eslint-disable-next-line
        .catch((err) => console.log(err));
};
