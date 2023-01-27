import { TestBed } from '@angular/core/testing';

import { GameBoardGuard } from './game-board.guard';

describe('GameBoardGuard', () => {
  let guard: GameBoardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GameBoardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
