import { Cell as CellType } from '@/types/game';
import Cell from './Cell';

type BoardProps = {
  board: CellType[][];
  onCellClick: (row: number, col: number) => void;
  onCellRightClick: (row: number, col: number) => void;
};

const Board = ({ board, onCellClick, onCellRightClick }: BoardProps) => {
  return (
    <div className="inline-block p-4 bg-gray-200 rounded-lg">
      <div className="grid gap-0" style={{ gridTemplateColumns: `repeat(${board[0].length}, minmax(0, 1fr))` }}>
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              cell={cell}
              onClick={() => onCellClick(rowIndex, colIndex)}
              onContextMenu={(e) => {
                e.preventDefault();
                onCellRightClick(rowIndex, colIndex);
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Board; 