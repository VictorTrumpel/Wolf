import { Events } from 'phaser'
import './StartMenu.css'

export class StartMenu {
  private startButton: HTMLButtonElement | null = null

  eventEmitter = new Events.EventEmitter()

  constructor() {
    this.create()
  }

  private create() {
    this.createStartButton()
  }

  private createStartButton() {
    this.startButton = document.createElement('button')
    this.startButton.classList.add('start-button-menu')
    this.startButton.innerText = 'START'

    this.startButton.onclick = () => {
      this.eventEmitter.emit('on-start-button-click')
    }

    document.body.append(this.startButton)
  }

  dispose() {
    this.startButton?.remove()
    this.startButton = null
  }
}
