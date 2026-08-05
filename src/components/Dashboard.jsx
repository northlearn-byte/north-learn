import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Flame, 
  Zap, 
  Target, 
  Download, 
  CheckCircle2, 
  ShieldCheck, 
  Award, 
  Clock, 
  BookOpen, 
  Sparkles,
  Crown,
  Plus,
  Trash2
} from 'lucide-react';
import { FREE_STORIES_PER_LEVEL } from '../context/AppContext';
import { LEVELS, CATEGORIES } from '../data/stories';

export const Dashboard = () => {
  const { 
    stats, vocabulary, currentLanguageObj, setActiveTab, user,
    addStory, deleteStory, t, stories,
    isOwner: ctxIsOwner, isPro, setIsSubOpen
  } = useApp();

  const [dailyGoalMinutes, setDailyGoalMinutes] = useState(15);
  const [downloadedStories, setDownloadedStories] = useState(['a1-1', 'a1-2']);

  // Manager New Story Form State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newLevel, setNewLevel] = useState('A1');
  const [newCategory, setNewCategory] = useState('Daily Life');
  const [newLength, setNewLength] = useState('short'); // 'short' | 'medium' | 'long'
  const [newEnText, setNewEnText] = useState('');
  const [newArText, setNewArText] = useState('');
  const [autoTranslating, setAutoTranslating] = useState(false);

  const handleAutoTranslateText = async () => {
    if (!newEnText.trim()) return;
    setAutoTranslating(true);
    try {
      const res = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ar&dt=t&q=${encodeURIComponent(newEnText)}`
      );
      if (res.ok) {
        const data = await res.json();
        const translated = data?.[0]?.map(item => item[0]).join('') || '';
        if (translated) setNewArText(translated);
      }
    } catch (err) {
      console.error('Auto translate failed:', err);
    } finally {
      setAutoTranslating(false);
    }
  };

  const toggleDownloadStory = (story, indexInLevel) => {
    const isLocked = !isPro && !ctxIsOwner && indexInLevel >= FREE_STORIES_PER_LEVEL;
    if (isLocked) {
      setIsSubOpen(true);
      return;
    }
    if (downloadedStories.includes(story.id)) {
      setDownloadedStories(prev => prev.filter(id => id !== story.id));
    } else {
      setDownloadedStories(prev => [...prev, story.id]);
    }
  };

  const handleCreateStory = (e) => {
    e.preventDefault();
    if (!newTitle || !newEnText) return;

    const readTimeMap = { short: '2 min', medium: '4 min', long: '7 min' };

    const newStory = {
      id: `custom-${Date.now()}`,
      title: newTitle,
      level: newLevel,
      category: newCategory,
      readTime: readTimeMap[newLength] || '3 min',
      length: newLength,
      isKids: newCategory === 'Kids & Tales',
      image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800&auto=format&fit=crop',
      paragraphs: [
        {
          id: `p-${Date.now()}`,
          en: newEnText,
          translations: {
            ar: newArText || newEnText,
            es: `[ES] ${newEnText}`,
            fr: `[FR] ${newEnText}`,
            de: `[DE] ${newEnText}`,
            zh: `[ZH] ${newEnText}`,
            ja: `[JA] ${newEnText}`,
            ru: `[RU] ${newEnText}`
          }
        }
      ]
    };

    if (addStory) {
      addStory(newStory);
    }
    
    setNewTitle('');
    setNewEnText('');
    setNewArText('');
    setShowAddModal(false);
  };

  const progressPercent = Math.min(100, Math.round((stats.minutesToday / dailyGoalMinutes) * 100));

  const isOwner = ctxIsOwner || user?.email === 'abooodiv96@gmail.com';
  const STORIES = stories || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Welcome Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-3">
            <span>{t('User Dashboard & Progress')}</span>
            {isOwner && (
              <span className="px-3 py-1 bg-amber-500/20 text-amber-500 text-xs rounded-full font-black flex items-center gap-1 border border-amber-500/40">
                <Crown className="w-4 h-4 fill-amber-500" /> System Owner
              </span>
            )}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
            {t('Track daily reading goals, manage offline downloaded stories, and review streak milestones.')}
          </p>
        </div>

        {/* Owner Quick Create Story Button */}
        {isOwner && (
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/30 transition-transform hover:scale-105"
          >
            <Plus className="w-5 h-5 stroke-[3]" /> Add Custom Story (Manager Mode)
          </button>
        )}
      </div>

      {/* Owner Manager Creator Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="relative w-full max-w-lg glass-card rounded-3xl p-6 sm:p-8 border border-amber-500/40 shadow-2xl">
            <h3 className="text-xl font-black text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
              <Crown className="w-5 h-5 text-amber-500" /> Manager: Add New Story
            </h3>

            <form onSubmit={handleCreateStory} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Story Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. The Secret Garden"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-amber-500 border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Level</label>
                  <select
                    value={newLevel}
                    onChange={(e) => setNewLevel(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm border border-slate-200 dark:border-slate-700"
                  >
                    {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map(l => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm border border-slate-200 dark:border-slate-700"
                  >
                    {['Daily Life', 'Adventure', 'Fantasy', 'Sci-Fi', 'Kids & Tales'].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Length</label>
                  <select
                    value={newLength}
                    onChange={(e) => setNewLength(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm border border-slate-200 dark:border-slate-700"
                  >
                    <option value="short">Short (قصيرة)</option>
                    <option value="medium">Medium (وسط)</option>
                    <option value="long">Long (طويلة)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">English Story Text</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Enter original English story text..."
                  value={newEnText}
                  onChange={(e) => setNewEnText(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-amber-500 border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-500">Arabic Translation</label>
                  <button
                    type="button"
                    onClick={handleAutoTranslateText}
                    disabled={autoTranslating || !newEnText.trim()}
                    className="flex items-center gap-1 text-xs font-extrabold text-sky-500 hover:text-sky-400 disabled:opacity-50"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    {autoTranslating ? 'Translating...' : 'Google Auto-Translate 🪄'}
                  </button>
                </div>
                <textarea
                  rows={3}
                  placeholder="ادخل النص المترجم للعربية..."
                  value={newArText}
                  onChange={(e) => setNewArText(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-amber-500 border border-slate-200 dark:border-slate-700 font-arabic"
                  dir="rtl"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black shadow-md"
                >
                  Publish Story
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Gamification Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        
        {/* Streak Days */}
        <div className="glass-card rounded-2xl p-6 border border-amber-500/30 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-500">
            <Flame className="w-8 h-8 fill-amber-500 animate-pulse" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 dark:text-slate-100">
              {stats.streakDays} Days
            </div>
            <div className="text-xs font-bold text-amber-500 uppercase tracking-wider">
              Current Streak
            </div>
          </div>
        </div>

        {/* Total XP */}
        <div className="glass-card rounded-2xl p-6 border border-sky-500/30 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-sky-500/20 flex items-center justify-center text-sky-500">
            <Zap className="w-8 h-8 fill-sky-500" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 dark:text-slate-100">
              {stats.totalXp} XP
            </div>
            <div className="text-xs font-bold text-sky-500 uppercase tracking-wider">
              Total Experience
            </div>
          </div>
        </div>

        {/* Saved Vocabulary */}
        <div className="glass-card rounded-2xl p-6 border border-emerald-500/30 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-500">
            <Award className="w-8 h-8" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 dark:text-slate-100">
              {vocabulary.length} Words
            </div>
            <div className="text-xs font-bold text-emerald-500 uppercase tracking-wider">
              Dictionary Size
            </div>
          </div>
        </div>

        {/* Target Language */}
        <div className="glass-card rounded-2xl p-6 border border-indigo-500/30 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-3xl">
            {currentLanguageObj?.flag}
          </div>
          <div>
            <div className="text-lg font-black text-slate-900 dark:text-slate-100">
              {currentLanguageObj?.name}
            </div>
            <div className="text-xs font-bold text-indigo-500 uppercase tracking-wider">
              Target Language
            </div>
          </div>
        </div>

      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col (2 Span): Daily Goals Tracker & Milestones */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Daily Reading Goal Widget */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Target className="w-6 h-6 text-sky-500" />
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                {t('Daily Reading Goal')}
              </h2>
              </div>
              
              <div className="flex items-center gap-2">
                {[10, 15, 20].map(mins => (
                  <button
                    key={mins}
                    onClick={() => setDailyGoalMinutes(mins)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      dailyGoalMinutes === mins
                        ? 'bg-sky-600 text-white shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                    }`}
                  >
                    {mins} min/day
                  </button>
                ))}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
                <span>{stats.minutesToday} mins completed today</span>
                <span>{progressPercent}% Goal</span>
              </div>
              <div className="w-full h-4 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
                <div 
                  className="h-full bg-gradient-to-r from-sky-500 to-emerald-400 rounded-full transition-all duration-500 shadow-md"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <p className="text-xs text-slate-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> {t('Keep reading stories to maintain your daily streak!')}
            </p>
          </div>

          {/* Offline Story Downloader Section */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-6">
              <Download className="w-6 h-6 text-emerald-500" />
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                {t('Offline Story Manager')}
              </h2>
              <p className="text-xs text-slate-400">
                {t('Download stories to read anytime without an internet connection.')}
              </p>
              </div>
            </div>

            <div className="space-y-4">
              {stories.map((story) => {
                const isDownloaded = downloadedStories.includes(story.id);
                // Calculate position in level for free limit check
                const levelStories = stories.filter(s => s.level === story.level);
                const indexInLevel = levelStories.findIndex(s => s.id === story.id);
                const isLocked = !isPro && !isOwner && indexInLevel >= FREE_STORIES_PER_LEVEL;

                return (
                  <div
                    key={story.id}
                    className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                      isLocked 
                        ? 'bg-slate-100/50 dark:bg-slate-800/30 border-slate-200/40 dark:border-slate-700/40 opacity-75' 
                        : 'bg-slate-100 dark:bg-slate-800/60 border-slate-200/60 dark:border-slate-700/60'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img 
                          src={story.image} 
                          alt={story.title} 
                          className={`w-12 h-12 rounded-xl object-cover ${isLocked ? 'grayscale' : ''}`}
                        />
                        {isLocked && (
                          <div className="absolute inset-0 bg-slate-950/60 rounded-xl flex items-center justify-center">
                            <Lock className="w-5 h-5 text-amber-400" />
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-1.5">
                          {story.title}
                          {isLocked && <Crown className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20 inline" />}
                        </div>
                        <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                          <span className="font-bold text-sky-500">{story.level}</span>
                          <span>•</span>
                          <span>{story.readTime}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {isOwner && (
                        <button
                          onClick={() => deleteStory && deleteStory(story.id)}
                          className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                          title="Delete Story (Owner)"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}

                      {isLocked ? (
                        <button
                          onClick={() => setIsSubOpen(true)}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md hover:scale-105 transition-all"
                        >
                          <Crown className="w-3.5 h-3.5 fill-slate-950" /> {t('PRO Only')}
                        </button>
                      ) : (
                        <button
                          onClick={() => toggleDownloadStory(story, indexInLevel)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                            isDownloaded
                              ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/40'
                              : 'bg-sky-600 hover:bg-sky-500 text-white shadow-md shadow-sky-600/20'
                          }`}
                        >
                          {isDownloaded ? (
                            <>
                              <CheckCircle2 className="w-4 h-4" /> Offline Ready
                            </>
                          ) : (
                            <>
                              <Download className="w-4 h-4" /> Download
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

        {/* Right Col: Unlocked Features & Desktop Status */}
        <div className="space-y-8">
          
          <div className="glass-card rounded-3xl p-6 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="w-6 h-6 text-sky-500" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                100% Free & Unlocked
              </h2>
            </div>
            
            <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> NO Paywalls or Subscriptions
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Full Offline Story Capabilities
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Web Speech Synthesis Engine
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Multi-Language Dual Paragraph View
              </li>
            </ul>
          </div>

          <div className="glass-card rounded-3xl p-6 bg-gradient-to-tr from-sky-600 to-indigo-700 text-white shadow-xl">
            <h3 className="text-xl font-extrabold mb-2">North Learn Desktop 🧭</h3>
            <p className="text-xs text-sky-100 leading-relaxed mb-4">
              Built for Windows and macOS. Keep learning everyday to conquer new language levels!
            </p>
            <button
              onClick={() => setActiveTab('catalog')}
              className="w-full py-2.5 rounded-xl bg-white text-sky-700 font-extrabold text-xs shadow-md hover:bg-sky-50 transition-colors"
            >
              {t('Continue Reading Stories')}
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
