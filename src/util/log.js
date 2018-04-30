/* LOGGER EXAMPLES
var log = require('./log.js')
log.trace('testing')
log.debug('testing')
log.info('testing')
log.warn('testing')
log.crit('testing')
log.fatal('testing')
*/

const winston = require('winston')
const format = winston.format
const { combine, timestamp, printf } = format;
const constants = require('../../../Overview-Bot/src/constants.js')

const json = printf(info => {
  return `{level: ${info.level}, message: ${info.message}, timestamp: ${info.timestamp}},`;
});

const simple = printf(info => {
  return `${info.timestamp} | ${info.level}: ${info.message}`
})

// set default log level.
const log_level = constants.LOG.LEVEL

const level_information = {
  levels: {
    fatal: 0,
    crit: 1,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
    trace: 5
  },
  colors: {
    fatal: 'red',
    crit: 'red',
    warn: 'yellow',
    info: 'blue',
    debug: 'green',
    trace: 'white'
  }
}

winston.addColors(level_information);

const logger = new winston.createLogger({
  level: log_level,
  levels: level_information.levels,
  transports: [
    new winston.transports.File({
      filename:  `${__dirname}` + constants.LOG.PATH ,
      handleExceptions: true
    }),
    new winston.transports.Console({
      format: simple,
      level: 'trace'
    })
  ],
  format: combine(
    timestamp(),
    json
  ),
  exitOnError: false
})

/*
// Extend logger object to properly log 'Error' types
const orig_log = logger.log

logger.log = (level, msg) => {
  if (msg instanceof Error) {
    const args = Array.prototype.slice.call(arguments)
    args[1] = msg.stack
    orig_log.apply(logger, args)
  }
  else {
    orig_log.apply(logger, arguments)
  }
}
*/

module.exports = logger
