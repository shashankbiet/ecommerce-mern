const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const hashing = require("../shared/hashing");
const userModel = require("./user.model");
const mongoError = require("../../error/mongoError");
require("dotenv").config();
const userService = {};

/**
 * Authenticate User
 * @param {string} email
 * @param {string} plainPass
 * @returns {Promise<Object>}
 */
userService.authenticateUser = async (email, phoneNumber, plainPass) => {
    let user = await userModel.findOne({ $or: [{ email: email }, { phoneNumber: phoneNumber }], isActive: true });
    if (user) {
        let userId = user["_id"],
            hashPass = user["password"];
        let auth = await hashing.compare(plainPass, hashPass);
        if (auth) {
            return { userId, isAdmin: user["isAdmin"] };
        }
    }
    return null;
};

/**
 * Create Token
 * @param {Object} user
 * @returns {Promise<string>}
 */
userService.createToken = async (user) => {
    const accessToken = await jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: 86400, // expires in 24 hours
    });
    return accessToken;
};

/**
 * Register User
 * @param {Object} body
 * @returns {Promise<string>}
 */
userService.register = async (body) => {
    let { phoneNumber, email, password, firstName, lastName, address, role } = body;
    password = await hashing.encrypt(password);
    let roleId = getUserRoleId(role.toLowerCase());
    for (let i = 0; i < address.length; i++) {
        address[i].typeId = getAddressTypeId(address[i].type);
    }
    let user = new userModel({
        phoneNumber,
        email,
        roleId,
        password,
        firstName,
        lastName,
        address
    });

    try {
        let result = await user.save();
        return result['_id'];
    } catch (err) {
        if (err.code && err.code == mongoError.duplicateKey.code) {
            return null;
        }
        throw new Error(err);
    }
};

/**
 * Get User By Id
 * @param {string} userId
 * @returns {Promise<Object>}
 */
userService.getById = async (userId) => {
    let user = await userModel.findOne({ _id: userId, isActive: true });
    if (user) {
        // @ts-ignore
        user = user.toObject();
        delete user.password;
        delete user._id;
        user.role = getUserRole(user.roleId);
        delete user.roleId;
        for (let i = 0; i < user.address.length; i++) {
            user.address[i].type = getAddressType(user.address[i].typeId);
            delete user.address[i].typeId;
            delete user.address[i]._id;
        }
        return user;
    }
    return null;
};

/**
 * Update User
 * @param {string} userId
 * @param {Object} body
 * @returns {Promise<boolean>}
 */
userService.update = async (userId, body) => {
    let { firstName, lastName, address } = body;

    try {
        for (let i = 0; i < address.length; i++) {
            address[i].typeId = getAddressTypeId(address[i].type);
        }
        let result = await userModel.updateOne(
            { _id: userId, isActive: true },
            {
                $set: {
                    firstName: firstName,
                    lastName: lastName,
                    address: address,
                    modifiedDate: new Date(),
                },
            }
        );
        if (result.modifiedCount === 1) {
            return true;
        }
        return false;
    } catch (err) {
        throw new Error(err);
    }
};

/**
 * Delete User
 * @param {string} userId
 * @returns {Promise<any>}
 */
userService.delete = async (userId) => {
    try {
        let result = await userModel.updateOne(
            { _id: userId, isActive: true },
            {
                $set: {
                    isActive: false,
                    modifiedDate: new Date(),
                },
            }
        );
        if (result.modifiedCount === 1) {
            return true;
        }
        return false;
    } catch (err) {
        throw new Error(err);
    }
};

/**
 * Verify Admin
 * @param {string} token
 * @returns {boolean}
 */
userService.verifyAdmin = (token) => {
    let adminVerificationTokenSecret =
        process.env.ADMIN_VERIFICATION_TOKEN_SECRET;
    if (token == adminVerificationTokenSecret) {
        return true;
    } else {
        return false;
    }
};

/**
 * Get User RoleId
 * @param {string} roleName
 * @returns {number}
 */
function getUserRoleId(roleName) {
    return roleName == 'admin' ? 1 : (roleName == 'merchant' ? 2 : 3)
}

/**
 * Get User Role
 * @param {number} roleId
 * @returns {string}
 */
function getUserRole(roleId) {
    let role;
    switch (roleId) {
        case 1:
            role = 'admin';
            break;
        case 2:
            role = 'merchant';
            break;
        case 3:
            role = 'customer';
            break;
        default:
            role = 'unknown';
            break;
    }
    return role;
}

/**
 * Get Address TypeId
 * @param {string} addressType
 * @returns {number}
 */
function getAddressTypeId(addressType) {
    let addressTypeId;
    switch (addressType.toLowerCase()) {
        case 'home':
            addressTypeId = 1;
            break;
        case 'work':
            addressTypeId = 2;
            break;
        default:
            addressTypeId = 1;
            break;
    }
    return addressTypeId;
}

/**
 * Get Address Type
 * @param {number} addressTypeId
 * @returns {string}
 */
function getAddressType(addressTypeId) {
    let addressType;
    switch (addressTypeId) {
        case 1:
            addressType = 'home';
            break;
        case 2:
            addressType = 'work';
            break;
        default:
            addressType = 'unknown';
            break;
    }
    return addressType;
}

module.exports = userService;
