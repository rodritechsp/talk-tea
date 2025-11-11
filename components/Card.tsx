import React, { useState, useCallback } from 'react';
import { textToSpeech } from '../services/speechService';
import { PlayCircleIcon } from './Icons';
import type { CardData } from '../types';

interface CardProps {
  data: CardData;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent<HTMLDivElement>) => void;
  isAlphabetCard?: boolean;
}

export const Card: React.FC<CardProps> = ({ data, draggable = false, onDragStart, isAlphabetCard = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlaySound = useCallback(async () => {
    if (isPlaying) return;
    setIsPlaying(true);
    try {
      await textToSpeech(data.text);
    } catch (error) {
      console.error("Failed to play sound:", error);
    } finally {
      setIsPlaying(false);
    }
  }, [data.text, isPlaying]);

  if (isAlphabetCard) {
    return (
      <div
        className="p-1 text-center cursor-pointer transform hover:-translate-y-1 transition-transform duration-200 group"
        onClick={handlePlaySound}
        draggable={draggable}
        onDragStart={onDragStart}
        aria-label={data.text}
      >
        <div className="bg-white w-full aspect-square flex items-center justify-center border-2 border-dashed border-purple-400 rounded-3xl">
          <span
            className="text-6xl md:text-7xl font-black select-none"
            style={{
              color: '#d1d5db', // gray-300
              textShadow: '1px 1px 0 #f59e0b, 2px 2px 0 #f59e0b, 3px 3px 0 #d97706, 4px 4px 0 #d97706' // amber-500, amber-600
            }}
          >
            {data.displayText}
          </span>
        </div>
        <p className="mt-2 font-bold text-purple-700 text-base md:text-lg select-none">{data.displayText}</p>
      </div>
    );
  }

  return (
    <div
      className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col items-center p-3 text-center cursor-pointer transform hover:-translate-y-1 transition-transform duration-200 group"
      onClick={handlePlaySound}
      draggable={draggable}
      onDragStart={onDragStart}
    >
      <div className="relative w-full aspect-square flex items-center justify-center">
        {data.bgColorClass ? (
          <div className={`w-full h-full rounded-xl ${data.bgColorClass}`}></div>
        ) : data.emoji ? (
          <span className="text-7xl md:text-8xl">{data.emoji}</span>
        ) : data.image ? (
          <img
            src={data.image}
            alt={data.text}
            className="w-full h-full object-cover rounded-xl pointer-events-none"
          />
        ) : null}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-200 flex items-center justify-center rounded-xl">
          <PlayCircleIcon className={`w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${isPlaying ? 'animate-pulse' : ''}`} />
        </div>
      </div>
      <p className="mt-3 font-semibold text-gray-700 text-sm md:text-base">{data.displayText || data.text}</p>
    </div>
  );
};