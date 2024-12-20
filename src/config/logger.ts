import { createLogger, debug, format, transports, warn } from "winston";
import pc from "picocolors";

const levels: Record<string, any> = {
    error: pc.red,
    warn: pc.yellow,
    info: pc.green,
    debug: pc.blue,
};

const logFormat = format.printf(({ level, message, timestamp }) => {
    const levelColor = levels[level](`${level.toUpperCase()}`);
    return `${timestamp} ${levelColor} ${`[${message}]`}`;
});

export const logger = createLogger({
    level: "debug",
    format: format.combine(format.timestamp(), format.errors({ stack: true }), logFormat),
    transports: [new transports.Console()],
});
