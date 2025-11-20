import React from 'react';
import { Volume2, BookOpen, Tag, Share2, PlayCircle, Layers, Info, Heart, CheckCircle } from 'lucide-react';
import { WordDetails } from '../types';

interface WordCardProps {
  data: WordDetails;
  targetLanguageLabel: string;
  isSaved?: boolean;
  onToggleSave?: (word: WordDetails) => void;
}

const WordCard: React.FC<WordCardProps> = ({ data, targetLanguageLabel, isSaved = false, onToggleSave }) => {
  // Helper to format part of speech for styling
  const pos = data.partOfSpeech.toLowerCase();
  
  // Determine display title: "en/ett + word" for nouns, just "word" for others
  const displayTitle = (pos.includes('noun') && data.gender !== 'n/a')
    ? `${data.gender} ${data.word}`
    : data.word;
  
  const speakText = (text: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'sv-SE';
      utterance.rate = 0.9; // Slightly slower for learners
      window.speechSynthesis.speak(utterance);
    }
  };

  // Render Verb Table
  const renderVerbTable = () => {
    if (!data.inflections?.verb) return null;
    const forms = data.inflections.verb;
    
    return (
      <div className="overflow-x-auto rounded-xl border border-rivstart-lightGreen shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="bg-rivstart-green/5 text-rivstart-green font-medium uppercase tracking-wider">
            <tr>
              <th className="p-3">Imperativ</th>
              <th className="p-3">Infinitiv</th>
              <th className="p-3">Presens</th>
              <th className="p-3">Preteritum</th>
              <th className="p-3">Supinum</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-rivstart-lightGreen">
            <tr className="text-slate-700 font-medium">
              <td className="p-3 border-b-2 border-red-200 bg-red-50/30">{forms.imperative}</td>
              <td className="p-3">att {forms.infinitive}</td>
              <td className="p-3">{forms.present}</td>
              <td className="p-3">{forms.past}</td>
              <td className="p-3">{forms.supine}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  // Render Noun Table
  const renderNounTable = () => {
    if (!data.inflections?.noun) return null;
    const forms = data.inflections.noun;
    
    return (
      <div className="overflow-hidden rounded-xl border border-rivstart-lightGreen shadow-sm">
        <table className="w-full text-sm text-center">
          <thead className="bg-rivstart-green/5 text-rivstart-green font-semibold">
            <tr>
              <th className="p-3 w-1/3"></th>
              <th className="p-3 w-1/3">Obestämd (Indefinite)</th>
              <th className="p-3 w-1/3">Bestämd (Definite)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-rivstart-lightGreen bg-white">
            <tr>
              <td className="p-3 font-bold text-rivstart-green text-xs uppercase tracking-wider text-left pl-4">Singular</td>
              <td className="p-3 text-slate-700 font-medium">{forms.indefiniteSingular}</td>
              <td className="p-3 text-slate-700 font-medium bg-rivstart-lightGreen/20">{forms.definiteSingular}</td>
            </tr>
            <tr>
              <td className="p-3 font-bold text-rivstart-green text-xs uppercase tracking-wider text-left pl-4">Plural</td>
              <td className="p-3 text-slate-700 font-medium">{forms.indefinitePlural}</td>
              <td className="p-3 text-slate-700 font-medium bg-rivstart-lightGreen/20">{forms.definitePlural}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  // Render Adjective Table
  const renderAdjectiveTables = () => {
    if (!data.inflections?.adjective) return null;
    const forms = data.inflections.adjective;

    return (
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Declension */}
        <div className="overflow-hidden rounded-xl border border-rivstart-lightGreen shadow-sm">
           <div className="bg-rivstart-green/5 px-4 py-2 text-xs font-bold text-rivstart-green uppercase tracking-wider">
             Declension
           </div>
           <table className="w-full text-sm text-left">
             <tbody className="divide-y divide-rivstart-lightGreen bg-white">
               <tr>
                 <td className="p-3 text-slate-400 text-xs font-semibold uppercase">En-form</td>
                 <td className="p-3 text-slate-700 font-medium">{forms.indefiniteEn}</td>
               </tr>
               <tr>
                 <td className="p-3 text-slate-400 text-xs font-semibold uppercase">Ett-form</td>
                 <td className="p-3 text-slate-700 font-medium">{forms.indefiniteEtt}</td>
               </tr>
               <tr>
                 <td className="p-3 text-slate-400 text-xs font-semibold uppercase">Plural</td>
                 <td className="p-3 text-slate-700 font-medium">{forms.indefinitePlural}</td>
               </tr>
               <tr>
                 <td className="p-3 text-slate-400 text-xs font-semibold uppercase">Bestämd</td>
                 <td className="p-3 text-slate-700 font-medium">{forms.definite}</td>
               </tr>
             </tbody>
           </table>
        </div>

        {/* Comparison */}
        <div className="overflow-hidden rounded-xl border border-rivstart-lightGreen shadow-sm">
          <div className="bg-rivstart-green/5 px-4 py-2 text-xs font-bold text-rivstart-green uppercase tracking-wider">
             Comparison
           </div>
           <table className="w-full text-sm text-left">
             <tbody className="divide-y divide-rivstart-lightGreen bg-white">
               <tr>
                 <td className="p-3 text-slate-400 text-xs font-semibold uppercase">Positiv</td>
                 <td className="p-3 text-slate-700 font-medium">{forms.positive}</td>
               </tr>
               <tr>
                 <td className="p-3 text-slate-400 text-xs font-semibold uppercase">Komparativ</td>
                 <td className="p-3 text-slate-700 font-medium">{forms.comparative}</td>
               </tr>
               <tr>
                 <td className="p-3 text-slate-400 text-xs font-semibold uppercase">Superlativ</td>
                 <td className="p-3 text-slate-700 font-medium">{forms.superlative}</td>
               </tr>
             </tbody>
           </table>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl shadow-xl shadow-rivstart-mist border border-rivstart-mist overflow-hidden animate-fade-in-up">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-rivstart-green to-rivstart-darkGreen p-8 text-white relative overflow-hidden">
        
        <div className="relative z-10">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-baseline gap-3 flex-wrap">
                <h2 className="text-5xl font-bold tracking-tight drop-shadow-sm font-serif">{displayTitle}</h2>
                {data.gender !== 'n/a' && (
                  <span className={`px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wide shadow-sm ${
                    data.gender === 'en' ? 'bg-rivstart-pink text-red-900' : 'bg-rivstart-lightGreen text-green-900'
                  }`}>
                    {data.gender}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4 mt-3 text-teal-50">
                <span className="text-xl font-mono opacity-90 bg-white/10 px-2 rounded">/{data.ipa}/</span>
                <span className="flex items-center gap-1 text-sm uppercase tracking-wider border border-white/20 px-2 py-0.5 rounded-md bg-black/20">
                  <Tag size={14} /> {data.partOfSpeech}
                </span>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={(e) => speakText(data.word, e)}
                className="p-3 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-md transition-all duration-300 group shadow-lg"
                title="Listen to pronunciation"
              >
                <Volume2 className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
              </button>
              
              {onToggleSave && (
                <button 
                  onClick={() => onToggleSave(data)}
                  className={`p-3 rounded-full backdrop-blur-md transition-all duration-300 group shadow-lg ${
                    isSaved 
                      ? 'bg-rivstart-pink text-red-800 hover:bg-red-200' 
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                  title={isSaved ? "Saved to Flashcards" : "Save to Flashcards"}
                >
                  {isSaved ? (
                    <CheckCircle className="w-7 h-7 group-hover:scale-110 transition-transform" />
                  ) : (
                    <Heart className="w-7 h-7 group-hover:scale-110 transition-transform" />
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="p-8 grid md:grid-cols-2 gap-8">
        
        {/* Definitions */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-rivstart-green mb-2">
            <BookOpen className="w-5 h-5" />
            <h3 className="font-semibold text-lg uppercase tracking-wide">Definitions</h3>
          </div>
          
          <div className="bg-rivstart-mist/30 p-6 rounded-2xl border border-rivstart-mist hover:border-rivstart-lightGreen transition-colors">
            <div className="mb-5">
              <span className="text-xs font-bold text-rivstart-green uppercase block mb-1 tracking-wider">English</span>
              <p className="text-xl text-slate-800 font-medium leading-relaxed">{data.definitions.english}</p>
            </div>
            <div className="pt-5 border-t border-rivstart-mist">
              <span className="text-xs font-bold text-rivstart-green uppercase block mb-1 tracking-wider">{targetLanguageLabel}</span>
              <p className="text-xl text-slate-800 font-medium leading-relaxed">{data.definitions.secondary}</p>
            </div>
          </div>

          <div>
             <h4 className="text-sm font-bold text-slate-400 uppercase mb-3 tracking-wider">Related Words</h4>
             <div className="flex flex-wrap gap-2">
                {data.compounds.map((c, i) => (
                  <span key={i} className="px-3 py-1.5 bg-white border border-rivstart-mist text-slate-600 rounded-lg text-sm font-medium shadow-sm hover:shadow-md transition-all">
                    {c}
                  </span>
                ))}
             </div>
          </div>
        </div>

        {/* Examples */}
        <div className="space-y-6">
           <div className="flex items-center gap-2 text-rivstart-green mb-2">
            <Share2 className="w-5 h-5" />
            <h3 className="font-semibold text-lg uppercase tracking-wide">Context Usage</h3>
          </div>

          <div className="space-y-4">
            {data.examples.map((ex, idx) => (
              <div key={idx} className="group relative pl-5 border-l-[3px] border-rivstart-mist hover:border-rivstart-lightGreen transition-colors duration-300 py-1">
                <div className="flex items-start justify-between gap-2">
                   <p className="text-lg font-medium text-slate-800 italic mb-1">"{ex.swedish}"</p>
                   <button 
                     onClick={(e) => speakText(ex.swedish, e)}
                     className="text-slate-400 hover:text-rivstart-green transition-colors p-1.5 rounded-full hover:bg-rivstart-lightGreen/30"
                     title="Listen to sentence"
                   >
                     <PlayCircle className="w-5 h-5" />
                   </button>
                </div>
                <p className="text-slate-600 text-sm">{ex.english}</p>
                <p className="text-slate-500 text-xs mt-0.5">{ex.secondary}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grammar & Inflections Section */}
      {(data.inflections || data.grammarNotes) && (
        <div className="bg-rivstart-mist/30 border-t border-rivstart-mist p-8">
          <div className="flex items-center gap-2 text-rivstart-green mb-6">
            <Layers className="w-5 h-5" />
            <h3 className="font-semibold text-lg uppercase tracking-wide">Grammar & Inflections</h3>
          </div>

          {/* Grammar Rule Box */}
          {data.grammarNotes && (
            <div className="bg-rivstart-blue/20 border border-rivstart-blue/40 rounded-xl p-5 mb-8 flex items-start gap-3 shadow-sm">
              <Info className="w-5 h-5 text-slate-600 mt-0.5 shrink-0" />
              <div>
                <h4 className="text-slate-800 font-bold text-sm mb-1 uppercase tracking-wide">Grammar Rule</h4>
                <p className="text-slate-700 text-sm leading-relaxed">{data.grammarNotes}</p>
              </div>
            </div>
          )}

          {/* Dynamic Inflection Tables */}
          <div className="w-full">
            {renderNounTable()}
            {renderVerbTable()}
            {renderAdjectiveTables()}
          </div>
        </div>
      )}
    </div>
  );
};

export default WordCard;