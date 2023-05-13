const express = require('express')
const app = express()
const WSserver = require('express-ws')(app)
const aWss = WSserver.getWss()

app.ws('/', (ws, req) => {
  ws.on('message', (data) => {
    data = JSON.parse(data)
    
    switch(data.method) {
      case "connection": {
        connectionHandler(ws, data)
        break;
      }
      case "draw": {
        broadcastConnection(ws, data)
        break;
      }
    }
  })
})

app.listen(3001, () => {
  console.log('ok')
})

function connectionHandler(ws, data) {
  ws.id = data.id
  broadcastConnection(ws, data)
}

function broadcastConnection(ws, data) {
  aWss.clients.forEach(client => {
    if(client.id === data.id) {
      client.send(JSON.stringify(data))
    }
  })
}