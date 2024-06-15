import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';

const getLogger = (fileName = 'application') => {
    const fileLogTransport = new transports.DailyRotateFile({
        filename: `logs/${fileName}-%DATE%.log`,
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '30d'
    });

    const consoleTransport = new transports.Console({
        level: process.env.LOG_LEVEL || 'info',
        handleExceptions: true,
        json: false, 
        colorize: true,
        format: format.combine(
            format.colorize(),
            format.simple()
        )
    });

    const logger = createLogger({
        level: 'info',
        format: format.combine(
            format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss Z'
            }),
            format.errors({ stack: true }),
            format.splat(),
            format.printf(
                ({ level, message, label = process.env.NODE_ENV, timestamp, stack }) =>
                    `${timestamp} [${label}] ${level}: ${message.method} ${new URL(message.url).pathname} ${stack || ''}`
            )
        ),
        defaultMeta: { service: 'user-service' },
        transports: [
            consoleTransport
        ],
    });

    if (process.env.NODE_ENV !== 'production') {
        logger.add(fileLogTransport);
    }

    return logger;
}

export default getLogger();
