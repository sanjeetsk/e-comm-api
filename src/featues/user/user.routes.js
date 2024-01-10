import express from 'express';
import UserController from './user.controller.js';

// initialize express router
const userRouter = express.Router();

const userController = new UserController();

userRouter.post('/signup', (req, res) => {
    userController.signUp(req, res)
});
userRouter.post('/signin', (req, res) => {
    userController.signin(req, res)
});

export default userRouter;