// import express
import "./env.js";
import express from 'express';
import swagger from 'swagger-ui-express';
import cors from 'cors';
import bodyParser from 'body-parser';
import apiDocs from './swagger.json' assert {type : 'json'};

import productRouter from './src/featues/product/product.router.js';
import userRouter from './src/featues/user/user.routes.js';
import jwtAuth from './src/middlewares/jwt.middleware.js';
import cartRouter from './src/featues/cart/cartItems.routers.js';
import loggerMiddleware from './src/middlewares/logger.middleware.js';
import { errorHandlerMiddleware } from './src/error-handler/applicationError.js';
import { invalidRoutesHandlerMiddleware } from './src/middlewares/invalidRoutes.middleware.js';
import { connectToMongoDB } from './src/confing/mongodb.js';
import orderRouter from "./src/featues/order/order.routes.js";
import { connectUsingMongoose } from "./src/confing/mongooseConfig.js";
import likeRouter from "./src/featues/like/like.routes.js";

//create server
const server = express();

// CORS policy configuration
const corsOptions = {
    origin: '*',  // valid client url
    // allowedHeaders: '*'
}
server.use(cors(corsOptions));

// server.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
//     res.header('Access-Control-Allow-Headers', '*')
//     res.header('Access-Control-Allow-Methods', '*')
//     //return ok for preflight request.
//     if(req.method == 'OPTIONS'){
//         return res.sendStatus(200);
//     }
//     next();
// })

server.use(bodyParser.json());

server.use("/api-docs", swagger.serve, swagger.setup(apiDocs));

// for all request related to product redirect to product router.
// localhost:3000/api/products
server.use('/api/products', jwtAuth, loggerMiddleware, productRouter);
server.use('/api/users', userRouter);
server.use('/api/cartItems',loggerMiddleware, jwtAuth, cartRouter);

server.use('/api/likes', jwtAuth, likeRouter)

server.use('/api/orders', jwtAuth, orderRouter);

//Default request handler
server.get('/', (req, res) =>{
    res.send('Welcome to e-commerce api');
})

// // Middleware to handle invalid routes
server.use(invalidRoutesHandlerMiddleware);

// ApplicationError handler 
server.use(errorHandlerMiddleware);

//Specify port
server.listen(3400, ()=>{
    console.log("Server is running on port 3400");
    // connectToMongoDB();
    connectUsingMongoose();
})
