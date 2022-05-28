class ApiError {
    /**
     * @constructor
     * @param {number} status
     * @param {string} msg
     * @param {string} stack
     */
    constructor(status, msg, stack) {
        this.status = status;
        this.msg = msg;
        this.stack = stack;
    }
}

module.exports = ApiError;
