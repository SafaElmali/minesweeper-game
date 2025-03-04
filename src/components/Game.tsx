'use client';

import { useState, useEffect } from 'react';
import { Difficulty, GameState, DIFFICULTY_CONFIGS } from '@/types/game';
import { createBoard, revealCell, toggleFlag, checkWin } from '@/utils/game';
import Board from './Board';
import HowToPlay from './HowToPlay';
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { soundManager } from "@/utils/sound";
import { Volume2, VolumeX } from "lucide-react";

const Game = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>('beginner');
  const [board, setBoard] = useState(createBoard(DIFFICULTY_CONFIGS[difficulty]));
  const [gameState, setGameState] = useState<GameState>('playing');
  const [time, setTime] = useState(0);
  const [flagCount, setFlagCount] = useState(0);
  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === 'playing') {
      timer = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameState]);

  useEffect(() => {
    if (gameState === 'won') {
      soundManager.play('win');
    } else if (gameState === 'lost') {
      soundManager.play('lose');
    }
  }, [gameState]);

  const handleNewGame = () => {
    setBoard(createBoard(DIFFICULTY_CONFIGS[difficulty]));
    setGameState('playing');
    setTime(0);
    setFlagCount(0);
  };

  const handleCellClick = (row: number, col: number) => {
    if (gameState !== 'playing') return;

    const { board: newBoard, gameOver } = revealCell(board, row, col);
    setBoard(newBoard);

    if (gameOver) {
      setGameState('lost');
      // Reveal all mines
      const finalBoard = newBoard.map(row =>
        row.map(cell => ({
          ...cell,
          state: cell.isMine ? 'revealed' : cell.state,
        }))
      );
      setBoard(finalBoard);
    } else if (checkWin(newBoard)) {
      setGameState('won');
    }
  };

  const handleCellRightClick = (row: number, col: number) => {
    if (gameState !== 'playing') return;

    const newBoard = toggleFlag(board, row, col);
    setBoard(newBoard);

    // Update flag count
    const newFlagCount = newBoard.flat().filter(cell => cell.state === 'flagged').length;
    setFlagCount(newFlagCount);

    if (checkWin(newBoard)) {
      setGameState('won');
    }
  };

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
    handleNewGame();
  };

  const toggleMute = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="text-center">Minesweeper</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <div className="flex gap-4 items-center">
          <Select value={difficulty} onValueChange={handleDifficultyChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="expert">Expert</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleNewGame}>
            New Game
          </Button>
          <Button variant="outline" onClick={() => setIsHowToPlayOpen(true)}>
            How to Play
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMute}
            className="ml-2"
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>
        </div>

        <div className="flex gap-4 items-center">
          <Card className="px-4 py-2">
            <CardContent className="p-0">
              Mines: {DIFFICULTY_CONFIGS[difficulty].mines - flagCount}
            </CardContent>
          </Card>
          <Card className="px-4 py-2">
            <CardContent className="p-0">
              Time: {time}s
            </CardContent>
          </Card>
        </div>

        <Board
          board={board}
          onCellClick={handleCellClick}
          onCellRightClick={handleCellRightClick}
        />

        {gameState === 'won' && (
          <div className="text-2xl font-bold text-green-500 animate-bounce">
            Congratulations! You won! 🎉
          </div>
        )}
        {gameState === 'lost' && (
          <div className="text-2xl font-bold text-red-500 animate-shake">
            Game Over! 💥
          </div>
        )}

        <HowToPlay
          isOpen={isHowToPlayOpen}
          onClose={() => setIsHowToPlayOpen(false)}
        />
      </CardContent>
    </Card>
  );
};

export default Game; 