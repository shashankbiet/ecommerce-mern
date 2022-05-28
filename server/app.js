const express = require("express");
const routes = require("./config/route");
const apiErrorHandler = require("./middleware/apiErrorHandler");
const notFoundHandler = require("./middleware/notFoundHandler");
const mongodb = require("./config/mongodb");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Database
mongodb();

app.use(function (req, res, next) {
    //Remove headers
    res.removeHeader("X-Powered-By");

    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");

    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, HEAD, OPTIONS"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, ContentType, Content-Type, Accept, Authorization"
    );
    res.header(
        "Strict-Transport-Security",
        "max-age=15552000; includeSubDomains; preload;"
    );
    res.header("X-Frame-Options", "DENY");
    res.header("X-XSS-Protection", "1; mode=block");
    res.header("X-Content-Type-Options", "nosniff");
    res.header(
        "Content-Security-Policy",
        "default-src 'none'; script-src 'self'; style-src 'self'; object-src 'none'"
    );
    res.header("Referrer-Policy", "same-origin");
    next();
});

//Routes
routes(app);

//Not Found
app.use(notFoundHandler);

//Error Handling
app.use(apiErrorHandler);

module.exports = app;
