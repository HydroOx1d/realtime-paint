import './App.css';
import Canvas from './components/canvas/Canvas';
import SettingBar from './components/settingbar/SettingBar';
import ToolBar from './components/toolbar/ToolBar';

function App() {
  return (
    <div className='app'>
      <ToolBar/>
      <SettingBar/>
      <Canvas/>
    </div>
  )
}

export default App
