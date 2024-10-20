import { Input } from "phaser";

export class KeyBoardEvents {
  eventMap = new Map<string, (e: KeyboardEvent) => void>();

  constructor(input: Input.InputPlugin) {
    if (!input.keyboard) return;

    const keyboard = input.keyboard;

    keyboard.createCursorKeys();

    const key = keyboard.addKey(Input.Keyboard.KeyCodes.W);

    key.on

    keyboard.on("keydown", (e: KeyboardEvent) => {
      const cb = this.eventMap.get("keydown");
      if (cb) cb(e);
    });

    keyboard.on("keyup", (e: KeyboardEvent) => {
      const cb = this.eventMap.get("keyup");
      if (cb) cb(e);
    });
  }

  on(event: string, cb: (e: KeyboardEvent) => void) {
    this.eventMap.set(event, cb);
  }
}
