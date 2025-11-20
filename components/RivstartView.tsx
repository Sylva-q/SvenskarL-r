import React, { useState } from 'react';
import { BookOpen, ChevronRight, Book, Lightbulb, List, Loader2, AlertCircle } from 'lucide-react';
import { getRivstartChapter } from '../services/geminiService';
import { ChapterContent, LoadingState } from '../types';
import { RIVSTART_CHAPTERS } from '../constants';

interface RivstartViewProps {
  targetLanguageLabel: string;
  targetLanguageCode: string;
}

const RivstartView: React.FC<RivstartViewProps> = ({ targetLanguageLabel, targetLanguageCode }) => {
  const [selectedChapterId, setSelectedChapterId] = useState(1);
  const [chapterData, setChapterData] = useState<ChapterContent | null>(null);
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);

  const handleLoadChapter = async () => {
    setStatus(LoadingState.LOADING);
    try {
      const chapterTitle = RIVSTART_CHAPTERS.find(c => c.id === selectedChapterId)?.title || `Chapter ${selectedChapterId}`;
      const data = await getRivstartChapter(selectedChapterId, chapterTitle, targetLanguageLabel);
      setChapterData(data);
      setStatus(LoadingState.SUCCESS);
    } catch (e) {
      console.error(e);
      setStatus(LoadingState.ERROR);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Controls */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-4 justify-between">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="bg-rivstart-green/10 p-3 rounded-full">
             <Book className="w-6 h-6 text-rivstart-green" />
          </div>
          <div>
            <h2 className="font-bold text-gray-900">Rivstart A1+A2</h2>
            <p className="text-sm text-gray-500">3rd Edition Companion</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none w-full sm:w-64">
            <select 
              value={selectedChapterId}
              onChange={(e) => setSelectedChapterId(Number(e.target.value))}
              className="w-full pl-4 pr-10 py-2.5 border border-gray-200 rounded-xl bg-gray-50 text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-rivstart-green appearance-none cursor-pointer truncate"
            >
              {RIVSTART_CHAPTERS.map(chap => (
                <option key={chap.id} value={chap.id}>{chap.id}. {chap.title}</option>
              ))}
            </select>
            <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none rotate-90" />
          </div>
          
          <button 
            onClick={handleLoadChapter}
            disabled={status === LoadingState.LOADING}
            className="px-6 py-2.5 bg-rivstart-green text-white font-medium rounded-xl hover:bg-teal-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 shrink-0"
          >
            {status === LoadingState.LOADING ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Loading...</span>
              </>
            ) : (
              'Load'
            )}
          </button>
        </div>
      </div>

      {/* Error State */}
      {status === LoadingState.ERROR && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-700">
           <AlertCircle className="w-5 h-5" />
           <p>Failed to load chapter content. Please try again.</p>
        </div>
      )}

      {/* Content Display */}
      {status === LoadingState.SUCCESS && chapterData && (
        <div className="space-y-6 animate-fade-in-up">
          
          {/* Header Card */}
          <div className="bg-gradient-to-br from-teal-800 to-slate-900 rounded-3xl p-8 text-white shadow-lg">
            <span className="text-rivstart-yellow font-bold tracking-widest uppercase text-sm">Chapter {chapterData.chapterNumber}</span>
            <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4">{chapterData.title}</h1>
            <p className="text-slate-300 text-lg leading-relaxed max-w-3xl">
              {chapterData.summary}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Grammar Section */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                <h3 className="font-bold text-xl text-gray-800">Grammar Points</h3>
              </div>
              <div className="space-y-6">
                {chapterData.grammar.map((point, idx) => (
                  <div key={idx} className="bg-yellow-50/50 p-4 rounded-xl border border-yellow-100">
                    <h4 className="font-bold text-slate-800 mb-2">{point.topic}</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">{point.explanation}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Vocabulary Section */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
                <List className="w-5 h-5 text-rivstart-green" />
                <h3 className="font-bold text-xl text-gray-800">Vocabulary</h3>
              </div>
              <div className="overflow-hidden rounded-xl border border-gray-100">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="p-3 font-semibold text-slate-500">Swedish</th>
                      <th className="p-3 font-semibold text-slate-500">English</th>
                      <th className="p-3 font-semibold text-slate-500">{targetLanguageLabel}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {chapterData.vocabulary.map((word, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3 font-bold text-rivstart-green">{word.swedish}</td>
                        <td className="p-3 text-slate-600">{word.english}</td>
                        <td className="p-3 text-slate-500">{word.secondary}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Empty State */}
      {status === LoadingState.IDLE && (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
          <BookOpen className="w-16 h-16 text-gray-200 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-400">Select a chapter to begin</h3>
          <p className="text-gray-400 mt-2">Load summaries, grammar, and wordlists from Rivstart A1+A2</p>
        </div>
      )}
    </div>
  );
};

export default RivstartView;