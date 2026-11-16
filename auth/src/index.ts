import http from "http";
import app from "./app.js";
import { logger } from "@salemticket/common";
import { appConfig } from "@salemticket/common";
import redisConnection from "./redis/redis.connection.js";
import { connectToDB } from "./config/db.js";

const httpServer = http.createServer(app);

const initializeApp = async () => {
  try {
    httpServer.listen(appConfig.PORT, () => {
      logger.info(
        `[server]: server is running at http://localhost:${appConfig.PORT}`,
      );
    });
    await connectToDB();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  // try {
  //   await redisConnection.connect();
  // } catch (error) {
  //   logger.error(error);
  // }
};

// INIT Application
initializeApp();
