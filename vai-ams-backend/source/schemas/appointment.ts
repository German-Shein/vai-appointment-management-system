import { APPOINTMENT_STATUS } from '../constants/appointment-status';
import Joi from '@hapi/joi';
import { USER_TYPE } from '../constants/user-type';

export const appointmentValidationSchemas = 
{
    GET_APPOINTMENT: Joi.string().required(),
    GET_APPOINTMENTS_BY_USER_ID: Joi.object().keys({
        userID: Joi.string().required(),
        userType: Joi.string().valid(USER_TYPE.DOCTOR, USER_TYPE.PATIENT).required()
    }).required(),
    CREATE_APPOINTMENT: Joi.object().keys({
        patientID: Joi.string().required(),
        doctorID: Joi.string().required(),
        timeSlot: Joi.date().required(),
        status: Joi.string().required().valid(APPOINTMENT_STATUS.ATTENDED, APPOINTMENT_STATUS.CANCELLED, APPOINTMENT_STATUS.DRAFT, APPOINTMENT_STATUS.SCHEDULED)
    }).required(),
    UPDATE_APPOINTMENT: Joi.object().keys({
        id: Joi.string().required(),
        timeSlot: Joi.date(),
        status: Joi.string().valid(APPOINTMENT_STATUS.ATTENDED, APPOINTMENT_STATUS.CANCELLED, APPOINTMENT_STATUS.DRAFT, APPOINTMENT_STATUS.SCHEDULED)
    }).required(),
    DELETE_APPOINTMENT: Joi.string().required(),
};