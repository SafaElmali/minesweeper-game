export type Difficulty = 'beginner' | 'intermediate' | 'expert';

export type CellState = 'hidden' | 'revealed' | 'flagged';

export type Cell = {
  isMine: boolean;
  state: CellState;
  neighborMines: number;
};

export type GameState = 'playing' | 'won' | 'lost';

export type GameConfig = {
  rows: number;
  cols: number;
  mines: number;
};

export const DIFFICULTY_CONFIGS: Record<Difficulty, GameConfig> = {
  beginner: { rows: 9, cols: 9, mines: 10 },
  intermediate: { rows: 16, cols: 16, mines: 40 },
  expert: { rows: 16, cols: 30, mines: 99 },
}; 