import React from 'react';
import { useApp, FREE_STORIES_PER_LEVEL } from '../context/AppContext';
import { Play, Star, Lock, Crown, Clock } from 'lucide-react';

const LENGTH_COLORS = { short: 'bg-emerald-500', medium: 'bg-amber-500', long: 'bg-rose-500' };
const LENGTH_EMOJI  = { short: '⚡', medium: '📖', long: '📚' };

export const KidsSection = () => {
  const { stories, selectStory, currentLanguageObj, isPro, isOwner, setIsSubOpen, t } = useApp();

  const kidsStories = stories.filter(s => s.isKids || s.category === 'Kids & Tales');

  const isStoryLocked = (index) => {
    if (isPro || isOwner) return false;
    return index >= FREE_STORIES_PER_LEVEL;
  };

  const handleStoryClick = (story, index) => {
    if (isStoryLocked(index)) {
      setIsSubOpen(true);
      return;
    }
    selectStory(story);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* Playful Kids Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-8 sm:p-12 text-white shadow-2xl overflow-hidden mb-10 border-4 border-yellow-300">
        <div className="relative z-10 max-w-xl">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-300 text-slate-950 font-black text-xs uppercase tracking-wider mb-4 shadow-lg">
            🧸 {t('Kids Zone')} | {t('Tales & Wonder')}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black mb-4 leading-tight drop-shadow-md">
            {t('Fun Stories & Tales for Little Explorers! 🎨')}
          </h1>
          <p className="text-pink-100 text-sm sm:text-base leading-relaxed font-semibold">
            {t('Listen to fun voices, click any word to translate into')}{' '}
            <span className="underline font-bold text-yellow-300">{currentLanguageObj?.name}</span>{t(', and collect magic stars!')}
            {!isPro && (
              <span className="block mt-1 text-yellow-200">
                ✨ {t('Free: 3 tales available.')} <button onClick={() => setIsSubOpen(true)} className="underline font-black text-white hover:text-yellow-300">{t('Unlock all 15 with PRO 👑')}</button>
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Story Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {kidsStories.map((story, index) => {
          const locked = isStoryLocked(index);
          return (
            <div
              key={story.id}
              onClick={() => handleStoryClick(story, index)}
              className={`group cursor-pointer rounded-3xl bg-white dark:bg-slate-800 p-5 border-4 shadow-xl transition-all duration-300 flex flex-col justify-between ${
                locked
                  ? 'border-slate-300 dark:border-slate-700 opacity-70 hover:opacity-85'
                  : 'border-sky-400 dark:border-sky-500 hover:scale-105'
              }`}
            >
              <div>
                <div className="relative h-52 rounded-2xl overflow-hidden mb-4 border-2 border-slate-100 dark:border-slate-700">
                  <img
                    src={story.image}
                    alt={story.title}
                    className={`w-full h-full object-cover transition-transform duration-500 ${!locked ? 'group-hover:scale-110' : 'grayscale'}`}
                  />
                  <div className="absolute top-3 left-3 bg-yellow-400 text-slate-950 px-3 py-1 rounded-full text-xs font-black shadow-md flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-slate-950" /> {story.level}
                  </div>
                  {story.length && (
                    <div className="absolute top-3 right-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black text-white ${LENGTH_COLORS[story.length] || 'bg-slate-500'}`}>
                        {LENGTH_EMOJI[story.length]} {t(story.length === 'short' ? 'Short' : story.length === 'medium' ? 'Medium' : 'Long')}
                      </span>
                    </div>
                  )}

                  {/* PRO Lock overlay for locked stories */}
                  {locked && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/70 backdrop-blur-sm rounded-2xl">
                      <div className="w-14 h-14 rounded-full bg-amber-500/20 border-2 border-amber-500/60 flex items-center justify-center mb-2">
                        <Lock className="w-7 h-7 text-amber-400" />
                      </div>
                      <span className="text-xs font-black text-amber-300 uppercase tracking-wider">PRO Tale</span>
                    </div>
                  )}
                </div>

                <h3 className={`text-2xl font-black mb-2 transition-colors ${
                  locked
                    ? 'text-slate-400 dark:text-slate-500'
                    : 'text-slate-900 dark:text-slate-50 group-hover:text-pink-500'
                }`}>
                  {locked && <Crown className="w-5 h-5 inline text-amber-500 mr-1" />}
                  {story.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 line-clamp-2 font-medium">
                  "{story.paragraphs[0]?.en}"
                </p>
              </div>

              <div className="mt-6">
                {locked ? (
                  <button
                    onClick={() => setIsSubOpen(true)}
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-sm shadow-lg flex items-center justify-center gap-2"
                  >
                    <Crown className="w-4 h-4 fill-slate-950" /> {t('Unlock with PRO')}
                  </button>
                ) : (
                  <button className="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-black text-sm shadow-lg shadow-pink-500/30 flex items-center justify-center gap-2">
                    <Play className="w-4 h-4 fill-white" /> {t('Listen & Read Tale')}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
