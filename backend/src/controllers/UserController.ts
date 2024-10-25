import { Request, Response } from 'express';
import UserService from '../services/UserService';
import { Service } from 'typedi';
import { User } from '../dto/user/user';

@Service()
export default class AuthController {
  constructor(private userService: UserService) {}

  // Sign In
  public createUser = async (req: Request, res: Response): Promise<void> => {
    const user: User = await this.userService.createUser(req.body);
    res.successResponse({ user });
  };

  public getAllUsers = async (req: Request, res: Response): Promise<void> => {
    const users: User[] = await this.userService.getAllUsers();
    res.successResponse({ users });
  };
}