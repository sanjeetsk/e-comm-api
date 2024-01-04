// import express
import express from 'express';
import swagger from 'swagger-ui-express';

import productRouter from './src/featues/product/product.router.js';
import userRouter from './src/featues/user/user.routes.js';
import bodyParser from 'body-parser';
import jwtAuth from './src/middlewares/jwt.middleware.js';
import cartRouter from './src/featues/cart/cartItems.routers.js';
import apiDocs from './swagger.json' assert {type : 'json'};

//create server
const server = express();

// CORS policy configuration
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Headers', '*')
    res.header('Access-Control-Allow-Methods', '*')
    //return ok for preflight request.
    if(req.method == 'OPTIONS'){
        return res.sendStatus(200);
    }
    next();
})

server.use(bodyParser.json());

server.use("/api-docs", swagger.serve, swagger.setup(apiDocs));
// for all request related to product redirect to product router.
// localhost:3000/api/products
server.use('/api/products', jwtAuth, productRouter);
server.use('/api/users', userRouter);
server.use('/api/cartItems', jwtAuth, cartRouter);

//Default request handler
server.get('/', (req, res) =>{
    res.send('Welcome to e-commerce api');
})

// Middleware to handle 404 request
server.use((req, res) => {
    res.status(404).send('API Not Found. Please check our documentation for more information at http://localhost:3400/api-docs/');
})

//Specify port
server.listen(3400, ()=>{
    console.log("Server is running on port 3400");
})
