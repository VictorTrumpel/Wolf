import { describe, expect, test, vi } from 'vitest'
import type { IRusHeroState } from '@entities'
import { StopMoveHeroCommand } from './StopMoveHeroCommand'

describe('Спецификация компонента StopMoveHeroCommand', () => {
  test('Команда execute() вызывает метод stopMoving() на состоянии персонажа', () => {
    const heroState = { stopMoving: vi.fn() } as unknown as IRusHeroState
    const stopMoveYCommand = new StopMoveHeroCommand(heroState)
    stopMoveYCommand.execute()
    expect(heroState.stopMoving).toBeCalledTimes(1)
  })
})
