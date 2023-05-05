import './ToolBar.css'
import brush from '@/assets/img/brush.svg'
import circle from '@/assets/img/circle.svg'
import eraser from '@/assets/img/eraser.svg'
import line from '@/assets/img/line.svg'
import rect from '@/assets/img/rect.svg'
import undo from '@/assets/img/undo.svg'
import redo from '@/assets/img/redo.svg'
import save from '@/assets/img/save.svg'
import toolbarState from '../../store/toolbarState'
import Brush from '../../tools/Brush'
import canvasState from '../../store/canvasState'

const ToolBar = () => {
  return (
    <div className='toolbar'>
      <button className='toolbar__btn brush' onClick={() => toolbarState.setTool(new Brush(canvasState.canvas))}>
        <img src={brush} alt="brush" />
      </button>
      <button className='toolbar__btn brush'>
        <img src={rect} alt="rect" />
      </button>
      <button className='toolbar__btn brush'>
        <img src={circle} alt="circle" />
      </button>
      <button className='toolbar__btn brush'>
        <img src={eraser} alt="eraser" />
      </button>
      <button className='toolbar__btn brush'>
        <img src={line} alt="line" />
      </button>
      <input type="color" style={{marginLeft: 15}}/>
      <button className='toolbar__btn brush'>
        <img src={undo} alt="undo" />
      </button>
      <button className='toolbar__btn brush'>
        <img src={redo} alt="redo" />
      </button>
      <button className='toolbar__btn brush'>
        <img src={save} alt="save" />
      </button>
    </div>
  )
}

export default ToolBar