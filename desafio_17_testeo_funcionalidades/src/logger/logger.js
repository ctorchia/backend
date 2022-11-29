const log4 = require('log4js')

log4.configure({
    appenders: {
        consola: { type: 'console' },
        archivoErrores: { type: 'file', filename: './src/logger/logs/error.log' },
        archivoWarning: { type: 'file', filename: './src/logger/logs/warn.log' },
        // archivoDebug: { type: 'file', filename: 'logs/debug.log' },

        loggerConsola: { type: 'logLevelFilter', appender: 'consola', level: 'info' },
        LoggerArchivoErrores: { type: 'logLevelFilter', appender: 'archivoErrores', level: 'error' },
        LoggerArchivoWarning: { type: 'logLevelFilter', appender: 'archivoWarning', level: 'warn' }
        // LoggerArchivoDebug: { type: 'logLevelFilter', appender: 'archivoDebug', level: 'debug' }
    },
    categories: {
        default: {
            appenders: ['loggerConsola'], level: 'all'
        },
        prod: {
            // appenders: ['LoggerArchivoErrores', 'LoggerArchivoDebug'], level: 'all'
            appenders: ['loggerConsola','LoggerArchivoErrores', 'LoggerArchivoWarning'], level: 'all'
        }
    }
})

logger = log4.getLogger('prod')

// let logger = null
// if (process.env.NODE_ENV === 'production') {
//     logger = log4.getLogger('prod')
// } else {
//     logger = log4.getLogger()    
// }
module.exports = logger