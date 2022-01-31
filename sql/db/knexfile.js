global.Promise = require('bluebird');
// knexfile.js

module.exports = {
    development: {
        client: 'mysql',
        connection: { //process.env.DATABASE_URL ||
            host: process.env.SQL_DATABASE_HOST,
            port: process.env.SQL_PORT,
            database: process.env.SQL_DATABASE,
            user: process.env.SQL_USER,
            password: process.env.SQL_PASSWORD,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: './migrations',
            tableName: 'migrations',
        },
        seeds: {
            directory: './seeds',
        },
    },

    staging: {
        client: 'mysql',
        connection: { //process.env.DATABASE_URL ||
            host: process.env.SQL_DATABASE_HOST,
            port: process.env.SQL_PORT,
            database: process.env.SQL_DATABASE,
            user: process.env.SQL_USER,
            password: process.env.SQL_PASSWORD,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: './migrations',
            tableName: 'migrations',
        },
        seeds: {
            directory: './seeds',
        },
    },

    production: {
        client: 'mysql',
        connection: { //process.env.DATABASE_URL ||
            host: process.env.SQL_DATABASE_HOST,
            port: process.env.SQL_PORT,
            database: process.env.SQL_DATABASE,
            user: process.env.SQL_USER,
            password: process.env.SQL_PASSWORD,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: './migrations',
            tableName: 'migrations',
        },
        seeds: {
            directory: './seeds',
        },
    },

    test: {
        client: 'mysql',
        connection: {
            host: process.env.DATABASE_HOST,
            port: process.env.DATABASE_PORT,
            database: process.env.DATABASE_NAME,
            user: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
        },
        pool: {
            min: 2,
            max: 10,
        },
    },
};