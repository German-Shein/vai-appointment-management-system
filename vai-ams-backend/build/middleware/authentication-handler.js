"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationHandler = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const response_codes_1 = require("../utilities/response-codes");
const response_messages_1 = require("../utilities/response-messages");
const authenticationHandler = (request, response, next) => {
    var _a;
    const token = (_a = request.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    if (!token) {
        response.status(response_codes_1.responseCodes.FORBIDDEN).json({
            errorMessage: 'A JSON Web Token is required for authentication',
            message: response_messages_1.responseMessages.ERROR.FORBIDDEN,
            status: response_codes_1.responseCodes.FORBIDDEN
        });
    }
    try {
        request.session = { token: jsonwebtoken_1.default.verify(token, process.env.SECRET) };
        next();
    }
    catch (err) {
        response.status(response_codes_1.responseCodes.UNAUTHORIZED).json({
            errorMessage: 'Invalid JSON Web Token',
            message: response_messages_1.responseMessages.ERROR.UNAUTHORIZED,
            status: response_codes_1.responseCodes.UNAUTHORIZED
        });
    }
};
exports.authenticationHandler = authenticationHandler;
