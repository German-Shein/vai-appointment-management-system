"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const appointment_1 = require("./appointment");
const authentication_1 = require("./authentication");
const routes = (application) => {
    application.use('/api', authentication_1.authenticationRouter);
    application.use('/api', appointment_1.appointmentRouter);
};
exports.routes = routes;
