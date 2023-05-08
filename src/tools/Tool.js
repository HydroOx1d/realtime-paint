export default class Tool {
  constructor(canvas) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.destroyEvents()
  }

  set lineWidth(width) {
    this.ctx.lineWidth = width;
  }

  set fillColor(color) {
    this.ctx.fillStyle = color; 
  }

  set strokeColor(color) {
    this.ctx.strokeStyle = color;
  }

  destroyEvents() {
    this.canvas.onmouseup = null
    this.canvas.onmousedown = null
    this.canvas.onmousemove = null
  }
}