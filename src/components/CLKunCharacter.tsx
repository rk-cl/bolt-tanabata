import React from 'react';
// import CLkunImage from 'public/assets/CLkun.png';
// supabaseのimportは一時的に削除（このファイル内でsupabase未使用のため）

export const CLKunCharacter: React.FC = () => {
  return (
    <div className="flex justify-center mb-8">
      <div className="relative group">
        <img
          src="/assets/CLkun.png"
          alt="CLくん"
          className="w-24 h-24 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
        />
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 text-sm font-medium text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          一緒に願いを叶えよう！
        </div>
        {/* Sparkle effects around character */}
        <div className="absolute -top-2 -right-2 w-3 h-3 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 -right-3 w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};