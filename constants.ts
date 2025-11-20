import { LanguageOption } from './types';

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'Chinese (Simplified)', label: 'Chinese (中文)' },
  { code: 'Spanish', label: 'Spanish (Español)' },
  { code: 'French', label: 'French (Français)' },
  { code: 'German', label: 'German (Deutsch)' },
  { code: 'Arabic', label: 'Arabic (العربية)' },
  { code: 'Japanese', label: 'Japanese (日本語)' },
  { code: 'Hindi', label: 'Hindi (हिन्दी)' },
  { code: 'Russian', label: 'Russian (Русский)' },
  { code: 'Portuguese', label: 'Portuguese (Português)' },
];

export const DEFAULT_TARGET_LANGUAGE = 'Chinese (Simplified)';

export const POS_COLORS: Record<string, string> = {
  'noun': '#0f766e', // Rivstart Green
  'verb': '#b91c1c', // Deep Red
  'adjective': '#ca8a04', // Dark Yellow/Gold
  'adverb': '#d97706',
  'pronoun': '#7c3aed',
  'preposition': '#db2777',
  'conjunction': '#4b5563',
  'other': '#64748b'
};

export const RIVSTART_CHAPTERS = [
  { id: 1, title: "Kapitel 1: Klassrum (Classroom)" },
  { id: 2, title: "Kapitel 2: Tjena! (Greetings & Well-being)" },
  { id: 3, title: "Kapitel 3: Räkna & Tid (Numbers & Time)" },
  { id: 4, title: "Kapitel 4: Fika (Coffee & Pastries)" },
  { id: 5, title: "Kapitel 5: Fritid (Leisure)" },
  { id: 6, title: "Kapitel 6: Familj & Släkt (Family)" },
  { id: 7, title: "Kapitel 7: Kläder & Shopping (Clothes)" },
  { id: 8, title: "Kapitel 8: Väder & Årstider (Weather)" },
  { id: 9, title: "Kapitel 9: Transport (Travel)" },
  { id: 10, title: "Kapitel 10: Geografi (Geography)" },
  { id: 11, title: "Kapitel 11: Vänskap (Friendship)" },
  { id: 12, title: "Kapitel 12: Mat & Dryck (Food)" },
  { id: 13, title: "Kapitel 13: Skola & Utbildning (School)" },
  { id: 14, title: "Kapitel 14: Arbete & Semester (Work & Vacation)" },
  { id: 15, title: "Kapitel 15: Personlighet (Personality)" },
  { id: 16, title: "Kapitel 16: Utbildningssystem (Education System)" },
  { id: 17, title: "Kapitel 17: Boende & Hus (Housing)" },
  { id: 18, title: "Kapitel 18: Arbetsliv & Ekonomi (Working Life)" },
  { id: 19, title: "Kapitel 19: Kropp & Hälsa (Body & Health)" },
  { id: 20, title: "Kapitel 20: Nyheter & Samhälle (News & Society)" },
];