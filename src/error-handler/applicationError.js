import { logger } from "../middlewares/logger.middleware.js";

export class ApplicationError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}

export const errorHandlerMiddleware = (err, req, res, next) => {
    const message = err.message || "Oops! Something went wrong... Please try again later!";
    logger.log({
        'level': 'error',
        'timestamp': new Date().toString(),
        'request URL': req.originalUrl,
        'error message': message
    })
    next();

    if(err instanceof ApplicationError){
        return res.status(err.code).send(err.message);
    }

    // unhandled error
    return res.status(500).send("Oops! Something went wrong... Please try again later!");
}

