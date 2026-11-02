
import { logger } from "../utils/logger/logger.js";
import { db } from "../lib/prisma.js";

// const readEnv = (key: string, fallback = ''): string => {
//   const value = process.env[key];
//   return value === undefined || value === null || value === ''
//     ? fallback
//     : value;
// };

export async function connectToDB() {
  try {
    await db.$connect();
    logger.info("[database]: connected!");
  } catch (err) {
    console.log("[database]: connection error: ", err);
    await db.$disconnect();
    throw err;
  }
}
