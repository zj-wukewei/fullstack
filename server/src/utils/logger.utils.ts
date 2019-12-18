const path = require('path');
const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const log = (
  type: 'error' | 'warn' | 'info' | 'debug' | 'verbose',
  message: string,
  context?: string,
  trace?: string | any,
) => {
  const LOG_DIR_PATH = path.resolve(__dirname, '../../logs');

  const WINSTON_TIMESTAMP_FORMAT = 'YYYY-MM-DD HH:mm:ss';
  const WINSTON_INFO_FORMAT = winston.format.combine(
    winston.format.label(),
    winston.format.timestamp({ format: WINSTON_TIMESTAMP_FORMAT }),
    winston.format.printf(
      (info: any) => `[${info.timestamp}] ${info.level.toUpperCase()}: ${info.message}`,
    ),
  );

  const winstonLogger = winston.createLogger();

  winstonLogger.configure({
    level: 'verbose',
    format: WINSTON_INFO_FORMAT,
    transports: [
      new DailyRotateFile({
        filename: `${LOG_DIR_PATH}/app-%DATE%.log`,
        datePattern: 'YYYY-MM-DD',
        zippedArchive: false,
        maxSize: '50m',
        maxFiles: '3650d',
        level: 'verbose',
      }),
      new winston.transports.File({
        filename: `${LOG_DIR_PATH}/_error.log`,
        level: 'error',
      }),
      new winston.transports.File({
        filename: `${LOG_DIR_PATH}/_warn.log`,
        level: 'warn',
      }),
    ],
  });

  let result = context ? `[${context}] ${message}` : `[ / ] ${message}`;

  if (trace) {
    result += `📍[ERROR-TRACE] ${trace}\n`;
  }

  return winstonLogger.log(type, result);
};

export const loggerUtil = {
  log: (message: string, context?: string) => log('info', message, context),
  error: (message: string, context?: string, trace?: string) =>
    log('error', `❌ ${message}`, context, trace),
  warn: (message: string, context?: string) => log('warn', `⚠️ ${message}`, context),
  debug: (message: string, context?: string) => log('debug', message, context),
  verbose: (message: string, context?: string) => log('verbose', message, context),
};
