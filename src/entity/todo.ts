import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { TodoStatuses } from "../models/todo";

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  status: TodoStatuses;

  @Column()
  createdBy: number;
}
