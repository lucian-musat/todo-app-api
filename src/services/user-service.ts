import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { AppError } from "../errors/app-error";
import { ErrorCodes, ErrorDescriptions } from "../errors/errors-codes";
import { ICreateUserRequest, ILoginRequest } from "../models/request";
import { ILoginResponse, IUser } from "../models/user";
import { UserRepository } from "../repositories/user";

export class UserService {
  async create(createUserRequest: ICreateUserRequest): Promise<Partial<IUser>> {
    const existingUser = await new UserRepository().getByEmail(
      createUserRequest.email
    );
    if (existingUser) {
      throw new AppError(
        ErrorCodes.DuplicatedUserEmail,
        ErrorDescriptions.DuplicatedUserEmail
      );
    }
    const newSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(
      createUserRequest.password,
      newSalt
    );
    const newUser = await new UserRepository().create({
      id: 0,
      name: createUserRequest.name,
      email: createUserRequest.email,
      password: hashedPassword,
      salt: newSalt,
    });

    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };
  }

  async login(loginRequest: ILoginRequest): Promise<ILoginResponse> {
    const loginUser = await new UserRepository().getByEmail(loginRequest.email);

    if (!loginUser) {
      throw new AppError(
        ErrorCodes.WrongCredentials,
        ErrorDescriptions.WrongCredentials
      );
    }

    const passwordMatch = bcrypt.compare(loginRequest.password, loginUser.salt);

    if (!passwordMatch) {
      throw new AppError(
        ErrorCodes.WrongCredentials,
        ErrorDescriptions.WrongCredentials
      );
    }

    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const tokenData = {
      time: Date(),
      userId: loginUser.id,
      userName: loginUser.name,
    };

    return { token: jwt.sign(tokenData, jwtSecretKey) };
  }
}
