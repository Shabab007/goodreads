import express from 'express';
import { Container } from 'typedi';
import UserController from '../controllers/UserController';

const router = express.Router();

const userController = Container.get(UserController);

// User routes
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/create-user', userController.createUser);

export default router;
