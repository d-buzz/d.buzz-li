const winston = require('winston');
const consoleTransport = new winston.transports.Console()
const logger = winston.createLogger({
    transports: [
      consoleTransport
    ]
});

logger.configure({
  level: 'error',
  transports: [
    consoleTransport
  ]
});

module.exports = logger;