import { LikeRepository } from "./like.repository.js";


export class LikeController {
    constructor() {
        this.likeRepository = new LikeRepository();
    }

    async getLikeItems(req, res, next){
        try{
            const { id, type} = req.body;
            const likes = await this.likeRepository.getLikeItems(id, type);
            return res.status(200).send(likes);
        }
        catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong with Order", 500);
        }
    }

    async likeItem(req, res) {
        try {
            const {id, type} = req.body;
            if(type!='Product' && type!='Category'){
                return res.status(400).send('Invalid')
            }
            if(type == 'Product'){
                await this.likeRepository.LikeProduct(req.userId, id);
                return res.status(200).send("like added");
            }
            else{
                await this.likeRepository.LikeCategory(req.userId, id);
                return res.status(200).send("like added");
            }
        }

        catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong with Order", 500);
        }
    }

}