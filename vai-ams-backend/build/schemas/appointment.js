"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentValidationSchemas = void 0;
const appointment_status_1 = require("../constants/appointment-status");
const joi_1 = __importDefault(require("@hapi/joi"));
const user_type_1 = require("../constants/user-type");
exports.appointmentValidationSchemas = {
    GET_APPOINTMENT: joi_1.default.string().required(),
    GET_APPOINTMENTS_BY_USER_ID: joi_1.default.object().keys({
        userID: joi_1.default.string().required(),
        userType: joi_1.default.string().valid(user_type_1.USER_TYPE.DOCTOR, user_type_1.USER_TYPE.PATIENT).required()
    }).required(),
    CREATE_APPOINTMENT: joi_1.default.object().keys({
        patientID: joi_1.default.string().required(),
        doctorID: joi_1.default.string().required(),
        timeSlot: joi_1.default.date().required(),
        status: joi_1.default.string().required().valid(appointment_status_1.APPOINTMENT_STATUS.ATTENDED, appointment_status_1.APPOINTMENT_STATUS.CANCELLED, appointment_status_1.APPOINTMENT_STATUS.DRAFT, appointment_status_1.APPOINTMENT_STATUS.SCHEDULED)
    }).required(),
    UPDATE_APPOINTMENT: joi_1.default.object().keys({
        id: joi_1.default.string().required(),
        timeSlot: joi_1.default.date(),
        status: joi_1.default.string().valid(appointment_status_1.APPOINTMENT_STATUS.ATTENDED, appointment_status_1.APPOINTMENT_STATUS.CANCELLED, appointment_status_1.APPOINTMENT_STATUS.DRAFT, appointment_status_1.APPOINTMENT_STATUS.SCHEDULED)
    }).required(),
    DELETE_APPOINTMENT: joi_1.default.string().required(),
};
