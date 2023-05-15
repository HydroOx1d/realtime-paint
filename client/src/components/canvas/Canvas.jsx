import React from 'react'
import { observer } from 'mobx-react-lite'
import './Canvas.css'
import canvasState from '@/store/canvasState'
import { Modal, Button, } from "react-bootstrap"
import { useParams } from 'react-router-dom'
import Brush from '@/tools/Brush'
import toolbarState from '@/store/toolbarState'
import Rect from '@/tools/Rect'
import axios from 'axios'
import Circle from '../../tools/Circle'

const Canvas = observer(() => {
  const canvasRef = React.useRef();
  const inputRef = React.useRef()
  const [modal, setModal] = React.useState(true)
  const { id } = useParams()

  React.useEffect(() => {
    canvasState.setCanvas(canvasRef.current)
    axios.get(`http://localhost:3001/images?id=${id}`).then(res => {
      const ctx = canvasRef.current.getContext('2d')
      const img = new Image()
      img.src = res.data.image
      img.onload = () => {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
        ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height)
      }
    })
  }, [])

  React.useEffect(() => {
    if(canvasState.userName) {
      const socket = new WebSocket('ws://localhost:3001')
      canvasState.setSocket(socket)
      canvasState.setSessionId(id)
      toolbarState.setTool(new Brush(canvasState.canvas, socket, id))

      socket.onopen = () => {
        socket.send(JSON.stringify({
          id,
          method: 'connection',
          name: canvasState.userName
        }))
      }

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data)
        switch(data.method) {
          case 'connection': {
            alert(`Пользователь: ${data.name} подключился`)
            break;
          }

          case 'draw': {
            drawHandler(data)
            break;
          }
        }
      }
    }
  }, [canvasState.userName])

  const handleMousedown = () => {
    canvasState.addToUndo(canvasRef.current.toDataURL())
    axios.post(`http://localhost:3001/images?id=${id}`, {image: canvasRef.current.toDataURL()})
          .then((res) => console.log(res.data))
          .catch(err => console.log(err))
  }

  const handleUsername = () => {
    canvasState.setUsername(inputRef.current.value)
    setModal(prev => !prev)
  }

  const drawHandler = (data) => {
    const ctx = canvasRef.current.getContext('2d')
    switch(data.figure.type) {
      case "brush": {
        Brush.draw(ctx, data.figure.x, data.figure.y)
        break;
      }

      case "rect": {
        Rect.staticDraw(ctx, data.figure.x, data.figure.y, data.figure.width, data.figure.height, data.figure.color)
        break;
      }

      case "circle": {
        Circle.staticDraw(ctx, data.figure.x, data.figure.y, data.figure.radius, data.figure.color)
        break;
      }

      case "finish": {
        ctx.beginPath()
        break;
      }
    }
  }

  return (
    <div className='canvas'>
      <Modal show={modal}>
        <Modal.Header closeButton onHide={() => setModal(prev => !prev)}>
          <Modal.Title>Добро пожаловать!</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <input ref={inputRef} className='w-100 ps-2' placeholder='Введите имя'/>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleUsername()}>Готово</Button>
        </Modal.Footer>
      </Modal>
      <canvas onMouseDown={() => handleMousedown()} ref={canvasRef} width={600} height={400}/>
    </div>
  )
})

export default Canvas