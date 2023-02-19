import { Repository } from "typeorm";
import { TodoDataSource } from "../data-source";
import { User } from "../entity/user";
import { IUser } from "../models/user";

export class UserRepository {
  private repo: Repository<User>;
  constructor() {
    this.repo = TodoDataSource.getRepository(User);
  }

  async get(id): Promise<IUser> {
    return this.repo.findOneBy({ id });
  }

  async getByEmail(email: string): Promise<IUser> {
    return this.repo.findOneBy({ email });
  }

  async create(user: IUser): Promise<IUser> {
    const newUser = TodoDataSource.manager.create(User, user);
    return this.repo.save(newUser);
  }
}
