"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationValidationSchemas = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const user_type_1 = require("../constants/user-type");
exports.authenticationValidationSchemas = {
    LOG_IN: joi_1.default.object().keys({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().required()
    }).required(),
    REGISTER: joi_1.default.object().keys({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().required(),
        userType: joi_1.default.string().required().valid(user_type_1.USER_TYPE.ADMIN, user_type_1.USER_TYPE.DOCTOR, user_type_1.USER_TYPE.PATIENT)
    }).required(),
};
