"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationRouter = void 0;
const authentication_1 = __importDefault(require("../controllers/authentication"));
const response_handler_1 = require("../middleware/response-handler");
const express_1 = require("express");
exports.authenticationRouter = (0, express_1.Router)();
exports.authenticationRouter.post('/log-in', authentication_1.default.getAppointment, response_handler_1.responseHandler);
exports.authenticationRouter.post('/register', authentication_1.default.createAppointment, response_handler_1.responseHandler);
