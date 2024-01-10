import { ApplicationError } from '../../error-handler/applicationError.js';
import UserModal from '../user/user.model.js'
export default class ProductModel{
    constructor(
       name,
       desc,
       price,
       sizes,
       imageUrl,
       category,
       id 
    ){
        this._id = id;
        this.name=name;
        this.desc=desc;
        this.price=price;
        this.imageUrl=imageUrl;
        this.category=category;
        this.sizes=sizes;
    }

    // static rateProduct(userId, productId, rating){
    //     // validate user and product
    //     const user = UserModal.getAll().find(U => U.id == userId);
    //     if(!user){
    //         throw new ApplicationError('User Not Found', 400);
    //     }

    //     //validate product
    //     const product = products.find(u => u.id == productId);
    //     if(!product){
    //         throw new ApplicationError('Product Not Found', 404);
    //     }

    //     //Check if there are any array rating and if not then add rating array
    //     if(!product.rating){
    //         product.rating=[];
    //         product.rating.push({
    //             userId: userId,
    //             rating: rating
    //         });
    //     }
    //     else{
    //         // check if rating already available 
    //         const existingRatingIndex = product.rating.findIndex(r => r.userId = userId);
    //         if(existingRatingIndex !== -1){
    //             product.rating[existingRatingIndex] = {
    //                 userId: userId,
    //                 rating: rating
    //             };
    //         }
    //         else{
    //             // if no existing rating then add new rating
    //             product.rating.push({
    //                 userId: userId,
    //                 rating: rating
    //             })
    //         }
    //     }
    // }
}

