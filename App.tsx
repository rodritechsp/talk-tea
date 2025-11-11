import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { CategorySelector } from './components/CategorySelector';
import { ToolView } from './components/ToolView';
import { CATEGORIES } from './constants';
import type { CategoryType } from './types';
import Login from './components/Login';
import { authService } from './services/authService';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(
    null
  );

  useEffect(() => {
    // Check auth status on initial load
    setIsAuthenticated(authService.isAuthenticated());
    setAuthChecked(true);
  }, []);


  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setSelectedCategory(null); // Reset view on logout
  };

  const handleSelectCategory = useCallback((category: CategoryType) => {
    setSelectedCategory(category);
  }, []);

  const handleBack = useCallback(() => {
    setSelectedCategory(null);
  }, []);

  const currentCategoryData = selectedCategory ? CATEGORIES[selectedCategory] : null;
  
  if (!authChecked) {
    // Render nothing or a loading spinner until auth status is checked
    return null; 
  }

  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="bg-sky-100 min-h-screen font-sans">
      <main className="container mx-auto p-4 md:p-6">
        {currentCategoryData ? (
          <div className="flex flex-col gap-4 md:gap-6">
            <Header onBack={handleBack} title={currentCategoryData.title} onLogout={handleLogout} />
            <ToolView category={currentCategoryData} />
          </div>
        ) : (
          <div className="flex flex-col gap-4 md:gap-6">
             <Header title="O que você quer dizer?" onLogout={handleLogout} />
            <CategorySelector onSelectCategory={handleSelectCategory} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;