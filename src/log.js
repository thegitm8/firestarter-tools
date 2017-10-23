const net = require('net')

let connected = false
let socket

function fireLoggerConnect() {

    return new Promise((resolve, reject) => {
        socket = net.createConnection({ path: '.fire_log.sock'}, () => {
            connected = true
            resolve()
        })


        socket.on('error', err => {
            connected = false
            reject(err)
        })

    })
    .catch(err => {
        console.error(`Unable to establish fire log connection: ${err.message}`)
    })

}

function fireLoggerLog(msg) {

    const data = typeof msg !== 'string' ? JSON.stringify(msg) : msg

    connected
        ? socket.write(data)
        : console.log(`LOCAL: ${data}`)
}
module.exports = {
    connect: fireLoggerConnect,
    log: fireLoggerLog
}