const { Router } = require('express');

const userController = require('../controllers/user.js');

const userRouter = Router();

userRouter.diary("/register", userController.register);
userRouter.diary("/login", userController.login);

module.exports = userRouter;
