import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { loggerMiddleware } from "./middlewares/logger-middleware";
import { IController } from "./models/global";
import { errorsHandlerMiddleware } from "./middlewares/error-middleware";
import { TodoDataSource } from "./data-source";

export class App {
  public app: express.Application;
  public port: string;

  constructor(controllers: IController[]) {
    dotenv.config();
    this.app = express();
    this.port = process.env.SERVER_PORT;

    this.useDatabase();
    this.useMiddlewares();
    this.useControllers(controllers);
    this.app.use(errorsHandlerMiddleware);
  }

  private useMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(loggerMiddleware);
  }

  private useControllers(controllers: IController[]) {
    controllers.forEach((controller) => {
      this.app.use("/api/", controller.router);
    });
  }

  private async useDatabase() {
    await TodoDataSource.initialize();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}
