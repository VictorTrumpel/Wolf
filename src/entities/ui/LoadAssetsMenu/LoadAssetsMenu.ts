import './LoadAssetsMenu.css'

export class LoadAssetsMenu {
  private loadInfoContainer: HTMLDivElement | null = null
  private loadBarContainerDOM: HTMLDivElement | null = null
  private loadBarFillDOM: HTMLDivElement | null = null

  constructor() {
    this.create()
  }

  private create() {
    const loadInfoContainer = document.createElement('div')
    loadInfoContainer.classList.add('load-info-container')
    this.loadInfoContainer = loadInfoContainer

    const loadBarContainer = document.createElement('div')
    loadBarContainer.classList.add('load-bar-container')
    this.loadBarContainerDOM = loadBarContainer

    const loadBarFill = document.createElement('div')
    loadBarFill.classList.add('loadb-bar-fill')
    this.loadBarFillDOM = loadBarFill

    loadBarContainer.append(loadBarFill)
    loadInfoContainer.append(loadBarContainer)

    const h3 = document.createElement('h3')
    h3.classList.add('load-info-title')
    h3.innerText = 'LOADING...'

    loadInfoContainer.append(h3)

    document.body.append(loadInfoContainer)
  }

  setPercent(value: number) {
    if (!this.loadBarFillDOM || !this.loadBarContainerDOM) return

    const width = this.loadBarContainerDOM.clientWidth * (value / 100)
    this.loadBarFillDOM.style.width = `${width}px`
  }

  dispose() {
    this.loadInfoContainer?.remove()
    this.loadInfoContainer = null

    this.loadBarContainerDOM = null
    this.loadBarFillDOM = null
  }
}
