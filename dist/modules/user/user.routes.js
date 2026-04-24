import { UserRepository } from './user.repository.js';
import { Router } from 'express';
import { UserService } from './user.service.js';
import { UserController } from './user.controller.js';
'';
const userRouter = Router();
const UserRepositoryInstance = new UserRepository();
const UserServiceInstance = new UserService(UserRepositoryInstance);
const UserControllerInstance = new UserController(UserServiceInstance);
userRouter.get('/', UserControllerInstance.getAllUsers);
// userRouter.get('/:id', UserControllerInstance.getUserById);
// userRouter.put('/:id', UserControllerInstance.updateUser);
// userRouter.patch('/:id/avatar', UserControllerInstance.updateUserAvatar);
// userRouter.patch('/:id/cover', UserControllerInstance.updateUserCover);
// userRouter.get('/:id/stats', UserControllerInstance.getUserStats);
// userRouter.delete('/:id', UserControllerInstance.deleteUser);
// userRouter.get('/username/:username', UserControllerInstance.getUserByUsername);
// userRouter.put('/privacy-settings', UserControllerInstance.updatePrivacySettings);
export default userRouter;
/*

- `GET /users/:userId`
- `PUT /users/:userId`
- `PATCH /users/:userId/avatar`
- `PATCH /users/:userId/cover`
- `GET /users/:userId/stats`
- `DELETE /users/:userId`
- `GET /users/username/:username`
- `PUT /users/privacy-settings`

*/ 
//# sourceMappingURL=user.routes.js.map