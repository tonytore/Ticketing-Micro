const appConfig = {
    PORT: process.env.PORT || 3000,
    APP_NAME: process.env.APP_NAME || "auth-service",
    APP_ENV: process.env.APP_ENV || "development",
    APP_PORT: process.env.APP_PORT || 3000,
    JWT_SECRET: process.env.JWT_SECRET || "default-secret",
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1h",
    DB_HOST: process.env.DB_HOST || "localhost",
    DB_PORT: process.env.DB_PORT || 5432,
    DB_USER: process.env.DB_USER || "user",
    DB_PASSWORD: process.env.DB_PASSWORD || "password",
    DB_NAME: process.env.DB_NAME || "auth_db",
    LOG_LEVEL: process.env.LOG_LEVEL || "info",
    DATABASE_URL: process.env.DATABASE_URL ||
        "postgresql://user:password@localhost:5432/auth_db",
    REDIS_URL: process.env.REDIS_URL || "redis://localhost:6379",
};
export default appConfig;
