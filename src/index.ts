import { App } from "./app";
import { TodoController } from "./controllers/todo-controller";
import { UserController } from "./controllers/user-controller";

const app = new App([new TodoController(), new UserController()]);

app.listen();
