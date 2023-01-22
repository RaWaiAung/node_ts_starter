import express, {Request, Response, NextFunction, Application, ErrorRequestHandler} from "express";
import { Server } from "http";
import createHttpError from "http-errors";
import "dotenv/config";
const app: Application = express();
app.get('/', (req: Request, res: Response, next:NextFunction) => {
    res.send("Hello world")
});
app.use((req: Request, res: Response, next:NextFunction) => {
    next(new createHttpError.NotFound())
});
const errorHandler : ErrorRequestHandler = (err, req: Request, res: Response, next:NextFunction) => {
    res.status(err.status || 500);
    res.send({
        status: err.status || 500,
        message: err.message
    })
};

app.use(errorHandler);
const port: Number  = Number(process.env.PORT) || 7070;
const server: Server = app.listen({port}, () => {
    console.log(`Server is listening on ${port}`);
})