const userService = require("./user.service");
const status = require("../shared/constants/status");
const GetApiError = require("../shared/models/GetApiError");
const userController = {};

/**
 * Register User
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
userController.register = async (req, res, next) => {
    try {
        let token = req.headers["token"],
            isAdmin = false;
        if (token) {
            isAdmin = userService.verifyAdmin(token);
            if (!isAdmin) {
                return res
                    .status(status.unauthorized.code)
                    .send("Unable to authenticate admin token!");
            }
        }
        let result = await userService.register(req.body);
        if (result) {
            return res.status(status.created.code).send();
        }
        return res.status(status.conflict.code).send();
    } catch (err) {
        next(GetApiError.internalServerError(err.message, err.stack));
    }
};

/**
 * Create Token
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
userController.login = async (req, res, next) => {
    try {
        let { email, phoneNumber, password } = req.headers;
        let user = await userService.authenticateUser(email, phoneNumber, password);
        if (user == null) {
            return res.status(status.unauthorized.code).send();
        }
        let accessToken = await userService.createToken(user);
        return res.status(status.ok.code).send(accessToken);
    } catch (err) {
        next(GetApiError.internalServerError(err.message, err.stack));
    }
};

/**
 * Get User by Id
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
userController.getById = async (req, res, next) => {
    try {
        let result = await userService.getById(req.userId);
        if (result) {
            return res.status(status.ok.code).send(result);
        }
        return res.status(status.notFound.code).send();
    } catch (err) {
        next(GetApiError.internalServerError(err.message, err.stack));
    }
};

/**
 * Update User
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
userController.update = async (req, res, next) => {
    try {
        let result = await userService.update(req.userId, req.body);
        if (result === true) {
            return res.status(status.ok.code).send();
        }
        return res.status(status.notFound.code).send();
    } catch (err) {
        next(GetApiError.internalServerError(err.message, err.stack));
    }
};

/**
 * Delete User
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
userController.delete = async (req, res, next) => {
    try {
        let result = await userService.delete(req.userId);
        if (result === true) {
            return res.status(status.ok.code).send();
        }
        return res.status(status.notFound.code).send();
    } catch (err) {
        next(GetApiError.internalServerError(err.message, err.stack));
    }
};

module.exports = userController;
