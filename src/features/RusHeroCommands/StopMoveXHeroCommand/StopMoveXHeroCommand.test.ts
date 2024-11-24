import { describe, expect, test, vi } from 'vitest'
import type { IRusHeroState } from '@entities'
import { StopMoveXHeroCommand } from './StopMoveXHeroCommand'

describe('Спецификация класса MoveHeroRightCommand', () => {
  test('Команда execut() выполняет метод moveRight() на состоянии героя', () => {
    const heroState = { stopMovingX: vi.fn() } as unknown as IRusHeroState
    const moveTopCommand = new StopMoveXHeroCommand(heroState)
    moveTopCommand.execute()
    expect(heroState.stopMovingX).toBeCalledTimes(1)
  })
})
