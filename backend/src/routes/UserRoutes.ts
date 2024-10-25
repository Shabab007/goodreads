import express from 'express';
import { Container } from 'typedi';
import UserController from '../controllers/UserController';

const router = express.Router();

const userController = Container.get(UserController);

// User routes
router.get('/', userController.getAllUsers);
router.post('/createUser', userController.createUser);

export default router;
