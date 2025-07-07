import React from 'react';
import { Tanzaku } from './Tanzaku';
import { Heart, Users } from 'lucide-react';

interface Wish {
  id: string;
  wish: string;
  author: string;
  color: string;
  timestamp: number;
}

interface WishGalleryProps {
  wishes: Wish[];
  onRemoveWish: (id: string) => void;
  currentUser: string;
}

export const WishGallery: React.FC<WishGalleryProps> = ({ wishes, onRemoveWish, currentUser }) => {
  if (wishes.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-white/60 text-lg mb-4">
          まだ願い事がありません
        </div>
        <div className="text-white/40 text-sm">
          最初の願いを書いてみましょう ✨
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Users className="w-6 h-6 text-white" />
          <h2 className="text-2xl font-bold text-white">みんなの願い事</h2>
          <Heart className="w-6 h-6 text-red-400" />
        </div>
        <p className="text-white/80 text-sm">
          {wishes.length}個の願いが星に届けられました
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 justify-items-center">
        {wishes.map((wish) => (
          <div
            key={wish.id}
            className="animate-fade-in-up"
            style={{
              animationDelay: `${Math.random() * 0.5}s`,
            }}
          >
            <Tanzaku
              wish={wish.wish}
              author={wish.author}
              color={wish.color}
              onRemove={() => onRemoveWish(wish.id)}
              isOwn={wish.author === currentUser}
            />
          </div>
        ))}
      </div>
    </div>
  );
};