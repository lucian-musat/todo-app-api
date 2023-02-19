export interface ITodo {
  id: number;
  title: string;
  status: TodoStatuses;
  createdBy: number;
}

export enum TodoStatuses {
  Completed = "Completed",
  Uncompleted = "Uncompleted",
}

export type ITodoWithoutId = Omit<ITodo, "id">;
