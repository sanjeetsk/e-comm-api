import { ObjectId } from "mongodb";
import { ApplicationError } from "../../error-handler/applicationError.js";
import ProductModel from "./product.model.js";
import ProductRepository from "./product.repository.js";

export default class ProductController {
    constructor() {
        this.productRepository = new ProductRepository();
    }
    async getAllProduct(req, res) {
        try {
            const products = await this.productRepository.getAll();
            if (!products) {
                throw new ApplicationError("No product found", 404);
            }
            return res.status(200).json(products);
        }
        catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong", 500);
        }
    }

    async addProduct(req, res) {
        try {
            const { name, desc, price, size } = req.body;
            if (!name || !desc || !price) {
                return res.status(400).json({ error: "Name, description, and price are required." });
            }
    
            const newSize = size ? size.split(',') : [];
    
            if (!req.file || !req.file.filename) {
                return res.status(400).json({ error: "File not provided or invalid." });
            }
            const newProduct =new ProductModel(
                name,
                desc,
                parseFloat(price),
                size.split(','),
                req.file.filename,
            );
            console.log("pro",newProduct);
            const createdRecord = await this.productRepository.add(newProduct);
            return res.status(201).json(createdRecord);
        }
        catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong", 500);
        }
    }

    async getOneProduct(req, res) {
        try {
            const id = req.params.id;
            const products = await this.productRepository.get(id);
            if (!products) {
                throw new ApplicationError("No product found", 404);
            }
            return res.status(200).json(products);
        }
        catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong", 500);
        }
    }

    async filterProduct(req, res) {
        try {
            const minPrice = req.query.minPrice;
            const maxPrice = req.query.maxPrice;
            const category = req.query.category;
            const result = await this.productRepository.filter(minPrice, maxPrice, category);
            if (!result) {
                throw new ApplicationError('Filtered data not available', 404);
            }
            else res.status(200).send(result);
        }
        catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong", 500);
        }
    }

    async rateProduct(req, res) {
        try {
            const productId = req.body.productId;
            const rating = req.body.rating;
            const userId = req.userId;
            await this.productRepository.rate(userId, productId, rating);
            return res.status(200).send("Rating has been added");
        }
        catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong", 500);
        }
    }

    async averagePrice(req, res){
        try{
            const result = await this.productRepository.averageProductPricePerCategory();
            console.log("avg", result);
            return res.status(200).json(result);
        }
        catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong", 500);
        }
    }
}