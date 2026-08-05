import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { translateWord } from '../data/stories';
import { 
  Play, 
  Square, 
  Globe, 
  Volume2, 
  Star, 
  Check, 
  ArrowLeft, 
  Sparkles, 
  SlidersHorizontal,
  Bookmark
} from 'lucide-react';

export const StoryReader = () => {
  const { 
    selectedStory, 
    targetLang, 
    currentLanguageObj, 
    audioSpeed, 
    setAudioSpeed, 
    speakText, 
    stopSpeech, 
    saveWord, 
    vocabulary, 
    setActiveTab,
    t
  } = useApp();

  const [showFullTranslation, setShowFullTranslation] = useState(false);
  const [isPlayingFull, setIsPlayingFull] = useState(false);
  const [activeWordInfo, setActiveWordInfo] = useState(null);
  const [highlightWordIndex, setHighlightWordIndex] = useState(null);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const translateCache = useRef({});

  // Translate a single word via Google Translate free API
  const translateWordOnline = async (word, langCode) => {
    const cacheKey = `${word}__${langCode}`;
    if (translateCache.current[cacheKey]) return translateCache.current[cacheKey];

    try {
      const res = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${langCode}&dt=t&q=${encodeURIComponent(word)}`
      );
      if (res.ok) {
        const data = await res.json();
        const result = data?.[0]?.[0]?.[0];
        if (result && result.toLowerCase() !== word.toLowerCase()) {
          translateCache.current[cacheKey] = result;
          return result;
        }
      }
    } catch (_) {}

    // Fallback 1: MyMemory API
    try {
      const res2 = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(word)}&langpair=en|${langCode}`
      );
      if (res2.ok) {
        const data2 = await res2.json();
        const result2 = data2?.responseData?.translatedText;
        if (result2 && result2.toLowerCase() !== word.toLowerCase()) {
          translateCache.current[cacheKey] = result2;
          return result2;
        }
      }
    } catch (_) {}

    // Fallback 2: Local Dictionary
    const localDictRes = translateWord(word, langCode);
    if (localDictRes) {
      translateCache.current[cacheKey] = localDictRes;
      return localDictRes;
    }

    return word;
  };

  // Full story audio player logic
  const handleToggleFullAudio = () => {
    if (isPlayingFull) {
      stopSpeech();
      setIsPlayingFull(false);
      setHighlightWordIndex(null);
    } else {
      setIsPlayingFull(true);
      const fullText = selectedStory.paragraphs.map(p => p.en).join(' ');
      const words = fullText.split(/\s+/);

      speakText(
        fullText,
        'en-US',
        audioSpeed,
        (charIndex) => {
          // Find which word index corresponds to charIndex
          let count = 0;
          for (let i = 0; i < words.length; i++) {
            count += words[i].length + 1;
            if (count > charIndex) {
              setHighlightWordIndex(i);
              break;
            }
          }
        },
        () => {
          setIsPlayingFull(false);
          setHighlightWordIndex(null);
        }
      );
    }
  };

  useEffect(() => {
    return () => stopSpeech();
  }, []);

  const handleWordClick = async (e, cleanWord, fullParagraphEn) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const isSaved = vocabulary.some(v => v.word.toLowerCase() === cleanWord.toLowerCase());

    // Show popup immediately with loading state
    setActiveWordInfo({ word: cleanWord, translation: null, example: fullParagraphEn, rect, isSaved });
    setSavedSuccess(false);
    setIsTranslating(true);

    // Speak word immediately
    speakText(cleanWord, 'en-US', 0.9);

    // Fetch translation from Google Translate API
    const translation = await translateWordOnline(cleanWord, targetLang);
    setIsTranslating(false);
    setActiveWordInfo(prev =>
      prev && prev.word === cleanWord
        ? { ...prev, translation }
        : prev
    );
  };

  const handleSaveActiveWord = () => {
    if (!activeWordInfo) return;
    saveWord(activeWordInfo.word, activeWordInfo.translation, activeWordInfo.example);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  if (!selectedStory) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <p className="text-slate-500">{t('No story selected.')}</p>
        <button 
          onClick={() => setActiveTab('catalog')}
          className="mt-4 px-4 py-2 bg-sky-600 text-white rounded-lg"
        >
          {t('Return to Library')}
        </button>
      </div>
    );
  }

  // Combine words count to calculate active word index for continuous reading
  let wordCounter = 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8" onClick={() => setActiveWordInfo(null)}>
      
      {/* Top Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <button
          onClick={() => {
            stopSpeech();
            setActiveTab('catalog');
          }}
          className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('Back to Stories')}
        </button>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 rounded-full text-xs font-bold">
            {selectedStory.level}
          </span>
          <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full text-xs font-semibold">
            {selectedStory.category}
          </span>
        </div>
      </div>

      {/* Story Banner Header */}
      <div className="relative rounded-2xl overflow-hidden mb-8 shadow-xl">
        <img 
          src={selectedStory.image} 
          alt={selectedStory.title} 
          className="w-full h-48 sm:h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent flex flex-col justify-end p-6 sm:p-8">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white mb-2">
            {selectedStory.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 flex items-center gap-2">
            <span>⏱️ {selectedStory.readTime} read</span>
            <span>•</span>
            <span>Target Language: {currentLanguageObj?.flag} {currentLanguageObj?.name}</span>
          </p>
        </div>
      </div>

      {/* Master Player Controls Bar */}
      <div className="glass-card rounded-2xl p-4 sm:p-5 mb-8 flex flex-wrap items-center justify-between gap-4 border border-slate-200 dark:border-slate-800">
        
        {/* Full Story Audio Playback Button */}
        <button
          onClick={handleToggleFullAudio}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 shadow-md ${
            isPlayingFull
              ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/30 animate-pulse'
              : 'bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white shadow-sky-500/20 hover:scale-105'
          }`}
        >
          {isPlayingFull ? (
            <>
              <Square className="w-4 h-4 fill-white" /> Stop Audio
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-white" /> {t('Read Full Story')}
            </>
          )}
        </button>

        {/* Dual Translation Toggle Button */}
        <button
          onClick={() => setShowFullTranslation(!showFullTranslation)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm border transition-all duration-200 ${
            showFullTranslation
              ? 'bg-amber-500/10 border-amber-500/40 text-amber-600 dark:text-amber-400'
              : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          <Globe className="w-4 h-4 text-amber-500" />
          {showFullTranslation ? t('Hide Translations') : t('Translate Full Story')}
        </button>

        {/* Speed Controller */}
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
          <SlidersHorizontal className="w-4 h-4 ml-2 text-slate-400" />
          {[0.75, 1.0, 1.25].map(speed => (
            <button
              key={speed}
              onClick={() => setAudioSpeed(speed)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                audioSpeed === speed
                  ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {speed}x
            </button>
          ))}
        </div>
      </div>

      {/* Story Paragraphs Container */}
      <div className="space-y-6 sm:space-y-8">
        {selectedStory.paragraphs.map((para) => {
          const words = para.en.split(' ');

          return (
            <div 
              key={para.id} 
              className="glass-card rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:shadow-xl relative"
            >
              {/* Interactive Paragraph Text */}
              <p className="text-lg sm:text-xl font-serif leading-relaxed tracking-wide text-slate-800 dark:text-slate-100">
                {words.map((word, idx) => {
                  const cleanWord = word.replace(/[^a-zA-Z]/g, '');
                  const currentGlobalIndex = wordCounter++;
                  const isActive = highlightWordIndex === currentGlobalIndex;
                  const isSaved = vocabulary.some(v => v.word.toLowerCase() === cleanWord.toLowerCase());

                  return (
                    <span
                      key={idx}
                      onClick={(e) => handleWordClick(e, cleanWord, para.en)}
                      className={`story-word ${isActive ? 'active-word' : ''} ${isSaved ? 'saved-word' : ''}`}
                      title="Click to translate & speak"
                    >
                      {word}{' '}
                    </span>
                  );
                })}
              </p>

              {/* Dual-View Paragraph Translation (When toggled on) */}
              {showFullTranslation && (() => {
                let transText = para.translations?.[targetLang];
                // If translation is missing or a static placeholder like [ES] ..., translate dynamically!
                if (!transText || transText.startsWith('[') || targetLang === 'ar' && !para.translations.ar) {
                  const words = para.en.split(' ');
                  transText = words.map(w => {
                    const clean = w.replace(/[^a-zA-Z]/g, '').toLowerCase();
                    const translated = translateWord(clean, targetLang);
                    return translated.startsWith('ترجمة') ? w : translated;
                  }).join(' ');
                }

                return (
                  <div 
                    className={`mt-4 pt-4 border-t border-slate-200/80 dark:border-slate-700/80 text-base sm:text-lg text-sky-700 dark:text-sky-300 font-medium ${
                      currentLanguageObj?.dir === 'rtl' ? 'font-arabic text-right' : 'text-left'
                    }`}
                    dir={currentLanguageObj?.dir || 'ltr'}
                  >
                    {transText}
                  </div>
                );
              })()}
            </div>
          );
        })}
      </div>

      {/* Instant Interactive Word Translation Tooltip Popup */}
      {activeWordInfo && (
        <div 
          className="fixed z-50 transform -translate-x-1/2 -translate-y-full mb-3 bg-slate-900 text-white rounded-2xl p-4 shadow-2xl border border-sky-500/30 max-w-xs w-64 animate-fade-in"
          style={{
            left: `${Math.min(Math.max(activeWordInfo.rect.left + activeWordInfo.rect.width / 2, 140), window.innerWidth - 140)}px`,
            top: `${activeWordInfo.rect.top + window.scrollY - 10}px`
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-bold text-sky-400 capitalize">
              {activeWordInfo.word}
            </span>
            <button
              onClick={() => speakText(activeWordInfo.word, 'en-US')}
              className="p-1.5 rounded-lg bg-sky-500/20 hover:bg-sky-500/40 text-sky-300 transition-colors"
              title="Pronounce Word"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          <div 
            className={`text-xl font-semibold text-amber-300 mb-3 min-h-[2rem] flex items-center gap-2 ${
              currentLanguageObj?.dir === 'rtl' ? 'font-arabic flex-row-reverse' : ''
            }`}
            dir={currentLanguageObj?.dir || 'ltr'}
          >
            {isTranslating ? (
              <span className="flex items-center gap-2 text-sm text-slate-400">
                <svg className="animate-spin w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                {currentLanguageObj?.flag} جاري الترجمة...
              </span>
            ) : (
              <span>{currentLanguageObj?.flag} {activeWordInfo.translation}</span>
            )}
          </div>

          <button
            onClick={handleSaveActiveWord}
            disabled={isTranslating || activeWordInfo.isSaved || savedSuccess}
            className={`w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
              activeWordInfo.isSaved || savedSuccess
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                : isTranslating
                ? 'bg-slate-700/60 text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-md'
            }`}
          >
            {savedSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" /> {t('Saved! (+15 XP)')}
              </>
            ) : activeWordInfo.isSaved ? (
              <>
                <Bookmark className="w-4 h-4 text-emerald-400" /> {t('In Dictionary')}
              </>
            ) : (
              <>
                <Star className="w-4 h-4 fill-white" /> {t('Save Word (+15 XP)')}
              </>
            )}
          </button>
        </div>
      )}

    </div>
  );
};
