"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

type HowToPlayProps = {
  isOpen: boolean;
  onClose: () => void;
};

const HowToPlay = ({ isOpen, onClose }: HowToPlayProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[85vh] p-6">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-2xl">🎮 How to Play Minesweeper</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[calc(85vh-8rem)] pr-4">
          <div className="space-y-8 text-gray-600">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2 text-lg">
                <span>🎯</span> Objective
              </h3>
              <p className="leading-relaxed">
                Find all the mines (💣) without clicking on them. Use the numbers to
                determine where the mines are located. Flag (🚩) all mines to win!
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2 text-lg">
                <span>🎮</span> Game Controls
              </h3>
              <ul className="list-disc list-inside space-y-2 leading-relaxed">
                <li>🖱️ Left-click to reveal a cell</li>
                <li>🖱️ Right-click to place/remove a flag (🚩)</li>
                <li>🔢 Numbers show how many mines are adjacent to a cell</li>
                <li>⚡ Double-click a revealed number to reveal adjacent cells</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2 text-lg">
                <span>📊</span> Understanding Numbers
              </h3>
              <div className="space-y-3">
                <p className="leading-relaxed">When you reveal a cell, you'll see a number (1-8):</p>
                <ul className="list-disc list-inside space-y-2 leading-relaxed">
                  <li>1️⃣ = 1 mine in adjacent cells</li>
                  <li>2️⃣ = 2 mines in adjacent cells</li>
                  <li>3️⃣ = 3 mines in adjacent cells</li>
                  <li>And so on...</li>
                </ul>
                <p className="text-sm italic mt-3 bg-muted/50 p-3 rounded-md">
                  Example: If you see a "1" and 7 adjacent cells are safe, the remaining cell must be a mine!
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2 text-lg">
                <span>🎲</span> Difficulty Levels
              </h3>
              <ul className="list-disc list-inside space-y-2 leading-relaxed">
                <li>🌱 Beginner: 9x9 grid with 10 mines</li>
                <li>⭐ Intermediate: 16x16 grid with 40 mines</li>
                <li>🔥 Expert: 16x30 grid with 99 mines</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2 text-lg">
                <span>💡</span> Pro Tips
              </h3>
              <ul className="list-disc list-inside space-y-2 leading-relaxed">
                <li>🎯 Start from corners or edges (fewer adjacent cells to consider)</li>
                <li>🚩 Use flags to mark cells you're certain contain mines</li>
                <li>🔍 Look for patterns in numbers to identify mines</li>
                <li>⚡ Empty cells (no numbers) are completely safe</li>
                <li>🎯 If you see a "1" next to a "2", the "2" must have one additional mine</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2 text-lg">
                <span>🏆</span> Win/Lose Conditions
              </h3>
              <ul className="list-disc list-inside space-y-2 leading-relaxed">
                <li>🎉 Win: Reveal all non-mine cells</li>
                <li>💥 Lose: Click on a mine</li>
                <li>⏱️ Timer tracks how long you've been playing</li>
                <li>💣 Mine counter shows remaining mines to flag</li>
              </ul>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default HowToPlay;
