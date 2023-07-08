import express, { Express } from 'express';
import bodyParser from 'body-parser';
import dotEnv from 'dotenv';
import cors from 'cors';
import { routes } from './routes/routes';
import * as mongoose from 'mongoose';
import { availableParallelism } from 'node:os';
import cluster from 'node:cluster';

dotEnv.config();

mongoose.connect('xxx', {useNewUrlParser: true, useUnifiedTopology: true});

const application: Express = express();
application.use(bodyParser.json({limit: '10mb'}))
application.use(express.json());
application.use(cors());
routes(application);

if (cluster.isPrimary) 
{
    console.log(`Primary ${process.pid} is running`);
    for(let i = 0; i < availableParallelism(); i++) 
    {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => 
    {
        console.log(`worker ${worker.process.pid} died`);
    });
}
else
{
    application.listen(process.env.PORT);
    console.log(`Worker ${process.pid} started`);
}