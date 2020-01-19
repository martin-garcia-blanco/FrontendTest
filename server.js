//server.js
const express = require('express')
const favicon = require('express-favicon')
const path = require('path')
const port = process.env.PORT || 9090
const app = express()
app.use(favicon(__dirname + '/favicon.ico'))
app.use(express.static(__dirname))
app.get('/ping', function (req, res) {
 return res.send('pong')
})
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
})
app.listen(port)