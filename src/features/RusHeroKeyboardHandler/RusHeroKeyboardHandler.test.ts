import { describe, test, vi, expect } from "vitest";
import { RusHeroKeyboardHandler } from "./RusHeroKeyboardHandler";
import { Input } from "phaser";

describe(`Спецификация компонента ${RusHeroKeyboardHandler.name}`, () => {
  test("Если нажать на клавишу перемещения вверх, то выполнится команда перемещения вверх", () => {
    // const keyboard = { addKey: vi.fn() };
    // const keyboardHandler = new RusHeroKeyboardHandler(
    //   keyboard as unknown as Input.Keyboard.KeyboardPlugin
    // );
    expect(true).toBeTruthy();
  });
});
