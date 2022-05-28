const winston = require("winston");
const { createLogger, transports, format } = require("winston");
require("dotenv").config();

const getFileName = () => {
    return (
        [new Date().getMonth(), new Date().getUTCFullYear()].join("-") + ".server"
    );
};

const logger = createLogger({
    transports: [
        new transports.File({
            filename: "./logs/" + getFileName() + ".log",
            format: format.combine(
                format.timestamp({ format: "DD-MMM-YYYY HH:mm:ss" }),
                format.json()
            ),
        }),
    ],
});

if (process.env.NODE_ENV !== "prod") {
    logger.add(
        new winston.transports.Console({
            format: format.combine(format.timestamp(), format.json()),
        })
    );
}

module.exports = logger;