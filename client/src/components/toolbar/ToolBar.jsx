import './ToolBar.css'
import brush from '@/assets/img/brush.svg'
import circle from '@/assets/img/circle.svg'
import eraser from '@/assets/img/eraser.svg'
import line from '@/assets/img/line.svg'
import rect from '@/assets/img/rect.svg'
import undo from '@/assets/img/undo.svg'
import redo from '@/assets/img/redo.svg'
import save from '@/assets/img/save.svg'
import toolbarState from '@/store/toolbarState'
import Brush from '@/tools/Brush'
import canvasState from '@/store/canvasState'
import Rect from '@/tools/Rect'
import Circle from '@/tools/Circle'
import Line from '../../tools/Line'
import Eraser from '../../tools/Eraser'

const ToolBar = () => {
  const changeColor = (color) => {
    toolbarState.setStrokeColor(color)
    toolbarState.setFillColor(color)
  }

  return (
    <div className='toolbar'>
      <button className='toolbar__btn brush' onClick={() => toolbarState.setTool(new Brush(canvasState.canvas, canvasState.socket, canvasState.sessionid))}>
        <img src={brush} alt="brush" />
      </button>
      <button className='toolbar__btn rect' onClick={() => toolbarState.setTool(new Rect(canvasState.canvas, canvasState.socket, canvasState.sessionid))}>
        <img src={rect} alt="rect" />
      </button>
      <button className='toolbar__btn circle' onClick={() => toolbarState.setTool(new Circle(canvasState.canvas))}>
        <img src={circle} alt="circle" />
      </button>
      <button className='toolbar__btn eraser' onClick={() => toolbarState.setTool(new Eraser(canvasState.canvas))}>
        <img src={eraser} alt="eraser" />
      </button>
      <button className='toolbar__btn line' onClick={() => toolbarState.setTool(new Line(canvasState.canvas))}>
        <img src={line} alt="line" />
      </button>
      <input type="color" style={{marginLeft: 15}} onChange={e => changeColor(e.target.value)}/>
      <button className='toolbar__btn undo' onClick={() => canvasState.undo()}>
        <img src={undo} alt="undo" />
      </button>
      <button className='toolbar__btn redo' onClick={() => canvasState.redo()}>
        <img src={redo} alt="redo" />
      </button>
      <button className='toolbar__btn save'>
        <img src={save} alt="save" />
      </button>
    </div>
  )
}

export default ToolBar