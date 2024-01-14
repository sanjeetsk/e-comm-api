import { ApplicationError } from "../../error-handler/applicationError.js";
import OrderRepository from "./order.repository.js";


export default class OrderController{
    constructor(){
        this.orderRepository = new OrderRepository();
    }

    async placeOrder(req, res,next){
        try{
            const userId = req.userId;
            console.log(userId);
            await this.orderRepository.placeOrder(userId);
            res.status(201).send("Order is created");
        }
        catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with Order", 500);
        }
    }
}