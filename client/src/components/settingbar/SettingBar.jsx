import toolbarState from '../../store/toolbarState'
import './SettingBar.css'

const SettingBar = () => {
  return (
    <div className='settingbar'>
      <span className='settingbar__name'>Толщина обводки</span>
      <input className='settingbar__line-width' type="number" defaultValue={1} onChange={(e) => toolbarState.setLineWidth(e.target.value)}/>

      <span className='settingbar__name'>Цвет обводки</span>
      <input type="color" onChange={e => toolbarState.setStrokeColor(e.target.value)}/>
    </div>
  )
}

export default SettingBar