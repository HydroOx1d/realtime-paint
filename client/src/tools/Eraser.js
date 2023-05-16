import Tool from './Tool'

export default class Eraser extends Tool {
  constructor(canvas, socket, id) {
    super(canvas, socket, id)
    this.listen()
  }

  listen() {
    this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    this.canvas.onmousedown = this.mouseDownHandler.bind(this)
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
  }

  mouseUpHandler() {
    this.mouseDown = false
  }

  mouseDownHandler(e) {
    this.mouseDown = true
    this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
  }

  mouseMoveHandler(e) {
    if(this.mouseDown) {
      // this.clear(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop, 10, 10)
      this.socket.send(JSON.stringify({
        method: 'draw',
        id: this.sessionid,
        figure: {
          type: 'eraser',
          x: e.pageX - e.target.offsetLeft,
          y: e.pageY - e.target.offsetTop,
          eraserWidth: 10,
          eraserHeight: 10
        }
      }))
    }
  }

  static clear(ctx, x, y, w, h) {
    ctx.clearRect(x - (w / 2), y - (h / 2), w, h)
  }
}