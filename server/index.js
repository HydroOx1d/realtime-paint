const express = require('express')
const app = express()
const cors = require('cors')
const WSserver = require('express-ws')(app)
const aWss = WSserver.getWss()
const fs = require('fs')
const path = require('path')

app.use(cors())
app.use(express.json())

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

app.get('/images', (req, res) => {
  try {
    const file = fs.readFileSync(path.resolve(__dirname, 'files', `${req.query.id}.jpg`), 'base64')
    const data = 'data:image/png;base64,' + file.toString('base64')
    res.json({
      image: data
    })
  } catch(err) {
    return res.status(500).json({
      error: err
    })
  }
})

app.post('/images', (req, res) => {
  try {
    const data = req.body.image.replace('data:image/png;base64,', '')
    fs.writeFileSync(path.resolve(__dirname, 'files', `${req.query.id}.jpg`), data, 'base64')

    return res.status(200).json('success')
  } catch(err) {
    return res.status(500).json({
      error: err
    })
  }
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