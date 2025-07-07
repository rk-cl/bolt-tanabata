import React, { useState, useEffect } from 'react';
import { StarField } from './components/StarField';
import { CLKunCharacter } from './components/CLKunCharacter';
import { WishForm } from './components/WishForm';
import { WishGallery } from './components/WishGallery';
import { Star, Sparkles } from 'lucide-react';
import { supabase } from './supabaseClient';

interface Wish {
  id: string;
  wish: string;
  author: string;
  color: string;
  timestamp: number;
}

function App() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [currentUser, setCurrentUser] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  // Supabaseからwishesを取得
  useEffect(() => {
    const fetchWishes = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('wishes')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) {
        setWishes(data);
      }
      setLoading(false);
    };
    fetchWishes();

    // リアルタイム購読（オプション）
    const subscription = supabase
      .channel('wishes-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'wishes' }, () => {
        fetchWishes();
      })
      .subscribe();
    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const handleAddWish = async (wish: string, author: string, color: string) => {
    const newWish = {
      wish,
      author,
      color,
    };
    const { error, data } = await supabase.from('wishes').insert([newWish]);
    if (error) {
      console.error('Supabase insert error:', error);
      alert('書き込みに失敗しました: ' + error.message);
    } else {
      setCurrentUser(author);
      setShowForm(false);
      // fetchWishes()はリアルタイム購読で自動反映
    }
  };

  const handleRemoveWish = async (id: string) => {
    await supabase.from('wishes').delete().eq('id', id);
    // fetchWishes()はリアルタイム購読で自動反映
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <StarField />
      
      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <header className="text-center py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Star className="w-8 h-8 text-yellow-400 animate-pulse" />
              <h1 className="text-4xl md:text-5xl font-bold text-white bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                七夕の願い事
              </h1>
              <Star className="w-8 h-8 text-yellow-400 animate-pulse" />
            </div>
            <p className="text-xl text-white/90 mb-2">
              あなたの願いを短冊に書きましょう 🎋
            </p>
            <p className="text-white/70 max-w-2xl mx-auto leading-relaxed">
              七夕の夜、星に願いを届けるチャンスです。あなたの願い事をここに書き込むと、短冊に記され、飾られます。
            </p>
          </div>
        </header>

        {/* CLkun Character */}
        <CLKunCharacter />

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 pb-12">
          {!showForm ? (
            <div className="space-y-12">
              {/* Call to Action */}
              <div className="text-center">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl max-w-2xl mx-auto">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Sparkles className="w-6 h-6 text-yellow-400" />
                    <h2 className="text-2xl font-bold text-white">願いを込めて</h2>
                    <Sparkles className="w-6 h-6 text-yellow-400" />
                  </div>
                  <p className="text-white/80 mb-6 leading-relaxed">
                    🎨 書き込んだ短冊はみんなと共有され、後で他の人の願い事も見ることができます。<br />
                    💭 さあ、心の中にある願いを一言で表してみましょう。
                  </p>
                  <button
                    onClick={() => setShowForm(true)}
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    願い事を書く ✨
                  </button>
                </div>
              </div>

              {/* Wishes Gallery */}
              {loading ? (
                <div className="text-center text-white/70 py-12">読み込み中...</div>
              ) : (
                <WishGallery 
                  wishes={wishes} 
                  onRemoveWish={handleRemoveWish}
                  currentUser={currentUser}
                />
              )}
            </div>
          ) : (
            <div className="max-w-2xl mx-auto">
              <div className="mb-6 text-center">
                <button
                  onClick={() => setShowForm(false)}
                  className="text-white/70 hover:text-white transition-colors duration-200 text-sm"
                >
                  ← 戻る
                </button>
              </div>
              <WishForm onSubmit={handleAddWish} />
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="text-center py-8 px-4">
          <div className="text-white/60 text-sm">
            <p>✨ みんなの願いが星に届きますように ✨</p>
          </div>
        </footer>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default App;