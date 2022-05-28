var bcrypt = require("bcrypt");
let hashing = {};

/**
 * Encrypt Password
 * @param {string} password
 * @returns {Promise<string>}
 */
hashing.encrypt = async (password) => {
    const saltRounds = 10;
    let salt = await bcrypt.genSalt(saltRounds);
    let hashPass = await bcrypt.hash(password, salt);
    return hashPass;
};

/**
 * Compare Password
 * @param {string} plainPass
 * @param {string} hashPass
 * @returns {Promise<boolean>}
 */
hashing.compare = async (plainPass, hashPass) => {
    const match = await bcrypt.compare(plainPass, hashPass);
    if (match) return true;
    else return false;
};

module.exports = hashing;
