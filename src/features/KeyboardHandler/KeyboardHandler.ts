import { Input } from "phaser";
import { ICommand } from "@entities";

type KeyState = "isUp" | "isDown";

export class KeyboardHandler {
  private keyComboMap = new Map<
    { key: Input.Keyboard.Key; keyState: KeyState }[],
    ICommand
  >();

  constructor(private keyboard: Input.Keyboard.KeyboardPlugin) {}

  bind(keyCombo: { keyCode: number; keyState: KeyState }[], command: ICommand) {
    const comboKey = keyCombo.map(({ keyCode, keyState }) => {
      const key = this.keyboard.addKey(keyCode);
      return { key, keyState };
    });

    this.keyComboMap.set(comboKey, command);
  }

  processKeyCombinations() {
    for (const [keyCombo, command] of this.keyComboMap) {
      let needToExecute = true;

      for (const { key, keyState } of keyCombo) {
        if (!key[keyState]) {
          needToExecute = false;
          break;
        }
      }

      if (!needToExecute) continue;

      command.execute();
    }
  }
}
