const userRouter = require("../app/user/user.route");

const routes = (app) => {
    app.use("/api/user", userRouter);
};

module.exports = routes;
