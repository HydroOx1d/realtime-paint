import { makeAutoObservable } from 'mobx'

class ToolbarState {
  tool = null
  constructor() {
    makeAutoObservable(this)
  }

  setTool(tool) {
    this.tool = tool
  }
}

export default new ToolbarState