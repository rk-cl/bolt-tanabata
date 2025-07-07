import React from 'react';
import { Star } from 'lucide-react';

interface TanzakuProps {
  wish: string;
  author: string;
  color: string;
  onRemove?: () => void;
  isOwn?: boolean;
}

const colorClasses = {
  pink: 'bg-gradient-to-b from-pink-200 to-pink-300 border-pink-400',
  blue: 'bg-gradient-to-b from-blue-200 to-blue-300 border-blue-400',
  yellow: 'bg-gradient-to-b from-yellow-200 to-yellow-300 border-yellow-400',
  green: 'bg-gradient-to-b from-green-200 to-green-300 border-green-400',
  purple: 'bg-gradient-to-b from-purple-200 to-purple-300 border-purple-400',
  orange: 'bg-gradient-to-b from-orange-200 to-orange-300 border-orange-400',
};

export const Tanzaku: React.FC<TanzakuProps> = ({ wish, author, color, onRemove, isOwn }) => {
  const colorClass = colorClasses[color as keyof typeof colorClasses] || colorClasses.pink;

  return (
    <div className="group relative">
      <div
        className={`
          w-32 h-48 ${colorClass} border-2 rounded-t-lg rounded-b-sm
          shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl
          relative overflow-hidden cursor-pointer
        `}
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 85%, 90% 100%, 10% 100%, 0 85%)',
        }}
      >
        {/* Paper texture overlay */}
        <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-white via-transparent to-gray-300"></div>
        
        {/* Content */}
        <div className="p-3 h-full flex flex-col justify-between relative z-10">
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-800 text-sm font-medium text-center leading-relaxed break-words">
              {wish}
            </p>
          </div>
          
          <div className="text-right">
            <p className="text-xs text-gray-600 font-light">
              {author}
            </p>
          </div>
        </div>

        {/* Sparkle effect on hover */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Star className="w-4 h-4 text-yellow-400 fill-current animate-pulse" />
        </div>

        {/* Remove button for own wishes */}
        {isOwn && onRemove && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="absolute top-1 left-1 w-6 h-6 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-600 flex items-center justify-center"
          >
            ×
          </button>
        )}
      </div>
      
      {/* String */}
      <div className="w-0.5 h-8 bg-gray-600 mx-auto"></div>
    </div>
  );
};