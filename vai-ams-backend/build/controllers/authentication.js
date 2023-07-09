"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationController = void 0;
const authentication_1 = require("../schemas/authentication");
const response_codes_1 = require("../utilities/response-codes");
const response_messages_1 = require("../utilities/response-messages");
const authentication_2 = require("../database/authentication");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = require("crypto");
const logIn = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const validationResult = authentication_1.authenticationValidationSchemas.LOG_IN.validate(request.body);
    if (validationResult.error === undefined) {
        const user = yield authentication_2.authenticationDatabaseSchema.findOne({ email: request.body.email });
        try {
            if (user) {
                if (yield bcryptjs_1.default.compare(request.body.password, user.password)) {
                    const token = jsonwebtoken_1.default.sign({ _id: user._id, email: user.email }, process.env.SECRET, { expiresIn: '1h' });
                    delete user.password;
                    response.result =
                        {
                            data: { user, token: token },
                            message: response_messages_1.responseMessages.SUCCESS.AUTHENTICATION.USER_LOGGED_IN,
                            status: response_codes_1.responseCodes.SUCCESS
                        };
                }
                else {
                    response.result =
                        {
                            errorMessage: 'Incorrect credentials',
                            message: response_messages_1.responseMessages.ERROR.AUTHENTICATION.USER_AUTHENTICATION_ERROR,
                            status: response_codes_1.responseCodes.UNAUTHORIZED
                        };
                }
            }
            else {
                response.result =
                    {
                        errorMessage: 'User does not exist',
                        message: response_messages_1.responseMessages.ERROR.AUTHENTICATION.USER_NOT_FOUND,
                        status: response_codes_1.responseCodes.NOT_FOUND
                    };
            }
        }
        catch (errorObject) {
            response.result =
                {
                    errorMessage: errorObject,
                    message: response_messages_1.responseMessages.ERROR.UNKNOWN_ERROR,
                    status: response_codes_1.responseCodes.INTERNAL_SERVER_ERROR
                };
        }
    }
    else {
        response.result =
            {
                errorMessage: validationResult.error,
                message: response_messages_1.responseMessages.ERROR.VALIDATION_ERROR,
                status: response_codes_1.responseCodes.VALIDATION_ERROR
            };
    }
    next();
});
const register = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const validationResult = authentication_1.authenticationValidationSchemas.REGISTER.validate(request.body);
    if (validationResult.error === undefined) {
        const oldUser = yield authentication_2.authenticationDatabaseSchema.findOne({ email: request.body.email });
        try {
            if (oldUser) {
                response.result =
                    {
                        errorMessage: `User with email ${request.body.email} already exists`,
                        message: response_messages_1.responseMessages.ERROR.AUTHENTICATION.USER_DUPLICATED,
                        status: response_codes_1.responseCodes.EXISTING_DATA
                    };
            }
            else {
                request.body.password = yield bcryptjs_1.default.hash(request.body.password, (0, crypto_1.randomInt)(5, 50));
                const user = yield authentication_2.authenticationDatabaseSchema.create(request.body);
                delete request.body.password;
                const token = jsonwebtoken_1.default.sign({ _id: user._id, email: user.email }, process.env.SECRET, { expiresIn: '1h' });
                response.result =
                    {
                        data: { user, token },
                        message: response_messages_1.responseMessages.SUCCESS.AUTHENTICATION.USER_REGISTERED,
                        status: response_codes_1.responseCodes.CREATED
                    };
            }
        }
        catch (errorObject) {
            response.result =
                {
                    errorMessage: errorObject,
                    message: response_messages_1.responseMessages.ERROR.UNKNOWN_ERROR,
                    status: response_codes_1.responseCodes.INTERNAL_SERVER_ERROR
                };
        }
    }
    else {
        response.result =
            {
                errorMessage: validationResult.error,
                message: response_messages_1.responseMessages.ERROR.VALIDATION_ERROR,
                status: response_codes_1.responseCodes.VALIDATION_ERROR
            };
    }
    next();
});
exports.authenticationController = {
    logIn,
    register
};
