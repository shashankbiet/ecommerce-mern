const status = require("../app/shared/constants/status");

module.exports = {
    duplicateKey: {
        code: 11000,
        status: status.conflict.code,
        message: "Resource already exists.",
    },
};
