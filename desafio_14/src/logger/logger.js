const log4 = require('log4js')

log4.configure({
    appenders: {
        consola: { type: 'console' },
        archivoErrores: { type: 'file', filename: 'logs/error.log' },
        archivoDebug: { type: 'file', filename: 'logs/debug.log' },

        loggerConsola: { type: 'logLevelFilter', appender: 'consola', level: 'info' },
        LoggerArchivoErrores: { type: 'logLevelFilter', appender: 'archivoErrores', level: 'error' },
        LoggerArchivoDebug: { type: 'logLevelFilter', appender: 'archivoDebug', level: 'debug' }
    },
    categories: {
        default: {
            appenders: ['loggerConsola'], level: 'all'
        },
        prod: {
            appenders: ['LoggerArchivoErrores', 'LoggerArchivoDebug'], level: 'all'
        }
    }
})

let logger = null
if (process.env.NODE_ENV === 'production') {
    logger = log4.getLogger('prod')
} else {
    logger = log4.getLogger()    
}
module.exports = logger