const appConfig = {
  PORT: process.env.PORT || 3000,
  APP_NAME: process.env.APP_NAME || "auth-service",
  APP_ENV: process.env.APP_ENV || "development",
  APP_PORT: process.env.APP_PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET || "default-secret",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1h",
  DB_HOST: process.env.DB_HOST || "auth-postgres-srv",
  DB_PORT: process.env.DB_PORT || 5432,
  DB_USER: process.env.DB_USER || "postgres",
  DB_PASSWORD: process.env.DB_PASSWORD || "salem21211",
  DB_NAME: process.env.DB_NAME || "ticketing_auth",
  LOG_LEVEL: process.env.LOG_LEVEL || "info",
  DATABASE_URL:
    process.env.DATABASE_URL ||
    "postgresql://postgres:salem21211@localhost:5432/ticketing_auth",
  REDIS_URL: process.env.REDIS_URL || "redis://localhost:6379",
};

export default appConfig;
