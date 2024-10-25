import { BadRequestError } from '../utils/response/errors/bad-request-error';
import { Service } from 'typedi';
import UserRepository from '../repositories/UserRepository';
import { UserDto, User as UserInterface } from '../dto/user/user';
import { plainToClass, plainToInstance } from 'class-transformer';
import { NotFoundError } from '../utils/response/errors/not-found-error';

@Service()
export default class UserService {
  constructor(public userRepository: UserRepository) {}

  createUser = async (data: UserInterface): Promise<UserDto> => {
    const user = await this.userRepository.findByEmail(data.email);
    if (user) {
      throw new BadRequestError('this email is already registered');
    }

    const result = await this.userRepository.createUser(data);
    return plainToClass(UserDto, result);
  };

  getAllUsers = async () => {
    try {
      const users = await this.userRepository.findAll();
      return plainToInstance(UserDto, users);
    } catch (error) {
      throw new NotFoundError();
    }
  };

  getUserById = async (id: string) => {
    try {
      const user = await this.userRepository.findUserById(id);
      return plainToInstance(UserDto, user);
    } catch (error) {
      throw new NotFoundError();
    }
  };
}
