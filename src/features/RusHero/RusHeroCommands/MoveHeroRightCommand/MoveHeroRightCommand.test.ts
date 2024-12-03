import { describe, expect, test, vi } from 'vitest'
import type { IRusHeroState } from '@entities'
import { MoveHeroRightCommand } from './MoveHeroRightCommand'

describe('Спецификация класса MoveHeroRightCommand', () => {
  test('Команда execut() выполняет метод moveRight() на состоянии героя', () => {
    const heroState = { moveRight: vi.fn() } as unknown as IRusHeroState
    const moveTopCommand = new MoveHeroRightCommand(heroState)
    moveTopCommand.execute()
    expect(heroState.moveRight).toBeCalledTimes(1)
  })
})
