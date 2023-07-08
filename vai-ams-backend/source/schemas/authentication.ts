import Joi from '@hapi/joi';
import { USER_TYPE } from '../constants/user-type';

export const authenticationValidationSchemas = 
{
    LOG_IN: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }).required(),
    REGISTER: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        userType: Joi.string().required().valid(USER_TYPE.ADMIN, USER_TYPE.DOCTOR, USER_TYPE.PATIENT)
    }).required(),
};