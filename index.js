
const shortId = require('shortid')
const app = require('express')()
const { connect, log } = require('./src')

function heartbeat() {
    return {
        state: 'RUNNING',
        time: Date.now(),
        memory: process.memoryUsage().rss,
        pid: process.pid
    }
}


connect(heartbeat).then(() => {

    app.get('/', (req, res) => {
        log({
            transactionId: shortId.generate(),
            timestamp: Date.now(),
            logLevel: 'INFO',
            msg: 'got a request. Uiiiiiiiiii'
        })
        res.send('Have a nice day :)')
    })

    app.listen(9004, () => {

        log({
            timestamp: Date.now(),
            logLevel: 'DEBUG',
            msg: 'Server started.'
        })
    })
})