"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseHandler = void 0;
const responseHandler = (request, response, next) => {
    if (response) {
        response.status(response.result.status).json(response.result);
    }
    else {
        next();
    }
};
exports.responseHandler = responseHandler;
