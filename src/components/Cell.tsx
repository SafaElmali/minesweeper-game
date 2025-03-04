import { Cell as CellType } from '@/types/game';
import { cn } from "@/lib/utils";
import { soundManager } from "@/utils/sound";
import { useEffect } from "react";

type CellProps = {
  cell: CellType;
  onClick: () => void;
  onContextMenu: (e: React.MouseEvent) => void;
};

const getCellColor = (neighborMines: number): string => {
  const colors = [
    'text-transparent',
    'text-blue-500',
    'text-green-500',
    'text-red-500',
    'text-purple-500',
    'text-yellow-500',
    'text-cyan-500',
    'text-black',
    'text-gray-500',
  ];
  return colors[neighborMines] || 'text-transparent';
};

const Cell = ({ cell, onClick, onContextMenu }: CellProps) => {
  const baseClasses = 'w-8 h-8 border border-input flex items-center justify-center text-lg font-bold cursor-pointer transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95';
  const stateClasses = {
    hidden: 'bg-muted hover:bg-muted/80',
    revealed: 'bg-background animate-reveal',
    flagged: 'bg-muted animate-flag',
  };

  useEffect(() => {
    if (cell.state === 'revealed' && cell.isMine) {
      soundManager.play('mine');
    }
  }, [cell.state, cell.isMine]);

  const handleClick = () => {
    soundManager.play('click');
    onClick();
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (cell.state === 'hidden' || cell.state === 'flagged') {
      soundManager.play('flag');
    }
    onContextMenu(e);
  };

  const getContent = () => {
    if (cell.state === 'flagged') return '🚩';
    if (cell.state === 'revealed') {
      if (cell.isMine) return '💣';
      return cell.neighborMines > 0 ? cell.neighborMines : '';
    }
    return '';
  };

  return (
    <button
      className={cn(
        baseClasses,
        stateClasses[cell.state],
        cell.state === 'revealed' && !cell.isMine && getCellColor(cell.neighborMines)
      )}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      aria-label={`Cell ${cell.state}${cell.isMine ? ' containing mine' : ''}`}
    >
      {getContent()}
    </button>
  );
};

export default Cell; 