import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/user";
import { Todo } from "./entity/todo";
import dotenv from "dotenv";
dotenv.config();

export const TodoDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE_NAME,
  synchronize: true,
  logging: false,
  entities: [User, Todo],
  migrations: [],
  subscribers: [],
});
