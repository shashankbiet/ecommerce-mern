const status = require("../app/shared/constants/status");
const ApiError = require("../error/ApiError");
const logger = require("../config/logger");

// eslint-disable-next-line
let apiErrorHandler = (err, req, res, next) => {
    if (err instanceof ApiError) {
        logger.error({
            msg: err.msg,
            stack: err.stack,
        });
        return res.status(err.status).send();
    }

    logger.error(err);
    return res.status(status.internalServerError.code).send();
};

module.exports = apiErrorHandler;
