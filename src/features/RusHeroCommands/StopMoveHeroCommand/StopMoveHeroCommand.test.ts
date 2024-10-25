import { describe, test, vi, expect } from "vitest";
import { StopMoveHeroCommand } from "./StopMoveHeroCommand";
import type { IRusHeroState } from "@entities";

describe("Спецификация компонента StopMoveHeroCommand", () => {
  test("Команда execute() вызывает метод stopMoving() на состоянии персонажа", () => {
    const heroState = { stopMoving: vi.fn() } as unknown as IRusHeroState;
    const stopMoveYCommand = new StopMoveHeroCommand(heroState);
    stopMoveYCommand.execute();
    expect(heroState.stopMoving).toBeCalledTimes(1);
  });
});
