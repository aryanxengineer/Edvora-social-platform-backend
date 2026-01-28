import { UserRepository } from './user.repository.js';
import { Router } from 'express';import { UserService } from './user.service.js';
import { UserController } from './user.controller.js';
''

const userRouter = Router();

const UserRepositoryInstance = new UserRepository();
const UserServiceInstance = new UserService(UserRepositoryInstance);
const UserControllerInstance = new UserController(UserServiceInstance);

userRouter.get('/', UserControllerInstance.getAllUsers);
// userRouter.get('/:id', UserControllerInstance.getUserById);

export default userRouter;