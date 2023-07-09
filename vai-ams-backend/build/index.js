"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes/routes");
const mongoose = __importStar(require("mongoose"));
const node_os_1 = require("node:os");
const node_cluster_1 = __importDefault(require("node:cluster"));
dotenv_1.default.config();
mongoose.connect('mongodb+srv://germanshein1995:vLk0u3PxTIKpikZr@cluster0.8xjtv68.mongodb.net/vai-ams-interview?retryWrites=true&w=majority', { serverSelectionTimeoutMS: 5000 });
const application = (0, express_1.default)();
application.use(body_parser_1.default.json({ limit: '10mb' }));
application.use(express_1.default.json());
application.use((0, cors_1.default)());
(0, routes_1.routes)(application);
if (node_cluster_1.default.isPrimary) {
    for (let index = 0; index < (0, node_os_1.availableParallelism)(); index = index + 1) {
        node_cluster_1.default.fork();
    }
}
else {
    application.listen(process.env.PORT);
}
[`exit`, `SIGINT`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`, `SIGTERM`].forEach((eventType) => {
    //mongoose.disconnect()
});
