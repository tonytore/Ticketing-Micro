import { createClient, RedisClientType } from "redis";
import { logger } from "../utils/logger/logger.js";
import appConfig from "../config/app_config.js";

class RedisClient {
  private client: RedisClientType;

  constructor() {
    this.client = createClient({
      url: appConfig.REDIS_URL,
    });
  }

  async connect(): Promise<void> {
    try {
      if (this.client.isOpen) {
        logger.info("🟡 Redis already connected");
        return;
      }

      await this.client.connect();
      logger.info("✅ Redis connected!");
      this.cacheError();
    } catch (error: unknown) {
      logger.error(
        `Gateway Redis connection error: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }
  }

  private cacheError(): void {
    this.client.on("error", (error: Error) => {
      logger.error(`Gateway Redis error: ${error.message}`);
    });
  }
  public getClient(): RedisClientType {
    return this.client;
  }
}

const redisConnection = new RedisClient();

export default redisConnection;
