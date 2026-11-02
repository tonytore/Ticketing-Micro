import winston, { type Logger } from "winston";
import appConfig from "../../config/app_config";

const allowedLevels = new Set([
  "error",
  "warn",
  "info",
  "http",
  "verbose",
  "debug",
  "silly",
]);

export interface LoggerOptions {
  service: string;
  environment: string;
  level: string;
  developmentPretty?: boolean;
}

const normalizeLevel = (level: string): string =>
  allowedLevels.has(level.toLowerCase()) ? level.toLowerCase() : "info";

const prettyFormat = winston.format.printf((info) => {
  const { timestamp, level, service, message, ...metadata } = info;
  const suffix = Object.keys(metadata).length
    ? ` ${JSON.stringify(metadata)}`
    : "";
  return `${timestamp} [${service}] ${level}: ${message}${suffix}`;
});

export const createLogger = ({
  service,
  environment,
  level,
  developmentPretty = environment !== "production",
}: LoggerOptions): Logger => {
  const normalizedLevel = normalizeLevel(level);
  const format = developmentPretty
    ? winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize({ level: true }),
        prettyFormat,
      )
    : winston.format.combine(winston.format.timestamp(), winston.format.json());
  return winston.createLogger({
    level: normalizedLevel,
    defaultMeta: { service, environment },
    exitOnError: false,
    transports: [
      new winston.transports.Console({
        level: normalizedLevel,
        handleExceptions: true,
        stderrLevels: ["error", "warn"],
        format,
      }),
    ],
  });
};

const logger = createLogger({
  service: appConfig.APP_NAME || "esl-backend",
  environment: appConfig.APP_ENV || "development",
  level: appConfig.LOG_LEVEL || "info",
});

export { logger };
