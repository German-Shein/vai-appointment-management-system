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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentController = void 0;
const appointment_1 = require("../schemas/appointment");
const response_codes_1 = require("../utilities/response-codes");
const response_messages_1 = require("../utilities/response-messages");
const appointment_2 = require("../database/appointment");
const user_type_1 = require("../constants/user-type");
const appointment_status_1 = require("../constants/appointment-status");
const getAppointment = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentID = request.params.appointmentID;
    const validationResult = appointment_1.appointmentValidationSchemas.GET_APPOINTMENT.validate(appointmentID);
    if (validationResult.error === undefined) {
        const appointment = yield appointment_2.appointmentDatabaseSchema.findById(appointmentID);
        try {
            if (appointment) {
                response.result =
                    {
                        data: appointment,
                        message: response_messages_1.responseMessages.SUCCESS.APPOINTMENT.APPOINTMENT_RETRIEVED,
                        status: response_codes_1.responseCodes.SUCCESS
                    };
            }
            else {
                response.result =
                    {
                        errorMessage: 'No appointment with such ID exists',
                        message: response_messages_1.responseMessages.ERROR.APPOINTMENT.APPOINTMENT_NOT_FOUND,
                        status: response_codes_1.responseCodes.NOT_FOUND
                    };
            }
        }
        catch (errorObject) {
            response.result =
                {
                    errorMessage: errorObject,
                    message: response_messages_1.responseMessages.ERROR.APPOINTMENT.APPOINTMENT_RETRIEVAL_ERROR,
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
const getAppointments = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const validationResult = appointment_1.appointmentValidationSchemas.GET_APPOINTMENTS_BY_USER_ID.validate(request.body);
    if (validationResult.error === undefined) {
        const appointments = yield appointment_2.appointmentDatabaseSchema.find(request.body.userType === user_type_1.USER_TYPE.DOCTOR ? { doctorID: request.body.userID } : { patientID: request.body.userID });
        try {
            if (appointments.length > 0) {
                response.result =
                    {
                        data: appointments,
                        message: response_messages_1.responseMessages.SUCCESS.APPOINTMENT.APPOINTMENT_RETRIEVED,
                        status: response_codes_1.responseCodes.SUCCESS
                    };
            }
            else {
                response.result =
                    {
                        errorMessage: 'No appointments for this user exist',
                        message: response_messages_1.responseMessages.ERROR.APPOINTMENT.APPOINTMENT_NOT_FOUND,
                        status: response_codes_1.responseCodes.NOT_FOUND
                    };
            }
        }
        catch (errorObject) {
            response.result =
                {
                    errorMessage: errorObject,
                    message: response_messages_1.responseMessages.ERROR.APPOINTMENT.APPOINTMENT_RETRIEVAL_ERROR,
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
const createAppointment = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const validationResult = appointment_1.appointmentValidationSchemas.CREATE_APPOINTMENT.validate(request.body);
    if (validationResult.error === undefined) {
        const appointments = yield appointment_2.appointmentDatabaseSchema.create(request.body);
        try {
            response.result =
                {
                    data: appointments,
                    message: response_messages_1.responseMessages.SUCCESS.APPOINTMENT.APPOINTMENT_CREATED,
                    status: response_codes_1.responseCodes.CREATED
                };
        }
        catch (errorObject) {
            response.result =
                {
                    errorMessage: errorObject,
                    message: response_messages_1.responseMessages.ERROR.APPOINTMENT.APPOINTMENT_CREATION_ERROR,
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
const updateAppointment = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const validationResult = appointment_1.appointmentValidationSchemas.UPDATE_APPOINTMENT.validate(request.body);
    if (validationResult.error === undefined) {
        const appointments = yield appointment_2.appointmentDatabaseSchema.findByIdAndUpdate(request.body.id, ((_a) => {
            var { id } = _a, parameters = __rest(_a, ["id"]);
            return parameters;
        })(request.body));
        try {
            response.result =
                {
                    data: appointments,
                    message: response_messages_1.responseMessages.SUCCESS.APPOINTMENT.APPOINTMENT_CREATED,
                    status: response_codes_1.responseCodes.SUCCESS
                };
        }
        catch (errorObject) {
            response.result =
                {
                    errorMessage: errorObject,
                    message: response_messages_1.responseMessages.ERROR.APPOINTMENT.APPOINTMENT_CREATION_ERROR,
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
const deleteAppointment = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const validationResult = appointment_1.appointmentValidationSchemas.DELETE_APPOINTMENT.validate(request.body);
    if (validationResult.error === undefined) {
        const appointments = yield appointment_2.appointmentDatabaseSchema.findByIdAndUpdate(request.body.id, { status: appointment_status_1.APPOINTMENT_STATUS.CANCELLED });
        try {
            response.result =
                {
                    data: appointments,
                    message: response_messages_1.responseMessages.SUCCESS.APPOINTMENT.APPOINTMENT_CREATED,
                    status: response_codes_1.responseCodes.SUCCESS
                };
        }
        catch (errorObject) {
            response.result =
                {
                    errorMessage: errorObject,
                    message: response_messages_1.responseMessages.ERROR.APPOINTMENT.APPOINTMENT_CREATION_ERROR,
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
exports.appointmentController = {
    getAppointment,
    getAppointments,
    createAppointment,
    updateAppointment,
    deleteAppointment
};
