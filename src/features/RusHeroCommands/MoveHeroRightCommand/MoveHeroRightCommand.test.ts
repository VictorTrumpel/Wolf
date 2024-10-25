import { describe, test, vi, expect } from "vitest";
import { MoveHeroRightCommand } from "./MoveHeroRightCommand";
import type { IRusHeroState } from "@entities";

describe("Спецификация класса MoveHeroRightCommand", () => {
  test("Команда execut() выполняет метод moveRight() на состоянии героя", () => {
    const heroState = { moveRight: vi.fn() } as unknown as IRusHeroState;
    const moveTopCommand = new MoveHeroRightCommand(heroState);
    moveTopCommand.execute();
    expect(heroState.moveRight).toBeCalledTimes(1);
  });
});
