const LOG = {
    LEVEL: process.env.LOG_LEVEL || 'warn',
    PATH: process.env.LOG_PATH || '/../../log/error.log'
}

const SPOTIFYCREDENTIALS = {
    CLIENTID: "6025871b27e94fa3a6fe1f100a021571",
    CLIENTSECRET: "6c4f02266daa449ba8719cf61a2d9b80"
}

const CONNECTIONS = {
    MYSQL: undefined
}

let ERROR = false;

module.exports = {
    LOG,
    CONNECTIONS,
    SPOTIFYCREDENTIALS,
    ERROR
}
