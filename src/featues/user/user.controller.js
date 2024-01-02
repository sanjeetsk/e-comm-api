import UserModal from "./user.model.js";
import jwt from "jsonwebtoken";

export default class UserController{
    signUp(req, res){   
        const { name, email, password, type } = req.body;
        const user = UserModal.SignUp(name, email, password, type);
        res.status(201).send(user);
    }

    signin(req, res){
        const result = UserModal.Signin(req.body.email, req.body.password);
        if(!result){
            return res.status(400).send('Invalid credentials');
        }
        else{
            let token = jwt.sign(
                { userId: result.id, email: result.email}, 
                "Xv77ua8xY7wJ5oMc5oMWNSG3xJrPu3rS",
                {expiresIn: '1h'}
            );
            console.log(token);
            return res.status(200).send(token);
        }
    }
}