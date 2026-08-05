import React, { useState } from 'react';
import { useApp, FREE_STORIES_PER_LEVEL } from '../context/AppContext';
import { CATEGORIES, LEVELS } from '../data/stories';
import { Search, BookOpen, Clock, Sparkles, Lock, Crown, Trash2, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

// Length meta helper
const LENGTH_META = {
  short:  { label: 'Short',  labelAr: 'قصيرة', emoji: '⚡', color: 'bg-emerald-500' },
  medium: { label: 'Medium', labelAr: 'وسط',   emoji: '📖', color: 'bg-amber-500' },
  long:   { label: 'Long',   labelAr: 'طويلة', emoji: '📚', color: 'bg-rose-500' },
};

const LengthBadge = ({ length }) => {
  const meta = LENGTH_META[length];
  if (!meta) return null;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black text-white ${meta.color} shadow-sm`}>
      {meta.emoji} {meta.label}
    </span>
  );
};

export const StoryCatalog = () => {
  const { stories, selectStory, currentLanguageObj, isOwner, isPro, deleteStory, setIsSubOpen, t } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedLength, setSelectedLength] = useState('All');

  const filteredStories = stories.filter((story) => {
    if (story.isKids || story.category === 'Kids & Tales') return false;
    const matchesSearch = story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.paragraphs?.some(p => p.en.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || story.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || story.level === selectedLevel;
    const matchesLength = selectedLength === 'All' || story.length === selectedLength;
    return matchesSearch && matchesCategory && matchesLevel && matchesLength;
  });

  // Group stories by level to enforce per-level free limit
  const storiesByLevel = {};
  filteredStories.forEach(story => {
    if (!storiesByLevel[story.level]) storiesByLevel[story.level] = [];
    storiesByLevel[story.level].push(story);
  });

  const isStoryLocked = (story) => {
    if (isPro || isOwner) return false;
    const levelStories = storiesByLevel[story.level] || [];
    const indexInLevel = levelStories.findIndex(s => s.id === story.id);
    return indexInLevel >= FREE_STORIES_PER_LEVEL;
  };

  const handleStoryClick = (story) => {
    if (isStoryLocked(story)) {
      setIsSubOpen(true);
      return;
    }
    selectStory(story);
  };

  const lengthFilters = [
    { id: 'All',    label: t('All'),    icon: null },
    { id: 'short',  label: `${LENGTH_META.short.emoji} ${t('Short')}`,  icon: null },
    { id: 'medium', label: `${LENGTH_META.medium.emoji} ${t('Medium')}`, icon: null },
    { id: 'long',   label: `${LENGTH_META.long.emoji} ${t('Long')}`,    icon: null },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* Hero Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-sky-600 via-sky-500 to-indigo-600 p-8 sm:p-12 text-white shadow-2xl overflow-hidden mb-10">
        <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
          <BookOpen className="w-96 h-96" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-extrabold uppercase tracking-wider mb-4 border border-white/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" /> {t('Interactive Bilingual Stories')}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black mb-4 leading-tight">
            {t('Learn English through Captivating Stories')}
          </h1>
          <p className="text-sky-100 text-sm sm:text-base leading-relaxed">
            {t('Click any word for instant translations in')} <span className="font-bold underline">{currentLanguageObj?.name}</span>.{' '}
            {!isPro && (
              <span className="text-yellow-300 font-bold">
                {t('Free users get 3 stories per level.')}{' '}
                <button onClick={() => setIsSubOpen(true)} className="underline hover:text-white">
                  {t('Upgrade to PRO 👑')}
                </button>
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-card rounded-2xl p-4 sm:p-6 mb-8 flex flex-col gap-4">
        {/* Search */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder={t('Search stories or keywords...')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
            />
          </div>

          {/* Summary count */}
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 shrink-0">
            {filteredStories.length} {t('stories found')}
          </div>
        </div>

        {/* Filter rows */}
        <div className="flex flex-wrap gap-3">
          {/* Level filter */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold overflow-x-auto">
            <span className="px-2 text-slate-400 shrink-0">{t('Level')}:</span>
            {LEVELS.map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-2.5 py-1 rounded-lg transition-all shrink-0 ${
                  selectedLevel === lvl
                    ? 'bg-sky-600 text-white shadow-sm font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

          {/* Story Length filter */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold overflow-x-auto">
            <span className="px-2 text-slate-400 shrink-0">{t('Length')}:</span>
            {lengthFilters.map(lf => (
              <button
                key={lf.id}
                onClick={() => setSelectedLength(lf.id)}
                className={`px-2.5 py-1 rounded-lg transition-all shrink-0 ${
                  selectedLength === lf.id
                    ? 'bg-sky-600 text-white shadow-sm font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {lf.label}
              </button>
            ))}
          </div>

          {/* Category filter */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold overflow-x-auto">
            <span className="px-2 text-slate-400 shrink-0">{t('Category')}:</span>
            {CATEGORIES.filter(c => c !== 'Kids & Tales').map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg transition-all shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-sky-600 text-white shadow-sm font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Story Cards Grid */}
      {filteredStories.length === 0 ? (
        <div className="text-center py-16">
          <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-600 dark:text-slate-400">{t('No stories match your filters')}</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredStories.map((story) => {
            const locked = isStoryLocked(story);
            return (
              <div
                key={story.id}
                onClick={() => handleStoryClick(story)}
                className={`glass-card rounded-2xl overflow-hidden group border transition-all duration-300 flex flex-col justify-between ${
                  locked
                    ? 'cursor-pointer border-slate-300/60 dark:border-slate-700/60 opacity-70 hover:opacity-90'
                    : 'cursor-pointer border-slate-200/80 dark:border-slate-700/80 hover:border-sky-500/50 hover:-translate-y-1.5 hover:shadow-2xl'
                }`}
              >
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={story.image}
                      alt={story.title}
                      className={`w-full h-full object-cover transition-transform duration-500 ${!locked ? 'group-hover:scale-105' : 'grayscale'}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                    {/* Level, Category & Length badges */}
                    <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
                      <span className="px-2.5 py-1 bg-sky-600 text-white rounded-lg text-xs font-black shadow-md">
                        {story.level}
                      </span>
                      <span className="px-2.5 py-1 bg-slate-900/80 backdrop-blur-md text-slate-200 rounded-lg text-xs font-semibold">
                        {story.category}
                      </span>
                    </div>

                    {/* Length badge bottom-left */}
                    {story.length && (
                      <div className="absolute bottom-3 left-3">
                        <LengthBadge length={story.length} />
                      </div>
                    )}

                    {/* PRO Lock Overlay */}
                    {locked && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/70 backdrop-blur-sm">
                        <div className="w-14 h-14 rounded-full bg-amber-500/20 border-2 border-amber-500/60 flex items-center justify-center mb-2">
                          <Lock className="w-7 h-7 text-amber-400 fill-amber-400/20" />
                        </div>
                        <span className="text-xs font-black text-amber-300 uppercase tracking-wider">PRO Story</span>
                      </div>
                    )}

                    {/* Owner Delete */}
                    {isOwner && (
                      <button
                        onClick={(e) => { e.stopPropagation(); deleteStory(story.id); }}
                        className="absolute top-3 right-3 p-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl shadow-md transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}

                    <div className="absolute bottom-3 right-3 text-xs text-white/90 flex items-center gap-1 font-semibold bg-slate-900/60 px-2.5 py-1 rounded-full backdrop-blur-md">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      {story.readTime}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className={`text-xl font-bold mb-3 line-clamp-1 transition-colors ${
                      locked ? 'text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-slate-50 group-hover:text-sky-600 dark:group-hover:text-sky-400'
                    }`}>
                      {locked && <Crown className="w-4 h-4 inline text-amber-500 mr-1" />}
                      {story.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed font-serif">
                      "{story.paragraphs[0]?.en}"
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  {locked ? (
                    <button
                      onClick={() => setIsSubOpen(true)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-sm shadow-md"
                    >
                      <Crown className="w-4 h-4 fill-slate-950" /> {t('Unlock with PRO')}
                    </button>
                  ) : (
                    <button className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-700/60 group-hover:bg-sky-600 text-slate-800 dark:text-slate-200 group-hover:text-white font-bold text-sm transition-all duration-200">
                      <BookOpen className="w-4 h-4" /> {t('Start Interactive Story')}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
