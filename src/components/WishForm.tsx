import React, { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';

interface WishFormProps {
  onSubmit: (wish: string, author: string, color: string) => void;
}

const colors = [
  { name: 'pink', label: 'ピンク', class: 'bg-pink-300' },
  { name: 'blue', label: 'ブルー', class: 'bg-blue-300' },
  { name: 'yellow', label: 'イエロー', class: 'bg-yellow-300' },
  { name: 'green', label: 'グリーン', class: 'bg-green-300' },
  { name: 'purple', label: 'パープル', class: 'bg-purple-300' },
  { name: 'orange', label: 'オレンジ', class: 'bg-orange-300' },
];

export const WishForm: React.FC<WishFormProps> = ({ onSubmit }) => {
  const [wish, setWish] = useState('');
  const [author, setAuthor] = useState('');
  const [selectedColor, setSelectedColor] = useState('pink');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wish.trim() || !author.trim()) return;

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 800)); // Animation delay
    onSubmit(wish.trim(), author.trim(), selectedColor);
    setWish('');
    setAuthor('');
    setIsSubmitting(false);
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-6 h-6 text-yellow-400" />
          <h2 className="text-2xl font-bold text-white">願い事を書こう</h2>
          <Sparkles className="w-6 h-6 text-yellow-400" />
        </div>
        <p className="text-white/80 text-sm">
          あなたの願いを短冊に込めて、星に届けましょう ✨
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-white font-medium mb-2">
            願い事 <span className="text-red-400">*</span>
          </label>
          <textarea
            value={wish}
            onChange={(e) => setWish(e.target.value)}
            placeholder="あなたの願いを書いてください..."
            className="w-full p-4 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none"
            rows={3}
            maxLength={100}
            required
          />
          <div className="text-right text-white/60 text-xs mt-1">
            {wish.length}/100
          </div>
        </div>

        <div>
          <label className="block text-white font-medium mb-2">
            お名前 <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="あなたのお名前"
            className="w-full p-4 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            maxLength={20}
            required
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-3">
            短冊の色を選んでください
          </label>
          <div className="grid grid-cols-3 gap-3">
            {colors.map((color) => (
              <button
                key={color.name}
                type="button"
                onClick={() => setSelectedColor(color.name)}
                className={`
                  p-3 rounded-lg border-2 transition-all duration-200
                  ${color.class}
                  ${selectedColor === color.name 
                    ? 'border-white shadow-lg scale-105' 
                    : 'border-transparent hover:border-white/50 hover:scale-102'
                  }
                `}
              >
                <div className="text-gray-800 font-medium text-sm">
                  {color.label}
                </div>
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={!wish.trim() || !author.trim() || isSubmitting}
          className={`
            w-full py-4 px-6 rounded-lg font-bold text-lg transition-all duration-300
            flex items-center justify-center gap-2
            ${isSubmitting
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 transform hover:scale-105 shadow-lg hover:shadow-xl'
            }
            text-white
          `}
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              願いを込めています...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              願いを短冊に書く
            </>
          )}
        </button>
      </form>
    </div>
  );
};