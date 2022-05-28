const ApiError = require("../../../error/ApiError");
const status = require("../constants/status");

class GetApiError {
    static internalServerError(msg, stack) {
        return new ApiError(status.internalServerError.code, msg, stack);
    }
}

module.exports = GetApiError;
