require('dotenv').config()
const express = require('express')
const session = require('express-session')

const messageCtrl = require("./messagesCtrl")

let { SERVER_PORT, SESSION_SECRET } = process.env

const app = express()

app.use(express.json())

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use((req, res, next) => {
    if (!req.session.history) {
        req.session.history = []
    }
})

app.get('/api/messages', messageCtrl.getAllMessages)
app.post('/api/messages', messageCtrl.createMessage)
app.get('/api/messages/history', (req, res) => res.send(req.session.history))

app.listen(SERVER_PORT, () => {
    console.log(`Server on port: ${SERVER_PORT}`)
})