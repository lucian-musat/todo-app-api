import { ICreateTodoRequest, IPatchTodoRequest } from "../models/request";
import { ITodo, TodoStatuses } from "../models/todo";
import { TodoRepository } from "../repositories/todo";

export class TodoService {
  async getAll(filters: Partial<ITodo>): Promise<ITodo[]> {
    return new TodoRepository().getAll(filters);
  }

  async create(
    createTodoRequest: ICreateTodoRequest,
    userId: number
  ): Promise<ITodo> {
    return new TodoRepository().create({
      id: 0,
      title: createTodoRequest.title,
      createdBy: userId,
      status: TodoStatuses.Uncompleted,
    });
  }

  async patch(id: number, patchTodoRequest: IPatchTodoRequest): Promise<ITodo> {
    return new TodoRepository().patch(id, patchTodoRequest);
  }

  async delete(id: number): Promise<void> {
    return new TodoRepository().delete(id);
  }
}
