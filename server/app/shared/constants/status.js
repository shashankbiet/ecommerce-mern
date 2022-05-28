module.exports = {
    ok: {
        code: 200,
        message: "The request has succeeded.",
    },
    created: {
        code: 201,
        message: "The request has succeeded and a new resource has been created.",
    },
    accepted: {
        code: 202,
        message: "The request has been received but not yet acted upon.",
    },
    badRequest: {
        code: 400,
        message:
            "The server could not understand the request due to invalid syntax.",
    },
    unauthorized: {
        code: 401,
        message: "The request sent by the client could not be authenticated.",
    },
    forbidden: {
        code: 403,
        message: "Access to the requested resource is forbidden.",
    },
    notFound: {
        code: 404,
        message: "The server can not find the requested resource.",
    },
    internalServerError: {
        code: 500,
        message:
            "The server has encountered a situation it doesnt know how to handle.",
    },
    badGateway: {
        code: 502,
        message: "The server was not able to get a valid or any response",
    },
    serviceUnavailable: {
        code: 503,
        message: "The server is currently unable to handle the request.",
    },
    conflict: {
        code: 409,
        message: "The request conflicts with the current state of the server",
    },
};
