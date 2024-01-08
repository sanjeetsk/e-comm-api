import fs from 'fs';
import winston from 'winston';

// const fsPromise = fs.promises;

// async function log(logData){
//     try{
//         logData = `\n ${new Date().toString()} - ${logData}`;
//         await fsPromise.appendFile('log.txt', logData)
//     }
//     catch(err){
//         console.log(err);
//     }
// }

export const logger = winston.createLogger({
    format: winston.format.json(),
    defaultMeta: {},
    transports: [
        new winston.transports.File({filename: 'log.txt'})
    ]
})

const loggerMiddleware = async (req, res, next) => {
    // log req body
    if(!req.url.includes('signin')){
        const logData = `reqUrl: ${req.url} - reqBody${JSON.stringify(req.body)}`;
        logger.info(logData)
    }
    next();
}

export default loggerMiddleware