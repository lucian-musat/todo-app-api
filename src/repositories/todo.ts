import { Repository } from "typeorm";
import { TodoDataSource } from "../data-source";
import { Todo } from "../entity/todo";
import { AppError } from "../errors/app-error";
import { ErrorCodes, ErrorDescriptions } from "../errors/errors-codes";
import { IPatchTodoRequest } from "../models/request";
import { ITodo } from "../models/todo";

export class TodoRepository {
  private repo: Repository<Todo>;
  constructor() {
    this.repo = TodoDataSource.getRepository(Todo);
  }

  async getAll(filters: Partial<ITodo>): Promise<ITodo[]> {
    return this.repo.findBy(filters);
  }

  async create(todo: ITodo): Promise<ITodo> {
    const newTodo = TodoDataSource.manager.create(Todo, todo);
    return this.repo.save(newTodo);
  }

  async patch(id: number, patchTodoRequest: IPatchTodoRequest): Promise<ITodo> {
    const todoToPatch = await this.repo.findOneBy({ id });
    if (!todoToPatch) {
      throw new AppError(
        ErrorCodes.EntityNotFound,
        ErrorDescriptions.EntityNotFound
      );
    }

    todoToPatch.status = patchTodoRequest.status;
    return this.repo.save(todoToPatch);
  }

  async delete(id: number): Promise<void> {
    const todoToDelete = await this.repo.findOneBy({ id });
    if (!todoToDelete) {
      throw new AppError(
        ErrorCodes.EntityNotFound,
        ErrorDescriptions.EntityNotFound
      );
    }
    await this.repo.remove(todoToDelete);
  }
}
