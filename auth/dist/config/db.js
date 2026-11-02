import { logger } from "../utils/logger/logger.js";
import { db } from "../lib/prisma.js";
export { db };
export async function connectToDB() {
    try {
        await db.$connect();
        logger.info("[database]: connected!");
    }
    catch (err) {
        console.log("[database]: connection error: ", err);
        await db.$disconnect();
        throw err;
    }
}
