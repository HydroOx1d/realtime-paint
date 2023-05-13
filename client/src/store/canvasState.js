import { makeAutoObservable } from 'mobx'

class CanvasState {
  canvas = null
  undoList = []
  redoList = []
  userName = ''
  socket = null
  sessionid = null

  constructor() {
    makeAutoObservable(this)
  }

  setSessionId(id) {
    this.sessionid = id
  }

  setSocket(socket) {
    this.socket = socket
  }

  setUsername(username) {
    this.userName = username
  }

  setCanvas(canvas) {
    this.canvas = canvas
  }

  addToUndo(snapshot) {
    this.undoList.push(snapshot)
  }

  addToRedo(snapshot) {
    this.redoList.push(snapshot)
  }

  undo() {
    const ctx = this.canvas.getContext('2d')

    if(this.undoList.length) {
      const data = this.undoList.pop()
      this.addToRedo(this.canvas.toDataURL())
      const img = new Image()
      img.src = data
      img.onload = () => {
        ctx.clearRect(0, 0,this.canvas.width, this.canvas.height)
        ctx.drawImage(img, 0,0, this.canvas.width, this.canvas.height)
      }
    } else {
      ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
    }
  }

  redo() {
    const ctx = this.canvas.getContext('2d')

    if(this.redoList.length) {
      const data = this.redoList.pop()
      this.addToUndo(this.canvas.toDataURL())
      const img = new Image()
      img.src = data
      img.onload = () => {
        ctx.clearRect(0, 0,this.canvas.width, this.canvas.height)
        ctx.drawImage(img, 0,0, this.canvas.width, this.canvas.height)
      }
    }
  }
}

export default new CanvasState