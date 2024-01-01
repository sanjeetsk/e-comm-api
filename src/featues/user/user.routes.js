import express from 'express';
import UserController from './user.controller.js';

// initialize express router
const userRouter = express.Router();

const userController = new UserController();

userRouter.post('/signup', userController.signUp);
userRouter.post('/signin', userController.signin);

export default userRouter;