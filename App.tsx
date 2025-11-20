import React, { useState, useEffect } from 'react';
import { Globe, Book, History as HistoryIcon, AlertCircle, Search as SearchIcon, Library, Info, Layers } from 'lucide-react';
import SearchBar from './components/SearchBar';
import WordCard from './components/WordCard';
import HistoryStats from './components/HistoryStats';
import RivstartView from './components/RivstartView';
import GrammarReferenceView from './components/GrammarReferenceView';
import FlashcardView from './components/FlashcardView';
import { lookupSwedishWord } from './services/geminiService';
import { SUPPORTED_LANGUAGES, DEFAULT_TARGET_LANGUAGE } from './constants';
import { WordDetails, LoadingState, SearchHistoryItem } from './types';

type ViewMode = 'dictionary' | 'rivstart' | 'grammar' | 'flashcards';

const App: React.FC = () => {
  const [view, setView] = useState<ViewMode>('dictionary');
  const [targetLanguage, setTargetLanguage] = useState(DEFAULT_TARGET_LANGUAGE);
  const [currentWord, setCurrentWord] = useState<WordDetails | null>(null);
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);
  const [savedWords, setSavedWords] = useState<WordDetails[]>([]);

  // Load history and saved words from local storage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('swedishAppHistory');
    const savedFlashcards = localStorage.getItem('swedishAppFlashcards');
    
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }

    if (savedFlashcards) {
      try {
        setSavedWords(JSON.parse(savedFlashcards));
      } catch (e) {
        console.error("Failed to parse flashcards", e);
      }
    }
  }, []);

  // Save to local storage whenever state changes
  useEffect(() => {
    localStorage.setItem('swedishAppHistory', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('swedishAppFlashcards', JSON.stringify(savedWords));
  }, [savedWords]);

  const handleSearch = async (word: string) => {
    setStatus(LoadingState.LOADING);
    setErrorMsg(null);
    setCurrentWord(null);

    try {
      const result = await lookupSwedishWord(word, targetLanguage);
      setCurrentWord(result);
      setStatus(LoadingState.SUCCESS);
      
      // Add to history
      setHistory(prev => {
        const filtered = prev.filter(item => item.word.toLowerCase() !== result.word.toLowerCase());
        return [{ ...result, timestamp: Date.now() }, ...filtered].slice(0, 50);
      });

    } catch (error) {
      console.error(error);
      setStatus(LoadingState.ERROR);
      setErrorMsg("Failed to retrieve word details. Please try again.");
    }
  };

  const toggleSaveWord = (word: WordDetails) => {
    setSavedWords(prev => {
      const exists = prev.some(w => w.word.toLowerCase() === word.word.toLowerCase());
      if (exists) {
        return prev.filter(w => w.word.toLowerCase() !== word.word.toLowerCase());
      } else {
        return [word, ...prev];
      }
    });
  };

  const deleteSavedWord = (wordText: string) => {
    setSavedWords(prev => prev.filter(w => w.word.toLowerCase() !== wordText.toLowerCase()));
  };

  const isWordSaved = (word: string) => {
    return savedWords.some(w => w.word.toLowerCase() === word.toLowerCase());
  };

  const getTargetLangLabel = () => {
    return SUPPORTED_LANGUAGES.find(l => l.code === targetLanguage)?.label || targetLanguage;
  };

  return (
    <div className="min-h-screen bg-rivstart-cream text-rivstart-text font-sans pb-20">
      {/* Header */}
      <header className="bg-white sticky top-0 z-50 border-b border-rivstart-lightGreen/30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-rivstart-green rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-md">
                <span className="text-rivstart-lightGreen">Sv</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-rivstart-green tracking-tight">SvenskaLär</h1>
                <p className="text-xs text-slate-500 font-medium">Professional Edition</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-rivstart-green" />
              <select
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value)}
                className="bg-rivstart-mist/50 border-none text-sm rounded-full py-1.5 px-4 focus:ring-2 focus:ring-rivstart-green cursor-pointer text-slate-700 font-medium outline-none transition-all hover:bg-rivstart-mist"
              >
                {SUPPORTED_LANGUAGES.map(lang => (
                  <option key={lang.code} value={lang.code}>{lang.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-1 bg-rivstart-mist p-1.5 rounded-xl max-w-xl mx-auto sm:mx-0 overflow-x-auto">
            <button
              onClick={() => setView('dictionary')}
              className={`flex-1 min-w-[100px] flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-bold transition-all duration-200 whitespace-nowrap ${
                view === 'dictionary' 
                  ? 'bg-white text-rivstart-green shadow-sm ring-1 ring-black/5' 
                  : 'text-slate-500 hover:text-rivstart-green hover:bg-white/50'
              }`}
            >
              <SearchIcon className="w-4 h-4" />
              Dictionary
            </button>
            <button
              onClick={() => setView('rivstart')}
              className={`flex-1 min-w-[100px] flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-bold transition-all duration-200 whitespace-nowrap ${
                view === 'rivstart' 
                  ? 'bg-white text-rivstart-green shadow-sm ring-1 ring-black/5' 
                  : 'text-slate-500 hover:text-rivstart-green hover:bg-white/50'
              }`}
            >
              <Library className="w-4 h-4" />
              Rivstart
            </button>
            <button
              onClick={() => setView('grammar')}
              className={`flex-1 min-w-[100px] flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-bold transition-all duration-200 whitespace-nowrap ${
                view === 'grammar' 
                  ? 'bg-white text-rivstart-green shadow-sm ring-1 ring-black/5' 
                  : 'text-slate-500 hover:text-rivstart-green hover:bg-white/50'
              }`}
            >
              <Info className="w-4 h-4" />
              Grammar
            </button>
            <button
              onClick={() => setView('flashcards')}
              className={`flex-1 min-w-[100px] flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-bold transition-all duration-200 whitespace-nowrap ${
                view === 'flashcards' 
                  ? 'bg-white text-rivstart-green shadow-sm ring-1 ring-black/5' 
                  : 'text-slate-500 hover:text-rivstart-green hover:bg-white/50'
              }`}
            >
              <Layers className="w-4 h-4" />
              Flashcards
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {view === 'dictionary' && (
          <div className="space-y-12">
            {/* Hero / Search Area */}
            <section className="flex flex-col items-center text-center space-y-8 pt-4">
              <div className="space-y-4 max-w-2xl">
                <h2 className="text-4xl md:text-5xl font-extrabold text-rivstart-green tracking-tight font-serif">
                  Lär dig svenska <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-rivstart-green to-rivstart-lightGreen font-sans">naturligt</span>
                </h2>
                <p className="text-lg text-slate-600">
                  Instantly translate words, understand grammar rules, and see usage in context.
                </p>
              </div>
              
              <SearchBar 
                onSearch={handleSearch} 
                isLoading={status === LoadingState.LOADING} 
              />
            </section>

            {/* Result Display */}
            <section className="min-h-[200px]">
              {status === LoadingState.ERROR && (
                 <div className="max-w-2xl mx-auto p-4 bg-rivstart-pink/30 border border-rivstart-pink rounded-2xl flex items-center gap-3 text-red-800 shadow-sm">
                   <AlertCircle className="w-5 h-5" />
                   <p>{errorMsg}</p>
                 </div>
              )}

              {status === LoadingState.SUCCESS && currentWord && (
                <WordCard 
                  data={currentWord} 
                  targetLanguageLabel={getTargetLangLabel().split('(')[0]}
                  isSaved={isWordSaved(currentWord.word)}
                  onToggleSave={toggleSaveWord}
                />
              )}

              {status === LoadingState.IDLE && history.length === 0 && (
                <div className="flex flex-col items-center justify-center text-slate-300 py-12 opacity-60">
                   <Book className="w-20 h-20 mb-6 text-rivstart-mist" />
                   <p className="text-slate-400 font-medium">Start your journey by typing a word above</p>
                </div>
              )}
            </section>

            {/* Analytics & History Section */}
            <section className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <HistoryStats history={history} />
              </div>
              
              <div className="bg-white rounded-2xl shadow-sm border border-rivstart-mist overflow-hidden flex flex-col h-full max-h-[500px]">
                 <div className="p-6 border-b border-rivstart-mist flex items-center gap-2 bg-rivstart-mist/30">
                    <HistoryIcon className="w-5 h-5 text-rivstart-green" />
                    <h3 className="font-bold text-slate-800">Recent Searches</h3>
                 </div>
                 <div className="overflow-y-auto flex-1 p-3 custom-scrollbar">
                   {history.length === 0 ? (
                     <p className="text-center text-slate-400 py-12 text-sm">No history yet.</p>
                   ) : (
                     <ul className="space-y-2">
                       {history.map((item, idx) => (
                         <li key={`${item.word}-${idx}`}>
                           <button 
                              onClick={() => {
                                setCurrentWord(item);
                                setStatus(LoadingState.SUCCESS);
                                setView('dictionary');
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                              className="w-full flex items-center justify-between p-4 hover:bg-rivstart-mist/30 hover:border-rivstart-lightGreen border border-transparent rounded-xl transition-all duration-200 text-left group"
                           >
                              <div className="flex flex-col">
                                <span className="font-bold text-slate-700 group-hover:text-rivstart-green transition-colors text-lg">{item.word}</span>
                                <span className="text-xs text-slate-400 uppercase font-semibold tracking-wider">{item.partOfSpeech}</span>
                              </div>
                              <span className={`text-xs px-3 py-1 rounded-full font-bold uppercase ${
                                item.gender === 'en' ? 'bg-rivstart-pink/40 text-red-900' : 
                                item.gender === 'ett' ? 'bg-rivstart-lightGreen/40 text-green-900' : 'bg-gray-100 text-gray-500'
                              }`}>
                                {item.gender === 'n/a' ? '-' : item.gender}
                              </span>
                           </button>
                         </li>
                       ))}
                     </ul>
                   )}
                 </div>
              </div>
            </section>
          </div>
        )}
        
        {view === 'rivstart' && (
          <RivstartView 
            targetLanguageLabel={getTargetLangLabel().split('(')[0]} 
            targetLanguageCode={targetLanguage}
          />
        )}

        {view === 'grammar' && (
          <GrammarReferenceView />
        )}

        {view === 'flashcards' && (
          <FlashcardView 
            savedWords={savedWords}
            onDelete={deleteSavedWord}
          />
        )}

      </main>
    </div>
  );
};

export default App;