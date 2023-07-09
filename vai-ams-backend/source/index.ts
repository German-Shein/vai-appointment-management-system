import express, { Express } from 'express';
import bodyParser from 'body-parser';
import dotEnv from 'dotenv';
import cors from 'cors';
import { routes } from './routes/routes';
import * as mongoose from 'mongoose';
import { availableParallelism } from 'node:os';
import cluster from 'node:cluster';

dotEnv.config();

mongoose.connect('mongodb+srv://germanshein1995:vLk0u3PxTIKpikZr@cluster0.8xjtv68.mongodb.net/vai-ams-interview?retryWrites=true&w=majority', {serverSelectionTimeoutMS: 5000});

const application: Express = express();
application.use(bodyParser.json({limit: '10mb'}))
application.use(express.json());
application.use(cors());
routes(application);

if (cluster.isPrimary) 
{
    for(let index = 0; index < availableParallelism(); index = index + 1) 
    {
        cluster.fork();
    }
}
else
{
    application.listen(process.env.PORT);
}

[`exit`, `SIGINT`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`, `SIGTERM`].forEach((eventType) => {
    //mongoose.disconnect()
})