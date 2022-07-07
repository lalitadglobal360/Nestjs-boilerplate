import { WinstonModule } from "nest-winston";
import { transports } from "winston";
const winston = require("winston");
export const appOptions = {
    cors: true,
    logger: WinstonModule.createLogger({
      transports: [
        // new winston.transports.Console({}),
        new winston.transports.File({
          filename:
            "logs/Combined-" + new Date(Date.now()).toDateString() + ".log",
          level: "info",
          handleExceptions: true,
             }),
        new winston.transports.File({
          filename:
            "logs/Errors-" + new Date(Date.now()).toDateString() + ".log",
          level: "error",
        }),
      ],
      exceptionHandlers: [
        new transports.File({ filename: 'logs/exceptions.log' })
      ],
      
      format: winston.format.combine(
        winston.format.timestamp({
          format: "DD/MM/YYYY, HH:mm:ss",
        }),
        winston.format.printf(
          (error) => `[Nest] 5277   - ${[error.timestamp]}  [${error.context}] :  ${error.level}: ${error.message}`
        )
      ),
    }),
  };