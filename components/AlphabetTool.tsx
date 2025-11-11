import React, { useState, useCallback } from 'react';
import { textToSpeech } from '../services/speechService';
import type { Category } from '../types';
import { Card } from './Card';
import { PlayCircleIcon, BackspaceIcon, TrashIcon } from './Icons';

interface AlphabetToolProps {
  category: Category;
}

export const AlphabetTool: React.FC<AlphabetToolProps> = ({ category }) => {
  const [phrase, setPhrase] = useState<string[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const letter = e.dataTransfer.getData('text/plain');
    if (letter && /^[A-Z]$/.test(letter)) {
      setPhrase((prev) => [...prev, letter]);
    }
  }, []);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const createDragStartHandler = (letter: string) => (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text/plain', letter);
  };
  
  const handlePlayPhrase = useCallback(async () => {
    if (isSpeaking || phrase.length === 0) return;
    const textToSay = phrase.join('');
    setIsSpeaking(true);
    try {
      await textToSpeech(textToSay);
    } catch (error) {
      console.error("Failed to speak phrase:", error);
    } finally {
      setIsSpeaking(false);
    }
  }, [phrase, isSpeaking]);
  
  const handleBackspace = () => {
    setPhrase((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    setPhrase([]);
  };

  return (
    <div className="flex flex-col h-full gap-4 md:gap-6">
      {/* Drop Zone */}
      <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col">
        <div 
          onDrop={handleDrop} 
          onDragOver={handleDragOver}
          className="bg-sky-50 border-2 border-dashed border-sky-300 rounded-xl min-h-[8rem] w-full flex flex-wrap items-center p-3 gap-2"
          aria-live="polite"
          aria-label={`Frase formada: ${phrase.join('')}`}
        >
          {phrase.length === 0 ? (
             <span className="text-gray-400 text-center w-full">Arraste as letras aqui para formar palavras</span>
          ) : (
            phrase.map((letter, index) => (
              <span key={index} className="bg-green-200 text-green-800 font-bold text-2xl p-2 rounded-md shadow-sm animate-pop-in">
                {letter}
              </span>
            ))
          )}
        </div>
        <div className="flex items-center justify-end gap-2 mt-4">
            <button onClick={handleBackspace} className="p-3 rounded-full bg-yellow-400 text-yellow-800 hover:bg-yellow-500 transition-colors disabled:opacity-50 active:bg-yellow-600" aria-label="Apagar última letra" disabled={phrase.length === 0}>
                <BackspaceIcon className="w-6 h-6"/>
            </button>
            <button onClick={handleClear} className="p-3 rounded-full bg-red-400 text-red-800 hover:bg-red-500 transition-colors disabled:opacity-50 active:bg-red-600" aria-label="Limpar tudo" disabled={phrase.length === 0}>
                <TrashIcon className="w-6 h-6"/>
            </button>
            <button onClick={handlePlayPhrase} className="p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors disabled:opacity-50 active:bg-blue-700" aria-label="Ouvir a frase" disabled={phrase.length === 0 || isSpeaking}>
                <PlayCircleIcon className={`w-8 h-8 ${isSpeaking ? 'animate-pulse' : ''}`}/>
            </button>
        </div>
      </div>

      {/* Letter Grid */}
      <div className={`grid ${category.gridCols || 'grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6'} gap-3 md:gap-4`}>
        {category.cards.map((card) => {
          const letter = card.displayText || '';
          return (
            <Card 
              key={card.text} 
              data={card} 
              isAlphabetCard={true}
              draggable={true}
              onDragStart={createDragStartHandler(letter)}
            />
          );
        })}
      </div>
    </div>
  );
};