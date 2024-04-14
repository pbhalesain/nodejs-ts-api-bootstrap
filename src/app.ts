import express, { Application, } from "express";
import Controller from "./utils/interfaces/controller.interface";
import Database from "./utils/db.connect";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import compression from "compression";
import ErrorMiddleware from './middleware/error.middleware';


/**
 * Represents the main application class that initializes the Express server, sets up middleware, and manages the database connection.
 */
class App {
  public express: Application;
  public port: number;

  constructor(controllers: Controller[], port: number) {
    this.express = express();
    this.port = port;

    this.initialiseDatabaseConnection();
    this.initialiseMiddleware();
    this.initialiseControllers(controllers);
    this.initialiseErrorHandling();
  }

  private initialiseDatabaseConnection() {
    Database.getInstance().getConnection();
  }

  private initialiseMiddleware() {
    this.express.use(helmet());
    this.express.use(cors());
    this.express.use(morgan('dev'));
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(compression());
  }

  private initialiseErrorHandling() {
    this.express.use(ErrorMiddleware);
  }
  private initialiseControllers(controllers: Controller[]) {
    controllers.forEach((controller: Controller) => {
      this.express.use('/api/v1', controller.router);
    });
  }


  public listen(): void {
    this.express.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default App;