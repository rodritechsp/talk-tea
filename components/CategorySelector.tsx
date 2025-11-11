
import React from 'react';
import { CATEGORIES } from '../constants';
import type { CategoryType } from '../types';

interface CategorySelectorProps {
  onSelectCategory: (category: CategoryType) => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({ onSelectCategory }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
      {Object.values(CATEGORIES).map((category) => (
        <button
          key={category.id}
          onClick={() => onSelectCategory(category.id)}
          className={`${category.bgColor} ${category.textColor} rounded-2xl shadow-lg p-4 flex flex-col items-center justify-center text-center aspect-square transform hover:scale-105 transition-transform duration-200 ease-in-out focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-sky-500`}
        >
          <span className="text-5xl md:text-6xl mb-2">{category.emoji}</span>
          <span className="font-semibold text-sm md:text-lg">{category.title}</span>
        </button>
      ))}
    </div>
  );
};