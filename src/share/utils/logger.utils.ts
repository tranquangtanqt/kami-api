import { LOG_CONFIG } from 'src/config/constant.config';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

export class LogUtils {
  private winstonLog: any;
  private contextName: any;

  readonly levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
  };

  readonly level = () => {
    const env = process.env.NODE_ENV || 'development';
    const isDevelopment = env === 'development';
    return isDevelopment ? 'debug' : 'warn';
  };

  readonly colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
  };

  readonly format = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.printf((info) => {
      return `${info.timestamp} [${info.level}] [${
        info.contextName
      }] [${JSON.stringify(info)}] ${info.message}`;
    }),
  );

  readonly dailyRotateFileTransport = new winston.transports.DailyRotateFile({
    silent: LOG_CONFIG.DAILY_SILENT == 'false',
    filename: LOG_CONFIG.DAILY_PATH,
    datePattern: LOG_CONFIG.DAILY_PATTERN,
    zippedArchive: true,
    maxSize: 20971520, // 20MB
    maxFiles: '14d',
    json: true,
  });

  readonly consoleTransport = new winston.transports.Console({
    silent: LOG_CONFIG.CONSOLE_SILENT == 'false',
    format: winston.format.combine(
      this.format,
      winston.format.colorize({ all: true }),
    ),
  });

  readonly maxFileTransport = new winston.transports.File({
    silent: LOG_CONFIG.MAX_SIZE_SILENT == 'false',
    filename: LOG_CONFIG.MAX_SIZE_PATH,
    maxsize: 20971520, // 20MB
    level: 'error',
  });

  constructor() {
    this.winstonLog = winston.createLogger({
      level: this.level(),
      levels: this.levels,
      format: this.format,
      transports: [
        this.consoleTransport,
        this.maxFileTransport,
        this.dailyRotateFileTransport,
      ],
    });
    winston.addColors(this.colors);
  }

  public setContextName(contextName) {
    this.contextName = contextName;
  }

  // 0
  public error(message: any, key?: string) {
    this.winstonLog.log({
      level: 'error',
      message,
      contextName: this.contextName,
      key,
    });
  }

  //1
  public warn(message: any, key?: string) {
    this.winstonLog.log({
      level: 'warn',
      message,
      contextName: this.contextName,
      key,
    });
  }

  // 2
  public log(message: any, key?: string) {
    this.winstonLog.log({
      level: 'info',
      message,
      contextName: this.contextName,
      key,
    });
  }

  // 2
  public info(message: any, key?: string) {
    this.winstonLog.log({
      level: 'info',
      message,
      contextName: this.contextName,
      key,
    });
  }

  // 3
  public http(message: any, key?: string) {
    this.winstonLog.log({
      level: 'http',
      message,
      contextName: this.contextName,
      key,
    });
  }

  // 4
  public verbose(message: any, key?: string) {
    this.winstonLog.log({
      level: 'verbose',
      message,
      contextName: this.contextName,
      key,
    });
  }

  // 5
  public debug(message: any, key?: string) {
    this.winstonLog.log({
      level: 'debug',
      message,
      contextName: this.contextName,
      key,
    });
  }

  // 6
  public silly(message: any, key?: string) {
    this.winstonLog.log({
      level: 'silly',
      message,
      contextName: this.contextName,
      key,
    });
  }
}
