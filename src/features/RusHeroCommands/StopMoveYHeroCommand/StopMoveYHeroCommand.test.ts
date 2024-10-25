import { describe, test, expect, vi } from "vitest";
import { StopMoveYHeroCommand } from "./StopMoveYHeroCommand";
import type { IRusHeroState } from "@entities";

describe("Спецификация класса StopMoveYHeroCommand", () => {
  test("Команда execute() вызывает метод stopMovingY() на состоянии персонажа", () => {
    const heroState = { stopMovingY: vi.fn() } as unknown as IRusHeroState;
    const stopMoveYCommand = new StopMoveYHeroCommand(heroState);
    stopMoveYCommand.execute();

    expect(heroState.stopMovingY).toBeCalledTimes(1);
  });
});
