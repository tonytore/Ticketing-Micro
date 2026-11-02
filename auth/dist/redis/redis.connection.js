import { createClient } from "redis";
import { logger } from "../utils/logger/logger.js";
import appConfig from "../config/app_config.js";
class RedisClient {
    client;
    constructor() {
        this.client = createClient({
            url: appConfig.REDIS_URL,
        });
    }
    async connect() {
        try {
            if (this.client.isOpen) {
                logger.info("🟡 Redis already connected");
                return;
            }
            await this.client.connect();
            logger.info("✅ Redis connected!");
            this.cacheError();
        }
        catch (error) {
            logger.error(`Gateway Redis connection error: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    cacheError() {
        this.client.on("error", (error) => {
            logger.error(`Gateway Redis error: ${error.message}`);
        });
    }
    getClient() {
        return this.client;
    }
}
const redisConnection = new RedisClient();
export default redisConnection;
