import express from 'express';
import UserController from './user.controller.js';
import jwtAuth from '../../middlewares/jwt.middleware.js';

// initialize express router
const userRouter = express.Router();

const userController = new UserController();

userRouter.post('/signup', (req, res, next) => {
    userController.signUp(req, res, next)
});
userRouter.post('/signin', (req, res) => {
    userController.signin(req, res)
});
userRouter.put('/resetPassword', jwtAuth, (req, res) => {
    userController.resetPassword(req, res)
})

export default userRouter;