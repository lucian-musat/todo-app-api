import * as express from "express";
import {
  createUserRequestValidator,
  ICreateUserRequest,
  loginRequestValidator,
} from "../models/request";
import { IController } from "../models/global";
import { withInternalErrorHandler } from "../middlewares/error-middleware";
import { UserService } from "../services/user-service";

export class UserController implements IController {
  private path = "/users";
  public router = express.Router();

  constructor() {
    this.setRoutes();
  }

  private setRoutes() {
    this.router.post(
      `${this.path}/login`,
      withInternalErrorHandler(this.login)
    );
    this.router.post(this.path, withInternalErrorHandler(this.createUser));
  }

  login = async (request: express.Request, response: express.Response) => {
    const loginRequest = await loginRequestValidator.validate(request.body);
    const jwtToken = await new UserService().login(
      loginRequest as ICreateUserRequest
    );
    response.status(200).json(jwtToken);
  };

  createUser = async (request: express.Request, response: express.Response) => {
    const createUserRequest = await createUserRequestValidator.validate(
      request.body
    );
    const newCreatedUser = await new UserService().create(
      createUserRequest as ICreateUserRequest
    );
    response.status(201).json(newCreatedUser);
  };
}
