import React from 'react';
import { ArrowLeftIcon, LogoutIcon } from './Icons';

interface HeaderProps {
  title: string;
  onBack?: () => void;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, onBack, onLogout }) => {
  return (
    <header className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4 flex-1">
        {onBack && (
          <button
            onClick={onBack}
            className="bg-white p-3 rounded-full shadow-md text-sky-600 hover:bg-sky-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            aria-label="Voltar para as categorias"
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
        )}
        <h1 className="text-2xl md:text-3xl font-bold text-sky-800 truncate">{title}</h1>
      </div>
      
      {onLogout && (
        <button
          onClick={onLogout}
          className="bg-white p-3 rounded-full shadow-md text-red-600 hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          aria-label="Sair da aplicação"
        >
          <LogoutIcon className="w-6 h-6" />
        </button>
      )}
    </header>
  );
};