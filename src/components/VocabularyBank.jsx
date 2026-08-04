import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Bookmark, 
  Volume2, 
  Trash2, 
  Layers, 
  Award, 
  RotateCw, 
  CheckCircle, 
  XCircle, 
  Sparkles,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const VocabularyBank = () => {
  const { vocabulary, deleteWord, speakText, targetLang, currentLanguageObj, addXp, setActiveTab } = useApp();

  const [viewMode, setViewMode] = useState('cards'); // 'cards' | 'flashcards' | 'quiz'
  const [currentFlashIndex, setCurrentFlashIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizFinished, setQuizFinished] = useState(false);

  const filteredVocab = vocabulary.filter(v => v.languageCode === targetLang);

  const handleNextFlashcard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentFlashIndex((prev) => (prev + 1) % filteredVocab.length);
    }, 200);
  };

  const handlePrevFlashcard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentFlashIndex((prev) => (prev - 1 + filteredVocab.length) % filteredVocab.length);
    }, 200);
  };

  const handleQuizAnswer = (chosenTranslation, correctAnswer) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(chosenTranslation);

    const isCorrect = chosenTranslation === correctAnswer;
    if (isCorrect) {
      setQuizScore(prev => prev + 1);
      addXp(25);
    }

    setTimeout(() => {
      if (quizIndex + 1 < filteredVocab.length) {
        setQuizIndex(prev => prev + 1);
        setSelectedAnswer(null);
      } else {
        setQuizFinished(true);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }, 1200);
  };

  const restartQuiz = () => {
    setQuizIndex(0);
    setQuizScore(0);
    setSelectedAnswer(null);
    setQuizFinished(false);
  };

  if (filteredVocab.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-500/10 flex items-center justify-center mb-6">
          <Bookmark className="w-10 h-10 text-amber-500" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
          Your Vocabulary Bank is Empty
        </h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6 text-sm">
          Save words while reading interactive stories by clicking on any word to translate and star it!
        </p>
        <button
          onClick={() => setActiveTab('catalog')}
          className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold shadow-lg shadow-sky-600/30 transition-all hover:scale-105 inline-flex items-center gap-2"
        >
          <BookOpen className="w-5 h-5" /> Explore Stories
        </button>
      </div>
    );
  }

  // Quiz choices generator
  const currentQuizWord = filteredVocab[quizIndex];
  const allTranslations = vocabulary.map(v => v.translation);
  const options = React.useMemo(() => {
    if (!currentQuizWord) return [];
    const wrongChoices = allTranslations.filter(t => t !== currentQuizWord.translation);
    const shuffledWrong = wrongChoices.sort(() => 0.5 - Math.random()).slice(0, 3);
    return [currentQuizWord.translation, ...shuffledWrong].sort(() => 0.5 - Math.random());
  }, [quizIndex, filteredVocab]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      
      {/* Header & Mode Switcher */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-3">
            <span>Saved Vocabulary Bank</span>
            <span className="text-sm px-3 py-1 bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-full font-bold">
              {filteredVocab.length} Words ({currentLanguageObj?.name})
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Review your dictionary, practice with 3D flashcards, or test your memory with quizzes.
          </p>
        </div>

        {/* View Mode Switches */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setViewMode('cards')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              viewMode === 'cards'
                ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Bookmark className="w-4 h-4" /> Bank List
          </button>
          <button
            onClick={() => {
              setViewMode('flashcards');
              setCurrentFlashIndex(0);
              setIsFlipped(false);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              viewMode === 'flashcards'
                ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" /> 3D Flashcards
          </button>
          <button
            onClick={() => {
              setViewMode('quiz');
              restartQuiz();
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              viewMode === 'quiz'
                ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Award className="w-4 h-4 text-amber-500" /> Quiz Mode
          </button>
        </div>
      </div>

      {/* Mode 1: Bank List Grid */}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVocab.map((item) => (
            <div
              key={item.id}
              className="glass-card rounded-2xl p-6 relative group border border-slate-200/80 dark:border-slate-700/80 hover:border-sky-500/50 transition-all shadow-md"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-2xl font-extrabold text-sky-600 dark:text-sky-400 capitalize">
                  {item.word}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => speakText(item.word, 'en-US')}
                    className="p-2 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-600 dark:text-sky-400 transition-colors"
                    title="Pronounce"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteWord(item.id)}
                    className="p-2 rounded-xl hover:bg-rose-500/10 text-slate-400 hover:text-rose-500 transition-colors"
                    title="Delete Word"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div 
                className={`text-xl font-bold text-slate-800 dark:text-slate-100 mb-3 ${
                  currentLanguageObj?.dir === 'rtl' ? 'font-arabic text-right' : 'text-left'
                }`}
                dir={currentLanguageObj?.dir || 'ltr'}
              >
                {item.translation}
              </div>

              {item.example && (
                <p className="text-xs text-slate-500 dark:text-slate-400 italic line-clamp-2 bg-slate-100 dark:bg-slate-900/60 p-3 rounded-xl">
                  "{item.example}"
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Mode 2: 3D Flashcards */}
      {viewMode === 'flashcards' && (
        <div className="max-w-md mx-auto">
          <div className="text-center text-xs font-semibold text-slate-400 mb-4">
            Card {currentFlashIndex + 1} of {filteredVocab.length}
          </div>

          {/* Flip Container */}
          <div 
            onClick={() => setIsFlipped(!isFlipped)}
            className={`flip-card h-80 cursor-pointer ${isFlipped ? 'flipped' : ''}`}
          >
            <div className="flip-card-inner relative w-full h-full rounded-3xl shadow-2xl">
              
              {/* Front Side */}
              <div className="flip-card-front absolute inset-0 glass-card rounded-3xl p-8 flex flex-col items-center justify-center text-center border-2 border-sky-500/30">
                <span className="text-xs uppercase tracking-widest text-sky-500 font-bold mb-4">
                  English Word
                </span>
                <h2 className="text-4xl font-black text-slate-900 dark:text-slate-50 capitalize mb-4">
                  {filteredVocab[currentFlashIndex]?.word}
                </h2>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    speakText(filteredVocab[currentFlashIndex]?.word, 'en-US');
                  }}
                  className="p-3 rounded-full bg-sky-500/20 text-sky-500 hover:scale-110 transition-transform"
                >
                  <Volume2 className="w-6 h-6" />
                </button>
                <span className="text-xs text-slate-400 mt-6 flex items-center gap-1">
                  <RotateCw className="w-3.5 h-3.5" /> Click card to reveal translation
                </span>
              </div>

              {/* Back Side */}
              <div className="flip-card-back absolute inset-0 bg-gradient-to-tr from-sky-600 to-indigo-700 text-white rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-2xl">
                <span className="text-xs uppercase tracking-widest text-sky-200 font-bold mb-4">
                  {currentLanguageObj?.name} Translation
                </span>
                <h2 
                  className={`text-4xl font-black mb-4 ${
                    currentLanguageObj?.dir === 'rtl' ? 'font-arabic' : ''
                  }`}
                  dir={currentLanguageObj?.dir || 'ltr'}
                >
                  {filteredVocab[currentFlashIndex]?.translation}
                </h2>
                {filteredVocab[currentFlashIndex]?.example && (
                  <p className="text-xs text-sky-100 italic bg-white/10 p-3 rounded-xl max-w-xs">
                    "{filteredVocab[currentFlashIndex]?.example}"
                  </p>
                )}
              </div>

            </div>
          </div>

          {/* Flashcard Navigation */}
          <div className="flex items-center justify-between gap-4 mt-6">
            <button
              onClick={handlePrevFlashcard}
              className="flex-1 py-3 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-sm hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
            >
              Previous
            </button>
            <button
              onClick={handleNextFlashcard}
              className="flex-1 py-3 rounded-xl bg-sky-600 text-white font-bold text-sm hover:bg-sky-500 transition-colors shadow-md shadow-sky-600/20"
            >
              Next Card
            </button>
          </div>
        </div>
      )}

      {/* Mode 3: Quiz Revision Mode */}
      {viewMode === 'quiz' && (
        <div className="max-w-lg mx-auto">
          {!quizFinished ? (
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl">
              
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-6">
                <span>Question {quizIndex + 1} of {filteredVocab.length}</span>
                <span className="text-amber-500 flex items-center gap-1">
                  <Sparkles className="w-4 h-4" /> Score: {quizScore}
                </span>
              </div>

              <div className="text-center mb-8">
                <span className="text-xs font-extrabold uppercase tracking-wider text-sky-500">
                  Select the correct translation
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-50 capitalize mt-2">
                  "{currentQuizWord?.word}"
                </h2>
              </div>

              {/* Quiz Choices */}
              <div className="space-y-3">
                {options.map((option, idx) => {
                  const isSelected = selectedAnswer === option;
                  const isCorrect = option === currentQuizWord?.translation;

                  let btnStyle = 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-sky-500';

                  if (selectedAnswer !== null) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-500 text-white border-emerald-600 font-bold';
                    } else if (isSelected) {
                      btnStyle = 'bg-rose-500 text-white border-rose-600 font-bold';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleQuizAnswer(option, currentQuizWord?.translation)}
                      disabled={selectedAnswer !== null}
                      className={`w-full py-3.5 px-6 rounded-2xl text-base sm:text-lg border-2 text-center transition-all ${btnStyle} ${
                        currentLanguageObj?.dir === 'rtl' ? 'font-arabic' : ''
                      }`}
                      dir={currentLanguageObj?.dir || 'ltr'}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

            </div>
          ) : (
            <div className="glass-card rounded-3xl p-8 text-center border border-slate-200 dark:border-slate-800 shadow-2xl">
              <Award className="w-20 h-20 text-amber-500 mx-auto mb-4 animate-bounce" />
              <h2 className="text-3xl font-black text-slate-900 dark:text-slate-50 mb-2">
                Quiz Completed!
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mb-6">
                You scored <span className="font-bold text-sky-500">{quizScore} / {filteredVocab.length}</span> correct answers!
              </p>
              <button
                onClick={restartQuiz}
                className="px-6 py-3 rounded-xl bg-sky-600 text-white font-bold text-sm shadow-lg shadow-sky-600/30 hover:scale-105 transition-transform"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
