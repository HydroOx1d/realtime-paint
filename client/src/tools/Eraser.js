import Tool from './Tool'

export default class Eraser extends Tool {
  constructor(canvas) {
    super(canvas)
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
      this.clear(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop, 10, 10)
    }
  }

  clear(x, y, w, h) {
    this.ctx.clearRect(x - (w / 2), y - (h / 2), w, h)
  }
}