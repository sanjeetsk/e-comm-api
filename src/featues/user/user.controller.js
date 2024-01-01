import UserModal from "./user.model.js";

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
            return res.status(200).send("Sign in Successfully");
        }
    }
}