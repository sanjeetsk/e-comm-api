// import express
import express from 'express';
import productRouter from './src/featues/product/product.router.js';
import bodyParser from 'body-parser';

//create server
const server = express();

server.use(bodyParser.json());

// for all request related to product redirect to product router.
// localhost:3000/api/products
server.use('/api/products', productRouter);

//Default request handler
server.get('/', (req, res) =>{
    res.send('Welcome to e-commerce api');
})

//Specify port
server.listen(3000, ()=>{
    console.log("Server is running on port 3000");
})
