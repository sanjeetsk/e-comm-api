import ProductModel from "./product.model.js";

export default class ProductController{
    getAllProduct(req, res){
        const products = ProductModel.getAll();
        res.status(200).send(products);
    }
    addProduct(req, res){
        console.log(req.body);
        const {name, prices, sizes} = req.body;
        const newProduct = {
            name, 
            prices: parseFloat(prices),
            sizes: sizes.split(','),
            imageUrl: req.file.filename,
        };
        const createdRecord = ProductModel.add(newProduct);
        res.status(201).send(createdRecord);
    }
   
    getOneProduct(req, res){
        const id = req.params.id;
        const product = ProductModel.get(id);
        return res.status(200).send(product);
    }

    filterProduct(req, res){
        const minPrice = req.query.minPrice;
        const maxPrice = req.query.maxPrice;
        const category = req.query.category;
        const result = ProductModel.filter(minPrice, maxPrice, category);
        console.log(result);
        res.status(200).send(result);
    }

    rateProduct(req, res){
        const userId = req.query.userId;
        const productId = req.query.productId;
        const rating = req.query.rating;
        try{
            ProductModel.rateProduct(
                userId,
                productId,
                rating
            )
        }
        catch(err){
            res.status(400).send(err.message);
        }
        return res.status(200).send("Rating has been added");
    }
}