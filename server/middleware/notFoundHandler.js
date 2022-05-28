const status = require("../app/shared/constants/status");
const ApiError = require("../error/ApiError");

let notFoundHandler = async (req, res, next) => {
    const error = new ApiError(
        status.notFound.code,
        status.notFound.message,
        null
    );
    next(error);
};

module.exports = notFoundHandler;
