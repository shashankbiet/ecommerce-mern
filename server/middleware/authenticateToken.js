const jwt = require("jsonwebtoken");
const status = require("../app/shared/constants/status");

const authenticateToken = (req, res, next) => {
    const token = req.headers["authorization"]
        ? req.headers["authorization"]
        : null;
    if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (!err) {
                req.userId = user.userId;
                req.role = user.role;
                next();
            } else {
                return res.status(status.unauthorized.code).send();
            }
        });
    } else {
        return res.status(status.unauthorized.code).send();
    }
};

module.exports = authenticateToken;
