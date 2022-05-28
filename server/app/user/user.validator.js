const { body, header } = require("express-validator");
const { check, oneOf, validationResult } = require('express-validator/check');

/**
 * Validate User Register
 * @returns {*}
 */
const userRegisterValidationRules = () => {
    return [
        body("phoneNumber")
            .isNumeric()
            .withMessage("Phone number must be numeric")
            .isLength({ max: 10, min: 10 })
            .withMessage("Phone number must be 10 digits long"),
        body("email").isEmail().withMessage("Invalid email address"),
        body("password")
            .isStrongPassword({
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
            })
            .withMessage(
                "Password must be greater than 7 and contain at least one uppercase letter, one lowercase letter, and one number"
            ),
        body("firstName").isAlpha(),
        body("lastName").isAlpha(),
        body("address").isArray().notEmpty(),
    ];
};

/**
 * Validate User Login
 * @returns {*}
 */
const userLoginValidationRules = () => {
    return [
        oneOf([
            header("email").isEmail().withMessage("Invalid email address"),
            header("phoneNumber")
                .isNumeric()
                .withMessage("Phone number must be numeric")
                .isLength({ max: 10, min: 10 })
                .withMessage("Phone number must be 10 digits long")
        ]),
        header("password").isString().notEmpty(),
    ];
};

/**
 * Validate User Get
 * @returns {*}
 */
const userGetValidationRules = () => {
    return [
        header("authorization").isString().withMessage("Invalid authorization"),
    ];
};

/**
 * Validate User Put
 * @returns {*}
 */
const userPutValidationRules = () => {
    return [
        header("authorization").isString().withMessage("Invalid authorization"),
        body("firstName").isAlpha(),
        body("lastName").isAlpha(),
        body("address").isArray().notEmpty(),
    ];
};

/**
 * Validate User Delete
 * @returns {*}
 */
const userDeleteValidationRules = () => {
    return [
        header("authorization").isString().withMessage("Invalid authorization"),
    ];
};

module.exports = {
    userLoginValidationRules,
    userRegisterValidationRules,
    userGetValidationRules,
    userPutValidationRules,
    userDeleteValidationRules,
};
