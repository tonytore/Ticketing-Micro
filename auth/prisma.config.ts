// prisma.config.ts - Prisma 7 configuration file
import "dotenv/config";
import { defineConfig } from "prisma/config";
import  appConfig  from './src/config/app_config'

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: appConfig.DATABASE_URL || "postgresql://postgres:salem21211@localhost:5432/ticketing_auth",
  },
});
