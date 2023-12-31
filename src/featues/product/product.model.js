import { ApplicationError } from '../../error-handler/applicationError.js';
import UserModal from '../user/user.model.js'
export default class ProductModel{
    constructor(
       id,
       name,
       desc,
       price,
       imageUrl,
       category,
       sizes 
    ){
        this.id = id;
        this.name=name;
        this.desc=desc;
        this.price=price;
        this.imageUrl=imageUrl;
        this.category=category;
        this.sizes=sizes;
    }

    static add(product){
        product.id = products.length+1,
        products.push(product);
        return products;
    }

    static get(id){
        const product = products.find((i) => i.id == id);
        if(!product){
            throw new ApplicationError('Product Not Found', 404);
        }
        else return product;
    }

    static getAll(){
        return products;
    }

    static filter(minPrice, maxPrice, category){
        const result = products.filter((product) => 
        {   return ((!minPrice || minPrice <= product.price) && 
            (!maxPrice || maxPrice >= product.price) &&
            (!category || category === product.category))
        })
        if(!result){
            throw new ApplicationError('Product Not Found', 404);
        }
        else return result;
    }

    static rateProduct(userId, productId, rating){
        // validate user and product
        const user = UserModal.getAll().find(U => U.id == userId);
        if(!user){
            throw new ApplicationError('User Not Found', 400);
        }

        //validate product
        const product = products.find(u => u.id == productId);
        if(!product){
            throw new ApplicationError('Product Not Found', 404);
        }

        //Check if there are any array rating and if not then add rating array
        if(!product.rating){
            product.rating=[];
            product.rating.push({
                userId: userId,
                rating: rating
            });
        }
        else{
            // check if rating already available 
            const existingRatingIndex = product.rating.findIndex(r => r.userId = userId);
            if(existingRatingIndex !== -1){
                product.rating[existingRatingIndex] = {
                    userId: userId,
                    rating: rating
                };
            }
            else{
                // if no existing rating then add new rating
                product.rating.push({
                    userId: userId,
                    rating: rating
                })
            }
        }
    }
}

const products = [
    new ProductModel(
        1,
        "Bhagavad Gita: Yatharoop",
        "A holy book of hindus",
        494,
        "https://cdn.exoticindia.com/images/products/original/books-2017/nan284.jpg",
        "category1",
        ['S', 'M', 'L'],
    ),
    new ProductModel(
        2,
        "Atomic Habbits",
        "A supremely practical and useful book.",
        551,
        "https://shorturl.at/qzNV0",
        'category1',
        ['S', 'M', 'L'],
    ),
    new ProductModel(
        3,
        "The Psychology of Money",
        "The mindset and behaviors that influence financial decisions.",
        303,
        "https://images.blinkist.io/images/books/60140e9d6cee070007f4833a/1_1/470.jpg",
        'category1',
        ['S', 'M', 'L'],
    )
]