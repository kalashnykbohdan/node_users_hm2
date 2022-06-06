const { Router } = require("express");
const UserController = require('./user.controller')

const userRouter = Router();

//CRUD

// Read

userRouter.get('/', UserController.getUsers);

// Create

userRouter.post('/', UserController.vcalidateCreateUser, UserController.createUser);

//Update

userRouter.put('/:id', UserController.validateUpdateUser, UserController.updateUser);

//------------------------Delete

userRouter.delete('/:id', UserController.deleteUser);


module.exports = userRouter;