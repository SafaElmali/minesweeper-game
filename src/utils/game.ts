import { Cell, GameConfig } from '@/types/game';

export const createBoard = (config: GameConfig): Cell[][] => {
  const board: Cell[][] = [];
  
  // Initialize empty board
  for (let i = 0; i < config.rows; i++) {
    board[i] = [];
    for (let j = 0; j < config.cols; j++) {
      board[i][j] = {
        isMine: false,
        state: 'hidden',
        neighborMines: 0,
      };
    }
  }

  // Place mines randomly
  let minesPlaced = 0;
  while (minesPlaced < config.mines) {
    const row = Math.floor(Math.random() * config.rows);
    const col = Math.floor(Math.random() * config.cols);
    
    if (!board[row][col].isMine) {
      board[row][col].isMine = true;
      minesPlaced++;
    }
  }

  // Calculate neighbor mines
  for (let i = 0; i < config.rows; i++) {
    for (let j = 0; j < config.cols; j++) {
      if (!board[i][j].isMine) {
        board[i][j].neighborMines = countNeighborMines(board, i, j);
      }
    }
  }

  return board;
};

const countNeighborMines = (board: Cell[][], row: number, col: number): number => {
  let count = 0;
  
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      const newRow = row + i;
      const newCol = col + j;
      
      if (
        newRow >= 0 &&
        newRow < board.length &&
        newCol >= 0 &&
        newCol < board[0].length &&
        board[newRow][newCol].isMine
      ) {
        count++;
      }
    }
  }
  
  return count;
};

export const revealCell = (
  board: Cell[][],
  row: number,
  col: number
): { board: Cell[][]; gameOver: boolean } => {
  const newBoard = [...board.map(row => [...row])];
  
  if (newBoard[row][col].isMine) {
    return { board: newBoard, gameOver: true };
  }

  const reveal = (r: number, c: number) => {
    if (
      r < 0 ||
      r >= board.length ||
      c < 0 ||
      c >= board[0].length ||
      newBoard[r][c].state === 'revealed' ||
      newBoard[r][c].state === 'flagged'
    ) {
      return;
    }

    newBoard[r][c].state = 'revealed';

    if (newBoard[r][c].neighborMines === 0) {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          reveal(r + i, c + j);
        }
      }
    }
  };

  reveal(row, col);
  return { board: newBoard, gameOver: false };
};

export const toggleFlag = (board: Cell[][], row: number, col: number): Cell[][] => {
  const newBoard = [...board.map(row => [...row])];
  
  if (newBoard[row][col].state === 'hidden') {
    newBoard[row][col].state = 'flagged';
  } else if (newBoard[row][col].state === 'flagged') {
    newBoard[row][col].state = 'hidden';
  }
  
  return newBoard;
};

export const checkWin = (board: Cell[][]): boolean => {
  return board.every(row =>
    row.every(cell =>
      (cell.isMine && cell.state === 'flagged') ||
      (!cell.isMine && cell.state === 'revealed')
    )
  );
}; 