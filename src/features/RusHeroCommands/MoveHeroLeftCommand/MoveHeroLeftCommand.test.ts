import { describe, test, vi, expect } from "vitest";
import { MoveHeroLeftCommand } from "./MoveHeroLeftCommand";
import type { IRusHeroState } from "@entities";

describe("Спецификация класса MoveHeroLeftCommand", () => {
  test("Команда execut() выполняет метод moveLeft() на состоянии героя", () => {
    const heroState = { moveLeft: vi.fn() } as unknown as IRusHeroState;
    const moveTopCommand = new MoveHeroLeftCommand(heroState);
    moveTopCommand.execute();
    expect(heroState.moveLeft).toBeCalledTimes(1);
  });
});
