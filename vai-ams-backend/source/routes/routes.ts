import { appointmentRouter } from "./appointment";
import { authenticationRouter } from "./authentication";
import { Express } from "express";

export const routes = (application: Express) =>
{
    application.use ('/api/authentication', authenticationRouter);
    application.use ('/api/appointment', appointmentRouter);
}