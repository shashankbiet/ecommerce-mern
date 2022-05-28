const { validationResult } = require("express-validator");
const status = require("../app/shared/constants/status");

/**
 * Validate the rules defined.
 * @return {Object} - errors if any.
 */
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

    return res.status(status.badRequest.code).json({
        errors: extractedErrors,
    });
};

module.exports = validate;
