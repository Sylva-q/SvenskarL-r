import React, { useState } from 'react';
import { Layers } from 'lucide-react';

const GrammarReferenceView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'nouns' | 'verbs'>('nouns');

  const tabs = [
    { id: 'nouns', label: 'Nouns (Substantiv)' },
    { id: 'verbs', label: 'Verbs (Verb)' },
  ];

  return (
    <div className="max-w-4xl mx-auto animate-fade-in-up pb-12">
      {/* Header */}
      <div className="text-center mb-10 pt-6">
        <div className="inline-flex items-center justify-center p-4 bg-white rounded-2xl shadow-sm border border-rivstart-lightGreen mb-4">
           <Layers className="w-10 h-10 text-rivstart-green" />
        </div>
        <h2 className="text-3xl font-bold text-slate-800 font-serif">Grammar Reference</h2>
        <p className="text-slate-600 mt-2">Rules and examples for Swedish declensions and conjugations</p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className="bg-white p-1.5 rounded-xl shadow-sm border border-rivstart-mist flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-8 py-3 rounded-lg text-base font-bold transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-rivstart-green text-white shadow-md'
                  : 'text-slate-500 hover:bg-rivstart-mist hover:text-rivstart-green'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-3xl shadow-lg border border-rivstart-mist overflow-hidden p-8 min-h-[500px]">
        
        {/* NOUNS */}
        {activeTab === 'nouns' && (
          <div className="space-y-8">
            <div className="bg-rivstart-mist rounded-xl p-6 border-l-4 border-rivstart-lightGreen">
               <h3 className="font-bold text-rivstart-green text-lg mb-2">Noun Declensions</h3>
               <p className="text-slate-700">Swedish nouns are divided into 5 groups based on their plural ending. The indefinite article (En/Ett) and the word ending usually determine the group.</p>
            </div>

            <div className="grid gap-6">
              {/* Group 1 */}
              <div className="border border-rivstart-mist rounded-xl p-6 hover:border-rivstart-lightGreen transition-colors bg-rivstart-cream/30">
                 <div className="flex justify-between items-center mb-4">
                    <h4 className="text-xl font-bold text-rivstart-green">Group 1: -or</h4>
                    <span className="px-3 py-1 bg-rivstart-pink/40 text-red-900 rounded-full text-xs font-bold uppercase border border-rivstart-pink">En-words</span>
                 </div>
                 <p className="text-sm text-slate-600 mb-4">Mostly 'En' words ending in <strong>-a</strong>. The -a is removed before adding -or.</p>
                 
                 {/* Noun Table Structure */}
                 <div className="bg-white rounded-lg border border-rivstart-mist overflow-hidden">
                    <div className="grid grid-cols-4 bg-rivstart-mist/50 text-xs uppercase font-bold text-slate-600 p-3 gap-2 text-center border-b border-rivstart-mist">
                      <div>Obestämd Sg.</div>
                      <div>Bestämd Sg.</div>
                      <div>Obestämd Pl.</div>
                      <div>Bestämd Pl.</div>
                    </div>
                    <div className="divide-y divide-rivstart-mist text-sm text-slate-800">
                      <div className="grid grid-cols-4 p-3 gap-2 text-center">
                        <div>en flicka</div>
                        <div className="font-medium text-rivstart-green">flickan</div>
                        <div>flickor</div>
                        <div className="font-medium text-rivstart-green">flickorna</div>
                      </div>
                      <div className="grid grid-cols-4 p-3 gap-2 text-center">
                        <div>en blomma</div>
                        <div className="font-medium text-rivstart-green">blomman</div>
                        <div>blommor</div>
                        <div className="font-medium text-rivstart-green">blommorna</div>
                      </div>
                      <div className="grid grid-cols-4 p-3 gap-2 text-center">
                        <div>en klocka</div>
                        <div className="font-medium text-rivstart-green">klockan</div>
                        <div>klockor</div>
                        <div className="font-medium text-rivstart-green">klockorna</div>
                      </div>
                    </div>
                 </div>
              </div>

              {/* Group 2 */}
              <div className="border border-rivstart-mist rounded-xl p-6 hover:border-rivstart-lightGreen transition-colors bg-rivstart-cream/30">
                 <div className="flex justify-between items-center mb-4">
                    <h4 className="text-xl font-bold text-rivstart-green">Group 2: -ar</h4>
                    <span className="px-3 py-1 bg-rivstart-pink/40 text-red-900 rounded-full text-xs font-bold uppercase border border-rivstart-pink">En-words</span>
                 </div>
                 <p className="text-sm text-slate-600 mb-4">Most 'En' words ending in consonants, -e, or -ing.</p>
                 <div className="bg-white rounded-lg border border-rivstart-mist overflow-hidden">
                    <div className="grid grid-cols-4 bg-rivstart-mist/50 text-xs uppercase font-bold text-slate-600 p-3 gap-2 text-center border-b border-rivstart-mist">
                      <div>Obestämd Sg.</div>
                      <div>Bestämd Sg.</div>
                      <div>Obestämd Pl.</div>
                      <div>Bestämd Pl.</div>
                    </div>
                    <div className="divide-y divide-rivstart-mist text-sm text-slate-800">
                      <div className="grid grid-cols-4 p-3 gap-2 text-center">
                        <div>en bil</div>
                        <div className="font-medium text-rivstart-green">bilen</div>
                        <div>bilar</div>
                        <div className="font-medium text-rivstart-green">bilarna</div>
                      </div>
                      <div className="grid grid-cols-4 p-3 gap-2 text-center">
                        <div>en tidning</div>
                        <div className="font-medium text-rivstart-green">tidningen</div>
                        <div>tidningar</div>
                        <div className="font-medium text-rivstart-green">tidningarna</div>
                      </div>
                      <div className="grid grid-cols-4 p-3 gap-2 text-center">
                        <div>en pojke</div>
                        <div className="font-medium text-rivstart-green">pojken</div>
                        <div>pojkar</div>
                        <div className="font-medium text-rivstart-green">pojkarna</div>
                      </div>
                    </div>
                 </div>
              </div>

              {/* Group 3 */}
              <div className="border border-rivstart-mist rounded-xl p-6 hover:border-rivstart-lightGreen transition-colors bg-rivstart-cream/30">
                 <div className="flex justify-between items-center mb-4">
                    <h4 className="text-xl font-bold text-rivstart-green">Group 3: -er</h4>
                    <span className="px-3 py-1 bg-rivstart-blue text-slate-700 rounded-full text-xs font-bold uppercase border border-slate-200">En & Ett</span>
                 </div>
                 <p className="text-sm text-slate-600 mb-4">Many international words, words ending in specific suffixes, and some irregulars (often with vowel change).</p>
                 <div className="bg-white rounded-lg border border-rivstart-mist overflow-hidden">
                    <div className="grid grid-cols-4 bg-rivstart-mist/50 text-xs uppercase font-bold text-slate-600 p-3 gap-2 text-center border-b border-rivstart-mist">
                      <div>Obestämd Sg.</div>
                      <div>Bestämd Sg.</div>
                      <div>Obestämd Pl.</div>
                      <div>Bestämd Pl.</div>
                    </div>
                    <div className="divide-y divide-rivstart-mist text-sm text-slate-800">
                      <div className="grid grid-cols-4 p-3 gap-2 text-center">
                        <div>en telefon</div>
                        <div className="font-medium text-rivstart-green">telefonen</div>
                        <div>telefoner</div>
                        <div className="font-medium text-rivstart-green">telefonerna</div>
                      </div>
                      <div className="grid grid-cols-4 p-3 gap-2 text-center">
                        <div>en stad</div>
                        <div className="font-medium text-rivstart-green">staden</div>
                        <div>städer</div>
                        <div className="font-medium text-rivstart-green">städerna</div>
                      </div>
                      <div className="grid grid-cols-4 p-3 gap-2 text-center">
                        <div>ett land</div>
                        <div className="font-medium text-rivstart-green">landet</div>
                        <div>länder</div>
                        <div className="font-medium text-rivstart-green">länderna</div>
                      </div>
                    </div>
                 </div>
              </div>

               {/* Group 4 */}
              <div className="border border-rivstart-mist rounded-xl p-6 hover:border-rivstart-lightGreen transition-colors bg-rivstart-cream/30">
                 <div className="flex justify-between items-center mb-4">
                    <h4 className="text-xl font-bold text-rivstart-green">Group 4: -n</h4>
                    <span className="px-3 py-1 bg-rivstart-lightGreen/40 text-green-900 rounded-full text-xs font-bold uppercase border border-rivstart-lightGreen">Ett-words</span>
                 </div>
                 <p className="text-sm text-slate-600 mb-4">'Ett' words ending in a <strong>vowel</strong>.</p>
                 <div className="bg-white rounded-lg border border-rivstart-mist overflow-hidden">
                    <div className="grid grid-cols-4 bg-rivstart-mist/50 text-xs uppercase font-bold text-slate-600 p-3 gap-2 text-center border-b border-rivstart-mist">
                      <div>Obestämd Sg.</div>
                      <div>Bestämd Sg.</div>
                      <div>Obestämd Pl.</div>
                      <div>Bestämd Pl.</div>
                    </div>
                    <div className="divide-y divide-rivstart-mist text-sm text-slate-800">
                      <div className="grid grid-cols-4 p-3 gap-2 text-center">
                        <div>ett äpple</div>
                        <div className="font-medium text-rivstart-green">äpplet</div>
                        <div>äpplen</div>
                        <div className="font-medium text-rivstart-green">äpplena</div>
                      </div>
                      <div className="grid grid-cols-4 p-3 gap-2 text-center">
                        <div>ett kvitto</div>
                        <div className="font-medium text-rivstart-green">kvittot</div>
                        <div>kvitton</div>
                        <div className="font-medium text-rivstart-green">kvittona</div>
                      </div>
                      <div className="grid grid-cols-4 p-3 gap-2 text-center">
                        <div>ett bi</div>
                        <div className="font-medium text-rivstart-green">biet</div>
                        <div>bin</div>
                        <div className="font-medium text-rivstart-green">bina</div>
                      </div>
                    </div>
                 </div>
              </div>

               {/* Group 5 */}
              <div className="border border-rivstart-mist rounded-xl p-6 hover:border-rivstart-lightGreen transition-colors bg-rivstart-cream/30">
                 <div className="flex justify-between items-center mb-4">
                    <h4 className="text-xl font-bold text-rivstart-green">Group 5: No Change</h4>
                    <span className="px-3 py-1 bg-rivstart-blue text-slate-700 rounded-full text-xs font-bold uppercase border border-slate-200">Ett & En</span>
                 </div>
                 <p className="text-sm text-slate-600 mb-4">'Ett' words ending in a consonant, and 'En' words ending in <strong>-are</strong> or <strong>-er</strong>.</p>
                 <div className="bg-white rounded-lg border border-rivstart-mist overflow-hidden">
                    <div className="grid grid-cols-4 bg-rivstart-mist/50 text-xs uppercase font-bold text-slate-600 p-3 gap-2 text-center border-b border-rivstart-mist">
                      <div>Obestämd Sg.</div>
                      <div>Bestämd Sg.</div>
                      <div>Obestämd Pl.</div>
                      <div>Bestämd Pl.</div>
                    </div>
                    <div className="divide-y divide-rivstart-mist text-sm text-slate-800">
                      <div className="grid grid-cols-4 p-3 gap-2 text-center">
                        <div>ett hus</div>
                        <div className="font-medium text-rivstart-green">huset</div>
                        <div>hus</div>
                        <div className="font-medium text-rivstart-green">husen</div>
                      </div>
                      <div className="grid grid-cols-4 p-3 gap-2 text-center">
                        <div>ett bord</div>
                        <div className="font-medium text-rivstart-green">bordet</div>
                        <div>bord</div>
                        <div className="font-medium text-rivstart-green">borden</div>
                      </div>
                      <div className="grid grid-cols-4 p-3 gap-2 text-center">
                        <div>en lärare</div>
                        <div className="font-medium text-rivstart-green">läraren</div>
                        <div>lärare</div>
                        <div className="font-medium text-rivstart-green">lärarna</div>
                      </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        )}

        {/* VERBS */}
        {activeTab === 'verbs' && (
          <div className="space-y-8">
            <div className="bg-rivstart-mist rounded-xl p-6 border-l-4 border-rivstart-pink">
               <h3 className="font-bold text-red-800 text-lg mb-2">Verb Conjugations</h3>
               <p className="text-slate-700">Verbs are categorized by how they form the Present tense. The Imperative form is usually the stem.</p>
            </div>

            <div className="grid gap-6">
               {/* Group 1 */}
               <div className="border border-rivstart-mist rounded-xl p-6 hover:border-rivstart-pink transition-colors bg-rivstart-cream/30">
                 <div className="flex justify-between items-center mb-4">
                    <h4 className="text-xl font-bold text-red-800">Group 1: -ar</h4>
                 </div>
                 <p className="text-sm text-slate-600 mb-4">Imperative ends in <strong>-a</strong>. Present adds <strong>-r</strong>. Past adds <strong>-de</strong>. (Most common group).</p>
                 
                 <div className="bg-white rounded-lg border border-rivstart-mist overflow-hidden">
                    <div className="grid grid-cols-4 bg-rivstart-mist/50 text-xs uppercase font-bold text-slate-600 p-3 gap-2 text-center border-b border-rivstart-mist">
                      <div>Infinitiv</div>
                      <div>Presens</div>
                      <div>Preteritum</div>
                      <div>Supinum</div>
                    </div>
                    <div className="divide-y divide-rivstart-mist text-sm text-slate-800">
                      <div className="grid grid-cols-4 p-3 gap-2 text-center">
                        <div>att tala</div>
                        <div className="font-medium text-red-700">talar</div>
                        <div>talade</div>
                        <div>talat</div>
                      </div>
                      <div className="grid grid-cols-4 p-3 gap-2 text-center">
                        <div>att jobba</div>
                        <div className="font-medium text-red-700">jobbar</div>
                        <div>jobbade</div>
                        <div>jobbat</div>
                      </div>
                      <div className="grid grid-cols-4 p-3 gap-2 text-center">
                        <div>att fråga</div>
                        <div className="font-medium text-red-700">frågar</div>
                        <div>frågade</div>
                        <div>frågat</div>
                      </div>
                    </div>
                 </div>
              </div>

              {/* Group 2a */}
               <div className="border border-rivstart-mist rounded-xl p-6 hover:border-rivstart-pink transition-colors bg-rivstart-cream/30">
                 <div className="flex justify-between items-center mb-4">
                    <h4 className="text-xl font-bold text-red-800">Group 2a: -er (Voiced)</h4>
                 </div>
                 <p className="text-sm text-slate-600 mb-4">Imperative ends in a voiced consonant. Present adds <strong>-er</strong>. Past adds <strong>-de</strong>.</p>
                 <div className="bg-white rounded-lg border border-rivstart-mist overflow-hidden">
                    <div className="grid grid-cols-4 bg-rivstart-mist/50 text-xs uppercase font-bold text-slate-600 p-3 gap-2 text-center border-b border-rivstart-mist">
                      <div>Infinitiv</div>
                      <div>Presens</div>
                      <div>Preteritum</div>
                      <div>Supinum</div>
                    </div>
                    <div className="divide-y divide-rivstart-mist text-sm text-slate-800">
                      <div className="grid grid-cols-4 p-3 gap-2 text-center">
                        <div>att ringa</div>
                        <div className="font-medium text-red-700">ringer</div>
                        <div>ringde</div>
                        <div>ringt</div>
                      </div>
                      <div className="grid grid-cols-4 p-3 gap-2 text-center">
                        <div>att använda</div>
                        <div className="font-medium text-red-700">använder</div>
                        <div>använde</div>
                        <div>använt</div>
                      </div>
                      <div className="grid grid-cols-4 p-3 gap-2 text-center">
                        <div>att stänga</div>
                        <div className="font-medium text-red-700">stänger</div>
                        <div>stängde</div>
                        <div>stängt</div>
                      </div>
                    </div>
                 </div>
              </div>

              {/* Group 2b */}
               <div className="border border-rivstart-mist rounded-xl p-6 hover:border-rivstart-pink transition-colors bg-rivstart-cream/30">
                 <div className="flex justify-between items-center mb-4">
                    <h4 className="text-xl font-bold text-red-800">Group 2b: -er (Unvoiced)</h4>
                 </div>
                 <p className="text-sm text-slate-600 mb-4">Imperative ends in unvoiced consonant (k, p, s, t, x). Present adds <strong>-er</strong>. Past adds <strong>-te</strong>.</p>
                 <div className="bg-white rounded-lg border border-rivstart-mist overflow-hidden">
                    <div className="grid grid-cols-4 bg-rivstart-mist/50 text-xs uppercase font-bold text-slate-600 p-3 gap-2 text-center border-b border-rivstart-mist">
                      <div>Infinitiv</div>
                      <div>Presens</div>
                      <div>Preteritum</div>
                      <div>Supinum</div>
                    </div>
                    <div className="divide-y divide-rivstart-mist text-sm text-slate-800">
                      <div className="grid grid-cols-4 p-3 gap-2 text-center">
                        <div>att köpa</div>
                        <div className="font-medium text-red-700">köper</div>
                        <div>köpte</div>
                        <div>köpt</div>
                      </div>
                      <div className="grid grid-cols-4 p-3 gap-2 text-center">
                        <div>att läsa</div>
                        <div className="font-medium text-red-700">läser</div>
                        <div>läste</div>
                        <div>läst</div>
                      </div>
                      <div className="grid grid-cols-4 p-3 gap-2 text-center">
                        <div>att tycka</div>
                        <div className="font-medium text-red-700">tycker</div>
                        <div>tyckte</div>
                        <div>tyckt</div>
                      </div>
                    </div>
                 </div>
              </div>

               {/* Group 3 */}
               <div className="border border-rivstart-mist rounded-xl p-6 hover:border-rivstart-pink transition-colors bg-rivstart-cream/30">
                 <div className="flex justify-between items-center mb-4">
                    <h4 className="text-xl font-bold text-red-800">Group 3: -r (Short Verbs)</h4>
                 </div>
                 <p className="text-sm text-slate-600 mb-4">Stem ends in vowel (other than -a). Present adds <strong>-r</strong>. Past adds <strong>-dde</strong>.</p>
                 <div className="bg-white rounded-lg border border-rivstart-mist overflow-hidden">
                    <div className="grid grid-cols-4 bg-rivstart-mist/50 text-xs uppercase font-bold text-slate-600 p-3 gap-2 text-center border-b border-rivstart-mist">
                      <div>Infinitiv</div>
                      <div>Presens</div>
                      <div>Preteritum</div>
                      <div>Supinum</div>
                    </div>
                    <div className="divide-y divide-rivstart-mist text-sm text-slate-800">
                      <div className="grid grid-cols-4 p-3 gap-2 text-center">
                        <div>att bo</div>
                        <div className="font-medium text-red-700">bor</div>
                        <div>bodde</div>
                        <div>bott</div>
                      </div>
                      <div className="grid grid-cols-4 p-3 gap-2 text-center">
                        <div>att tro</div>
                        <div className="font-medium text-red-700">tror</div>
                        <div>trodde</div>
                        <div>trott</div>
                      </div>
                      <div className="grid grid-cols-4 p-3 gap-2 text-center">
                        <div>att må</div>
                        <div className="font-medium text-red-700">mår</div>
                        <div>mådde</div>
                        <div>mått</div>
                      </div>
                    </div>
                 </div>
              </div>

               {/* Group 4 */}
               <div className="border border-rivstart-mist rounded-xl p-6 hover:border-rivstart-pink transition-colors bg-rivstart-cream/30">
                 <div className="flex justify-between items-center mb-4">
                    <h4 className="text-xl font-bold text-red-800">Group 4: Strong Verbs</h4>
                 </div>
                 <p className="text-sm text-slate-600 mb-4">Irregular pattern. Vowel usually changes in the Past tense.</p>
                 <div className="bg-white rounded-lg border border-rivstart-mist overflow-hidden">
                    <div className="grid grid-cols-4 bg-rivstart-mist/50 text-xs uppercase font-bold text-slate-600 p-3 gap-2 text-center border-b border-rivstart-mist">
                      <div>Infinitiv</div>
                      <div>Presens</div>
                      <div>Preteritum</div>
                      <div>Supinum</div>
                    </div>
                    <div className="divide-y divide-rivstart-mist text-sm text-slate-800">
                      <div className="grid grid-cols-4 p-3 gap-2 text-center">
                        <div>att dricka</div>
                        <div className="font-medium text-red-700">dricker</div>
                        <div>drack</div>
                        <div>druckit</div>
                      </div>
                      <div className="grid grid-cols-4 p-3 gap-2 text-center">
                        <div>att äta</div>
                        <div className="font-medium text-red-700">äter</div>
                        <div>åt</div>
                        <div>ätit</div>
                      </div>
                      <div className="grid grid-cols-4 p-3 gap-2 text-center">
                        <div>att sitta</div>
                        <div className="font-medium text-red-700">sitter</div>
                        <div>satt</div>
                        <div>suttit</div>
                      </div>
                    </div>
                 </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GrammarReferenceView;