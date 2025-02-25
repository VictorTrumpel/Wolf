import { Events } from 'phaser'
import './LooseMenu.css'

export class LooseMenu {
  private looseMenuContainer: HTMLDivElement | null = null

  eventEmitter = new Events.EventEmitter()

  constructor() {
    this.create()
  }

  private create() {
    const looseMenuContainer = document.createElement('div')
    looseMenuContainer.classList.add('loose-menu-container')

    const restartButton = document.createElement('button')
    restartButton.classList.add('restart-button-menu')
    restartButton.innerText = 'RESTART'

    const typographyH4 = document.createElement('h4')
    typographyH4.classList.add('loose-menu-title')
    typographyH4.innerText = 'Hero is DEAD!'

    looseMenuContainer.append(typographyH4)
    looseMenuContainer.append(restartButton)

    this.looseMenuContainer = looseMenuContainer

    document.body.append(this.looseMenuContainer)

    restartButton.onclick = () => {
      this.eventEmitter.emit('restart-button-menu_click')
    }
  }

  dispose() {
    this.looseMenuContainer?.remove()
    this.looseMenuContainer = null
  }
}
