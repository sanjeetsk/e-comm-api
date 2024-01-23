import { ApplicationError } from "../../error-handler/applicationError.js";
import UserModal from "./user.model.js";
import jwt from "jsonwebtoken";
// import UserRepository from "./user.repository.js";
import UserRepository from "./user.repository_new.js";
import bcrypt from 'bcrypt';

export default class UserController {

    constructor() {
        this.userRepository = new UserRepository();
    }

    async resetPassword(req, res){
        const {newPassword} = req.body;
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        const userId = req.userId;
        try{
            await this.userRepository.resetPassword(userId, hashedPassword);
            return res.status(200).send("Password reset successfully");
        }
        catch (err) {
            console.log(err);
            throw new ApplicationError("Internal Server error", 500);
        }
    }

    async signUp(req, res, next) {
        try {
            const { name, email, password, type } = req.body;
            // hashing the password using bcrypt
            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new UserModal(
                name,
                email,
                hashedPassword,
                type
            );
            await this.userRepository.signUp(user);
            return res.status(201).json(user);
        }
        catch (err) {
            next(err);
        }
    }

    async signin(req, res) {
        try {
            // 1. Find user by email
            const user = await this.userRepository.findByEmail(req.body.email);
            if (!user) {
                return res.status(400).send('Invalid credentials');
            }
            else {
                // compare the password with hashed password
                const result = await bcrypt.compare(req.body.password, user.password);
                if (result) {
                    // create token
                    let token = jwt.sign(
                        { userId: user._id, email: user.email },
                        process.env.JWT_SECRET,
                        { expiresIn: '1h' }
                    );
                    console.log(token);
                    return res.status(200).send(token);
                }
                else {
                    return res.status(400).send('Invalid credentials');
                }
            }
        }
        catch (err) {
            console.log("err", err);
            throw new ApplicationError("Something went wrong", 500)
        }
    }
}