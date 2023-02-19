import * as yup from "yup";
import { TodoStatuses } from "./todo";

export interface ICreateTodoRequest {
  title: string;
}

export const createTodoRequestValidator: yup.ObjectSchema<ICreateTodoRequest> =
  yup.object({
    title: yup.string().required(),
  });

export interface IPatchTodoRequest {
  status?: TodoStatuses;
}

export const patchTodoRequestValidator: yup.ObjectSchema<IPatchTodoRequest> =
  yup.object({
    status: yup
      .mixed<TodoStatuses>()
      .oneOf(Object.values(TodoStatuses))
      .optional(),
  });

export interface ICreateUserRequest {
  name: string;
  email: string;
  password: string;
}

export const createUserRequestValidator: yup.ObjectSchema<ICreateUserRequest> =
  yup.object({
    name: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().min(6).required(),
  });

export interface ILoginRequest {
  email: string;
  password: string;
}

export const loginRequestValidator: yup.ObjectSchema<ILoginRequest> =
  yup.object({
    email: yup.string().required(),
    password: yup.string().min(6).required(),
  });
