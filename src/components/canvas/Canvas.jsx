import React from 'react'
import { observer } from 'mobx-react-lite'
import './Canvas.css'
import canvasState from '../../store/canvasState'

const Canvas = observer(() => {
  const canvasRef = React.useRef();

  React.useEffect(() => {
    canvasState.setCanvas(canvasRef.current)
  }, [])

  return (
    <div className='canvas'>
      <canvas ref={canvasRef} width={600} height={400}/>
    </div>
  )
})

export default Canvas