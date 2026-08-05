import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { LANGUAGES, translateWord } from '../data/stories';
import { 
  ArrowRightLeft, 
  Volume2, 
  Copy, 
  History, 
  Trash2, 
  Globe, 
  Check, 
  BookOpen,
  Sparkles,
  Loader2
} from 'lucide-react';

export const Translator = () => {
  const { targetLang, speakText, t, currentLanguageObj } = useApp();
  
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [destLang, setDestLang] = useState(targetLang);
  const [wordAnalysis, setWordAnalysis] = useState([]);
  const [copiedText, setCopiedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('north_learn_translation_history');
    return saved ? JSON.parse(saved) : [];
  });

  // Sync destination language with global target language when component mounts or targetLang changes
  useEffect(() => {
    setDestLang(targetLang);
  }, [targetLang]);

  // Save history
  useEffect(() => {
    localStorage.setItem('north_learn_translation_history', JSON.stringify(history));
  }, [history]);

  // High-accuracy multi-engine translation using MyMemory API with Google Translate fallback API
  const handleTranslate = async () => {
    if (!sourceText.trim()) {
      setTranslatedText('');
      setWordAnalysis([]);
      return;
    }

    setIsLoading(true);

    const words = sourceText
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'\n]/g, " ")
      .split(/\s+/)
      .filter(w => w.length > 0);

    // Dynamic word-by-word translation analysis
    const analysis = words.map(word => {
      const cleanWord = word.trim().toLowerCase().replace(/[^a-z]/g, '');
      let translation = translateWord(cleanWord, destLang);
      
      if (translation.startsWith('ترجمة الكلمة:')) {
        translation = word;
      }

      return {
        word,
        translation
      };
    });

    setWordAnalysis(analysis);

    let finalTranslation = '';

    // Engine 1: Free Google Translate Public API Proxy
    try {
      const gUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${destLang}&dt=t&q=${encodeURIComponent(sourceText)}`;
      const res = await fetch(gUrl);
      const data = await res.json();

      if (data && data[0]) {
        finalTranslation = data[0].map(item => item[0]).join('');
      }
    } catch (err) {
      console.warn("Engine 1 failed, trying Engine 2...", err);
    }

    // Engine 2: MyMemory API Fallback
    if (!finalTranslation) {
      try {
        const pair = `${sourceLang}|${destLang}`;
        const mUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(sourceText)}&langpair=${pair}`;
        const response = await fetch(mUrl);
        const data = await response.json();
        
        if (data && data.responseData && data.responseData.translatedText) {
          finalTranslation = data.responseData.translatedText;
        }
      } catch (err) {
        console.warn("Engine 2 failed, using dictionary fallback...", err);
      }
    }

    // Engine 3: Local word-by-word fallback
    if (!finalTranslation) {
      finalTranslation = analysis.map(a => a.translation).join(' ');
    }

    setTranslatedText(finalTranslation);
    setIsLoading(false);

    // Add to history
    if (finalTranslation) {
      const newHistoryItem = {
        id: Date.now(),
        sourceText,
        translatedText: finalTranslation,
        sourceLang,
        destLang
      };
      setHistory(prev => {
        const filtered = prev.filter(item => item.sourceText.toLowerCase() !== sourceText.toLowerCase());
        return [newHistoryItem, ...filtered].slice(0, 15);
      });
    }
  };

  // Trigger translation when typing stops
  useEffect(() => {
    if (!sourceText.trim()) {
      setTranslatedText('');
      return;
    }
    const timer = setTimeout(() => {
      handleTranslate();
    }, 800); // Translate 800ms after user finishes typing
    return () => clearTimeout(timer);
  }, [sourceText, sourceLang, destLang]);

  const copyToClipboard = (text, type) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    setTimeout(() => setCopiedText(''), 2000);
  };

  const handleSpeak = (text, langCode) => {
    if (!text) return;
    const speakLang = langCode === 'en' ? 'en-US' : (langCode === 'ar' ? 'ar-SA' : `${langCode}-${langCode.toUpperCase()}`);
    speakText(text, speakLang);
  };

  const swapLanguages = () => {
    const temp = sourceLang;
    setSourceLang(destLang);
    setDestLang(temp);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  const clearAll = () => {
    setSourceText('');
    setTranslatedText('');
    setWordAnalysis([]);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const sourceLangObj = LANGUAGES.find(l => l.code === sourceLang) || { name: 'English', flag: '🇺🇸' };
  const destLangObj = LANGUAGES.find(l => l.code === destLang) || { name: 'Arabic', flag: '🇸🇦' };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 sm:p-12 text-white shadow-2xl overflow-hidden mb-8">
        <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
          <Globe className="w-96 h-96" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-extrabold uppercase tracking-wider mb-4 border border-white/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" /> {t('Translator 🌐')} (Instant & Unlimited API)
          </span>
          <h1 className="text-3xl sm:text-5xl font-black mb-4 leading-tight">
            {t('Translator')}
          </h1>
          <p className="text-indigo-100 text-sm sm:text-base leading-relaxed">
            {t('Click any word for instant translations in')} <span className="font-bold underline">{destLangObj.name}</span>. {t('Tap on any word to translate it instantly.')}
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Translation Boxes */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-lg">
            
            {/* Lang Bar Selector */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800">
              {/* Source Lang Picker */}
              <select
                value={sourceLang}
                onChange={(e) => setSourceLang(e.target.value)}
                className="bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 font-bold text-xs px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-600 focus:outline-none cursor-pointer"
              >
                <option value="en">🇺🇸 English</option>
                {LANGUAGES.map(l => (
                  <option key={l.code} value={l.code}>{l.flag} {l.name}</option>
                ))}
              </select>

              <button 
                onClick={swapLanguages}
                className="p-2 rounded-xl bg-white dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors shadow-sm"
                title="Swap Languages"
              >
                <ArrowRightLeft className="w-4 h-4 text-sky-500" />
              </button>

              {/* Dest Lang Picker */}
              <select
                value={destLang}
                onChange={(e) => setDestLang(e.target.value)}
                className="bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 font-bold text-xs px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-600 focus:outline-none cursor-pointer"
              >
                {LANGUAGES.map(l => (
                  <option key={l.code} value={l.code}>{l.flag} {l.name}</option>
                ))}
                <option value="en">🇺🇸 English</option>
              </select>
            </div>

            {/* Input & Output Panels */}
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900">
              
              {/* Input Area */}
              <div className="p-5 flex flex-col justify-between min-h-[220px]">
                <textarea
                  value={sourceText}
                  onChange={(e) => setSourceText(e.target.value)}
                  placeholder="Enter text to translate (Arabic or English)..."
                  className="w-full h-40 resize-none bg-transparent border-0 focus:outline-none focus:ring-0 text-slate-900 dark:text-slate-50 text-base"
                />
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800/50">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSpeak(sourceText, sourceLang)}
                      disabled={!sourceText}
                      className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-950 dark:hover:text-white transition-colors disabled:opacity-30"
                      title="Listen"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => copyToClipboard(sourceText, 'source')}
                      disabled={!sourceText}
                      className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-950 dark:hover:text-white transition-colors disabled:opacity-30 relative"
                      title="Copy"
                    >
                      {copiedText === 'source' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <button 
                    onClick={clearAll}
                    className="text-xs font-black text-rose-500 hover:text-rose-600 px-3 py-1.5 rounded-lg hover:bg-rose-500/10 transition-colors"
                  >
                    Clear
                  </button>
                </div>
              </div>

              {/* Output Area */}
              <div className="p-5 flex flex-col justify-between min-h-[220px] bg-slate-50/50 dark:bg-slate-950/20">
                <div className="w-full min-h-[160px] text-slate-900 dark:text-slate-50 text-base font-semibold leading-relaxed whitespace-pre-wrap select-all relative">
                  {isLoading ? (
                    <div className="flex items-center gap-2 text-sky-500 italic text-sm py-4">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Translating via Live API...</span>
                    </div>
                  ) : (
                    translatedText || <span className="text-slate-400 dark:text-slate-600 italic">Translation will appear here instantly...</span>
                  )}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800/50">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSpeak(translatedText, destLang)}
                      disabled={!translatedText}
                      className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-950 dark:hover:text-white transition-colors disabled:opacity-30"
                      title="Listen"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => copyToClipboard(translatedText, 'dest')}
                      disabled={!translatedText}
                      className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-950 dark:hover:text-white transition-colors disabled:opacity-30 relative"
                      title="Copy"
                    >
                      {copiedText === 'dest' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <button 
                    onClick={handleTranslate}
                    className="px-4 py-1.5 rounded-lg bg-sky-600 text-white font-bold text-xs hover:bg-sky-700 shadow-md transition-all active:scale-95 flex items-center gap-1.5"
                  >
                    {isLoading && <Loader2 className="w-3 h-3 animate-spin" />}
                    Translate Now
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* Interactive Word Analysis */}
          {wordAnalysis.length > 0 && (
            <div className="glass-card rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-md">
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-sky-500" />
                <span>Interactive Word Lookup</span>
              </h2>
              <div className="flex flex-wrap gap-2.5">
                {wordAnalysis.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 hover:border-sky-500 hover:bg-sky-500/10 cursor-help transition-all group"
                    title={`Translation: ${item.translation}`}
                  >
                    <span className="font-bold text-slate-900 dark:text-slate-50">{item.word}</span>
                    <span className="text-xs text-slate-400 dark:text-slate-500">→</span>
                    <span className="text-xs font-semibold text-sky-600 dark:text-sky-400">{item.translation}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* History Panel */}
        <div className="space-y-6">
          <div className="glass-card rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-md flex flex-col justify-between min-h-[400px]">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-4">
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <History className="w-5 h-5 text-slate-500" />
                  <span>Translation History</span>
                </h3>
                {history.length > 0 && (
                  <button 
                    onClick={clearHistory}
                    className="p-1.5 rounded-lg hover:bg-rose-500/10 text-rose-500 hover:text-rose-600 transition-colors"
                    title="Clear History"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {history.length === 0 ? (
                <div className="text-center py-16 text-slate-400 dark:text-slate-600 text-sm">
                  <History className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>Recent translations appear here</p>
                </div>
              ) : (
                <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-1">
                  {history.map((item) => (
                    <div 
                      key={item.id} 
                      onClick={() => { setSourceText(item.sourceText); setTranslatedText(item.translatedText); setSourceLang(item.sourceLang); setDestLang(item.destLang); }}
                      className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/40 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-700/50 cursor-pointer transition-all shadow-sm hover:scale-[1.01]"
                    >
                      <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1 font-bold">
                        <span>{LANGUAGES.find(l => l.code === item.sourceLang)?.flag || '🇺🇸'} → {LANGUAGES.find(l => l.code === item.destLang)?.flag || '🇸🇦'} {LANGUAGES.find(l => l.code === item.destLang)?.name || item.destLang}</span>
                      </div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 line-clamp-1">{item.sourceText}</p>
                      <p className="text-xs text-sky-600 dark:text-sky-400 font-medium line-clamp-1 mt-0.5">{item.translatedText}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-400 dark:text-slate-500 font-medium">
              💡 Tip: Click any history item to load it back into the translator boxes.
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
