import { User } from '../entity/User';
import { User as UserInterface } from '../dto/user/user';
import { Service } from 'typedi';
import AppDataSource from '../DataSource';
@Service()
export default class UserRepository {
  userRepo = AppDataSource.getRepository(User);
  // Create a new user
  public async createUser(userData: UserInterface): Promise<User> {
    const user = new User();
    user.email = userData.email;
    user.username = userData.username;
    user.password = userData.password;
    user.reviews = [];
    user.comments = [];

    await this.userRepo.save(user); // Save the user to the database
    return user; // Return the created user
  }

  // Find a user by email
  public async findByEmail(email: string): Promise<User | null> {
    return await this.userRepo.findOneBy({ email });
  }

  public async findUserById(id: string): Promise<User | null> {
    return await this.userRepo.findOne({ where: { id: parseInt(id) } });
  }

  public async findAll(): Promise<User[] | null> {
    return await this.userRepo.find();
  }
}
