import log4js from 'log4js'

log4js.configure({
    appenders: {
        out: { type: 'console' }, // 控制台输出
    },
    categories: {
    // appenders:采用的appender,取appenders项,level:设置级别

        default: { appenders: ['out'], level: 'debug' },

        err: { appenders: ['out'], level: 'error' },

        info: { appenders: ['out'], level: 'info' },

        fatal: { appenders: ['out'], level: 'fatal' },
    },
})

// debug日志
const debugLog = log4js.getLogger('debug')
// info日志
const infoLog = log4js.getLogger('info')
// err日志
const errorLog = log4js.getLogger('err')
// fatal日志
const fatalLog = log4js.getLogger('fatal')

export { debugLog, infoLog, errorLog, fatalLog }
