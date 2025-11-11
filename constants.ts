import type { Category } from './types';
import { CategoryType } from './types';

export const CATEGORIES: Record<CategoryType, Category> = {
  [CategoryType.HUMOR]: {
    id: CategoryType.HUMOR,
    title: 'Humor',
    emoji: '😊',
    bgColor: 'bg-yellow-400',
    textColor: 'text-yellow-800',
    cards: [
      { text: 'Estou feliz', displayText: 'Feliz', emoji: '😄' },
      { text: 'Estou triste', displayText: 'Triste', emoji: '😢' },
      { text: 'Estou com raiva', displayText: 'Com raiva', emoji: '😠' },
      { text: 'Estou com sono', displayText: 'Com sono', emoji: '😴' },
    ],
  },
  [CategoryType.CUIDADOS]: {
    id: CategoryType.CUIDADOS,
    title: 'Cuidados',
    emoji: '❤️',
    bgColor: 'bg-red-400',
    textColor: 'text-red-800',
    cards: [
      { text: 'Preciso de ajuda', displayText: 'Ajuda', emoji: '🙋' },
      { text: 'Estou com dor', displayText: 'Dor', emoji: '🤕' },
      { text: 'Quero um abraço', displayText: 'Abraço', emoji: '🤗' },
      { text: 'Quero descansar', displayText: 'Descansar', emoji: '🛌' },
    ],
  },
  [CategoryType.ALFABETO]: {
    id: CategoryType.ALFABETO,
    title: 'Alfabeto',
    emoji: '🔤',
    gridCols: 'grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6',
    bgColor: 'bg-purple-400',
    textColor: 'text-purple-800',
    cards: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => ({
      text: `Letra ${letter}`,
      displayText: letter,
    })),
  },
  [CategoryType.COMIDA]: {
    id: CategoryType.COMIDA,
    title: 'Comida',
    emoji: '🍔',
    bgColor: 'bg-green-400',
    textColor: 'text-green-800',
    cards: [
      { text: 'Estou com fome', displayText: 'Com fome', emoji: '😋' },
      { text: 'Estou com sede', displayText: 'Com sede', emoji: '🥤' },
      { text: 'Quero comer maçã', displayText: 'Maçã', emoji: '🍎' },
      { text: 'Quero beber água', displayText: 'Água', emoji: '💧' },
    ],
  },
  [CategoryType.CORES]: {
    id: CategoryType.CORES,
    title: 'Cores',
    emoji: '🎨',
    bgColor: 'bg-blue-400',
    textColor: 'text-blue-800',
    cards: [
      { text: 'Cor vermelha', displayText: 'Vermelho', bgColorClass: 'bg-red-500' },
      { text: 'Cor azul', displayText: 'Azul', bgColorClass: 'bg-blue-500' },
      { text: 'Cor amarela', displayText: 'Amarelo', bgColorClass: 'bg-yellow-400' },
      { text: 'Cor verde', displayText: 'Verde', bgColorClass: 'bg-green-500' },
      { text: 'Cor laranja', displayText: 'Laranja', bgColorClass: 'bg-orange-500' },
      { text: 'Cor roxa', displayText: 'Roxo', bgColorClass: 'bg-purple-500' },
      { text: 'Cor rosa', displayText: 'Rosa', bgColorClass: 'bg-pink-400' },
      { text: 'Cor marrom', displayText: 'Marrom', bgColorClass: 'bg-amber-800' },
      { text: 'Cor preta', displayText: 'Preto', bgColorClass: 'bg-black' },
      { text: 'Cor branca', displayText: 'Branco', bgColorClass: 'bg-white border-2 border-gray-200' },
      { text: 'Cor cinza', displayText: 'Cinza', bgColorClass: 'bg-gray-400' },
    ],
  },
  [CategoryType.FAMILIA]: {
    id: CategoryType.FAMILIA,
    title: 'Família',
    emoji: '👨‍👩‍👧‍👦',
    bgColor: 'bg-pink-400',
    textColor: 'text-pink-800',
    cards: [
      { text: 'Eu te amo, mamãe', displayText: 'Mamãe', emoji: '👩' },
      { text: 'Eu te amo, papai', displayText: 'Papai', emoji: '👨' },
      { text: 'Irmão', displayText: 'Irmão', emoji: '👦' },
      { text: 'Irmã', displayText: 'Irmã', emoji: '👧' },
    ],
  },
};