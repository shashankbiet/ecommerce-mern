const userController = require("./user.controller");
const router = require("express").Router();
const {
    userLoginValidationRules,
    userRegisterValidationRules,
    userGetValidationRules,
    userPutValidationRules,
    userDeleteValidationRules,
} = require("./user.validator");
const validate = require("../../util/validator");
const authenticateToken = require("../../middleware/authenticateToken");

router.post(
    "/register",
    userRegisterValidationRules(),
    validate,
    userController.register
);

router.post(
    "/login",
    userLoginValidationRules(),
    validate,
    userController.login
);

router.get(
    "/",
    userGetValidationRules(),
    validate,
    authenticateToken,
    userController.getById
);

router.put(
    "/",
    userPutValidationRules(),
    validate,
    authenticateToken,
    userController.update
);

router.delete(
    "/",
    userDeleteValidationRules(),
    validate,
    authenticateToken,
    userController.delete
);

module.exports = router;
