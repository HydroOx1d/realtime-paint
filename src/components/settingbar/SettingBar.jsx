import './SettingBar.css'

const SettingBar = () => {
  return (
    <div className='settingbar'>
      <span className='settingbar__name'>Толщина линии</span>
      <input className='settingbar__line-width' type="number" />
    </div>
  )
}

export default SettingBar