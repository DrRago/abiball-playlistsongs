const LOG = {
    LEVEL: process.env.LOG_LEVEL || 'warn',
    PATH: process.env.LOG_PATH || '/../../log/error.log'
}

const CONNECTIONS = {
    MYSQL: undefined
}

module.exports = {
    LOG,
    CONNECTIONS,
}
