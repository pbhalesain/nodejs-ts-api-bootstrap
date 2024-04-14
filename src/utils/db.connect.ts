import config from "config";
import mongoose, { Connection } from "mongoose";
import logger from "./logger";

class Database {
  private static instance: Database;
  private connection: Connection | undefined;

  private constructor() {
    this.connect();
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

    private async connect(): Promise<void> {
        const dbUrl = config.get<string>("dbUrl");
        logger.info(`The DB URL is: ${dbUrl}`);

        try {
            const connection = await mongoose.connect(dbUrl);
            this.connection = connection.connection;
            logger.info("Connected to database");
        } catch (error: any) {
            logger.error("Error connecting to database: ", error);
            process.exit(1);
        }

        this.connection.once("open", () => {
            logger.info("Connected to database");
        });
    }

    public getConnection(): Connection | undefined {
        return this.connection;
    }
}

export default Database;