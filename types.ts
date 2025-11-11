// FIX: Changed type-only import to a full import to bring the JSX namespace into scope.
import React from 'react';

export enum CategoryType {
  HUMOR = 'HUMOR',
  CUIDADOS = 'CUIDADOS',
  ALFABETO = 'ALFABETO',
  COMIDA = 'COMIDA',
  CORES = 'CORES',
  FAMILIA = 'FAMILIA',
}

export interface CardData {
  text: string;
  image?: string;
  emoji?: string;
  displayText?: string;
  bgColorClass?: string;
}

export interface Category {
  id: CategoryType;
  title: string;
  emoji: string;
  cards: CardData[];
  gridCols?: string;
  bgColor: string;
  textColor: string;
}