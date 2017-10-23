const net = require('net')

let connected = false
let socket

function fireStatConnect() {

    return new Promise((resolve, reject) => {
        socket = net.createConnection({ path: '.fire_stat.sock'}, () => {
            connected = true
            resolve()
        })


        socket.on('error', err => {
            connected = false
            reject(err)
        })

    })
    .catch(err => {
        console.error(`Unable to establish fire stat connection: ${err.message}`)
    })
}

function fireStat(msg) {

    const data = typeof msg !== 'string' ? JSON.stringify(msg) : msg

    connected
        ? socket.write(data)
        : console.log(`LOCAL: ${data}`)
}

function fireStatHeartbeat(statGenerator) {

    function sendHeartbeat() {

        const data = JSON.stringify(statGenerator())

        connected
            ? socket.write(data)
            : console.log(`LOCAL: ${data}`)
    }

    sendHeartbeat()
    setInterval(sendHeartbeat, 10000)

}

module.exports = {
    connect: fireStatConnect,
    heartbeat: fireStatHeartbeat
}