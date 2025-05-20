import React from 'react';
import { Heart } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="py-6 mb-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center">
          <Heart className="h-6 w-6 text-accent-500 mr-2 animate-pulse-slow" />
          <h1 className="text-2xl md:text-3xl font-medium text-center">Share Your Thoughts</h1>
        </div>
        <p className="text-center text-gray-600 mt-2 max-w-md mx-auto text-sm md:text-base">
          A safe space to express your feelings and concerns
        </p>
      </div>
    </header>
  );
};

export default Header;