export class StartMenu {
  constructor() {
    this.create()
  }

  create() {
    const startButton = document.createElement('button')
    startButton.innerText = 'START'
    startButton.style.width = '300px'
    startButton.style.height = '200px'

    document.body.append(startButton)
  }

  dispose() {}
}
