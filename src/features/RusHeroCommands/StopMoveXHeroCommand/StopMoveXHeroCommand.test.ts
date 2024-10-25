import { describe, test, vi, expect } from "vitest";
import { StopMoveXHeroCommand } from "./StopMoveXHeroCommand";
import type { IRusHeroState } from "@entities";

describe("Спецификация класса MoveHeroRightCommand", () => {
  test("Команда execut() выполняет метод moveRight() на состоянии героя", () => {
    const heroState = { stopMovingX: vi.fn() } as unknown as IRusHeroState;
    const moveTopCommand = new StopMoveXHeroCommand(heroState);
    moveTopCommand.execute();
    expect(heroState.stopMovingX).toBeCalledTimes(1);
  });
});
