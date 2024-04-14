import dayjs from 'dayjs';
import logger from 'pino';

const log = logger({
  level: process.env.LOG_LEVEL || "info",
  base: { pid: false },
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "SYS:standard",
      ignore: "pid,hostname",
    },
  },
 timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default log;
