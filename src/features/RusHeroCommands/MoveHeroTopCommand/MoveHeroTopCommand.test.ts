import { describe, test, vi, expect } from "vitest";
import { MoveHeroTopCommand } from "./MoveHeroTopCommand";
import type { IRusHeroState } from "@entities";

describe("Спецификация класса MoveHeroTopCommand", () => {
  test("Команда execut() выполняет метод moveTop() на состоянии героя", () => {
    const heroState = { moveTop: vi.fn() } as unknown as IRusHeroState;
    const moveTopCommand = new MoveHeroTopCommand(heroState);
    moveTopCommand.execute();

    expect(heroState.moveTop).toBeCalledTimes(1);
  });
});
