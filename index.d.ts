declare module '*.png' {
  const value: string
  export default value
}

declare module '*.PNG' {
  const value: string
  export default value
}

declare namespace Phaser.Physics.Arcade {
  interface Sprite {
    userInfo: Map<string, any> | null
  }
}
