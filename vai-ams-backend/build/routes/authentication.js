"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationRouter = void 0;
const authentication_1 = require("../controllers/authentication");
const response_handler_1 = require("../middleware/response-handler");
const express_1 = require("express");
exports.authenticationRouter = (0, express_1.Router)();
exports.authenticationRouter.post('/log-in', authentication_1.authenticationController.logIn, response_handler_1.responseHandler);
exports.authenticationRouter.post('/register', authentication_1.authenticationController.register, response_handler_1.responseHandler);
