"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes/routes");
dotenv_1.default.config();
console.log(1);
const application = (0, express_1.default)();
application.use(body_parser_1.default.json({ limit: '10mb' }));
application.use(express_1.default.json());
application.use((0, cors_1.default)());
(0, routes_1.routes)(application);
application.listen(process.env.PORT);
