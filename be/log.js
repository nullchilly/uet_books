const {
    createLogger,
    transports,
    format
} = require('winston');
require('winston-mongodb')

const logger = createLogger({
      transports: [
        // new transports.File({
        //     filename: 'info.log',
        //     level: 'info',
        //     format: format.combine(format.timestamp(), format.json())
        // }),
        new transports.MongoDB({
            level: 'info',
            db: process.env.MONGODB_URL,
            collection: 'log_info',
            format: format.combine(format.timestamp(), format.json())
        }),
        new transports.MongoDB({
            level: 'error',
            db: process.env.MONGODB_URL,
            collection: 'log_error',
            format: format.combine(format.timestamp(), format.json())
        })
      ]
})

module.exports = logger;