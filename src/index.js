const log = require('./log')
const stat = require('./stat')


function instantiateFireTools(heartbeatFunction) {

    return log.connect()
        .then(stat.connect)
        .then(() => {
            stat.heartbeat(heartbeatFunction)
        })

}

module.exports = {
    connect: instantiateFireTools,
    log: log.log
}