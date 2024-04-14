import config from "config";
import mongoose from "mongoose";
import logger from "./logger";

async function connect() {
  const dbUrl = config.get<string>("dbUrl");
  console.log(`the db url is + ${dbUrl}`);
  try {
    await mongoose.connect(dbUrl);
    logger.info("Connected to database");
  } catch (error: any) {
    console.log(error);
    logger.error("Error connecting to database: ", error);
    process.exit(1);
  }

  mongoose.connection.once("open", () => {
    logger.info("Connected to database");
  });
  return mongoose.connection;
}
export default connect;
