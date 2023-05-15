const winston = require('winston');
const winstonMongoDB = require('winston-mongodb');
const winstonDailyRotateFile = require('winston-daily-rotate-file');

const mongoURL = 'mongodb+srv://user:1121@cluster0.f7xdvnz.mongodb.net/';

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.DailyRotateFile({
            filename: 'logs/application-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxSize: '20m',
            maxFiles: '14d'
        }),
        new winstonMongoDB.MongoDB({
            db: mongoURL,
            options: { useUnifiedTopology: true },
            collection: 'logs',
            capped: true,
            cappedMax: 100,
            tryReconnect: true
        })
    ]
});

module.exports = logger;
