import './App.css';
import Canvas from './components/canvas/Canvas';
import SettingBar from './components/settingbar/SettingBar';
import ToolBar from './components/toolbar/ToolBar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path="/:id" element={
            <>
              <ToolBar/>
              <SettingBar/>
              <Canvas/>
            </>
          }/>
          <Route path="/" element={<Navigate to={`/f${Date.now().toString(16)}`}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
