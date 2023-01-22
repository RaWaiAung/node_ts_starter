"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const http_errors_1 = __importDefault(require("http-errors"));
const app = (0, express_1.default)();
app.get('/', (req, res, next) => {
    res.send("Hello world");
});
app.use((req, res, next) => {
    next(new http_errors_1.default.NotFound());
});
const errorHandler = (err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        status: err.status || 500,
        message: err.message
    });
};
app.use(errorHandler);
const PORT = process.env.PORT || 3000;
const server = app.listen({ PORT }, () => {
    console.log(`Server is listening on ${PORT}`);
});
