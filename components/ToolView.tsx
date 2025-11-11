import React from 'react';
import { Card } from './Card';
import type { Category } from '../types';
import { CategoryType } from '../types';
import { AlphabetTool } from './AlphabetTool';

interface ToolViewProps {
  category: Category;
}

export const ToolView: React.FC<ToolViewProps> = ({ category }) => {
  if (category.id === CategoryType.ALFABETO) {
    return <AlphabetTool category={category} />;
  }

  return (
    <div className={`grid ${category.gridCols || 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'} gap-4 md:gap-6`}>
      {category.cards.map((card, index) => (
        <Card key={index} data={card} />
      ))}
    </div>
  );
};