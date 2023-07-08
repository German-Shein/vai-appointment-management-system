"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentRouter = void 0;
const appointment_1 = __importDefault(require("../controllers/appointment"));
const response_handler_1 = require("../middleware/response-handler");
const express_1 = require("express");
exports.appointmentRouter = (0, express_1.Router)();
exports.appointmentRouter.get('/:appointmendID', appointment_1.default.getAppointment, response_handler_1.responseHandler);
exports.appointmentRouter.post('/', appointment_1.default.createAppointment, response_handler_1.responseHandler);
exports.appointmentRouter.put('/', appointment_1.default.updateAppointment, response_handler_1.responseHandler);
exports.appointmentRouter.delete('/:appointmendID', appointment_1.default.deleteAppointment, response_handler_1.responseHandler);
