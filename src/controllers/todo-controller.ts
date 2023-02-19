import * as express from "express";
import {
  createTodoRequestValidator,
  ICreateTodoRequest,
  patchTodoRequestValidator,
} from "../models/request";
import { IController } from "../models/global";
import { withInternalErrorHandler } from "../middlewares/error-middleware";
import { TodoService } from "../services/todo-service";
import { authMiddleware } from "../middlewares/auth-middleware";

export class TodoController implements IController {
  private path = "/todos";
  public router = express.Router();

  constructor() {
    this.setRoutes();
  }

  private setRoutes() {
    this.router.get(
      this.path,
      authMiddleware,
      withInternalErrorHandler(this.getAllTodos)
    );
    this.router.post(
      this.path,
      authMiddleware,
      withInternalErrorHandler(this.createTodo)
    );
    this.router.delete(
      `${this.path}/:id`,
      authMiddleware,
      withInternalErrorHandler(this.deleteTodo)
    );
    this.router.patch(
      `${this.path}/:id`,
      authMiddleware,
      withInternalErrorHandler(this.patchTodo)
    );
  }

  getAllTodos = async (
    request: express.Request,
    response: express.Response
  ) => {
    const allTodos = await new TodoService().getAll(request.query);
    response.status(200).json(allTodos);
  };

  createTodo = async (request: express.Request, response: express.Response) => {
    const createTodoRequest = await createTodoRequestValidator.validate(
      request.body
    );
    const newTodoCreated = await new TodoService().create(
      createTodoRequest as ICreateTodoRequest,
      response.locals.userId
    );
    response.status(201).json(newTodoCreated);
  };

  patchTodo = async (request: express.Request, response: express.Response) => {
    const patchTodoRequest = await patchTodoRequestValidator.validate(
      request.body
    );
    const patchedTodo = await new TodoService().patch(
      +request.params.id,
      patchTodoRequest
    );
    response.status(201).json(patchedTodo);
  };

  deleteTodo = async (request: express.Request, response: express.Response) => {
    await new TodoService().delete(+request.params.id);
    response.status(200).json({});
  };
}
