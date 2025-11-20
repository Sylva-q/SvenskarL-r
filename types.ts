export interface ExampleSentence {
  swedish: string;
  english: string;
  secondary: string;
}

export interface NounForms {
  indefiniteSingular: string;
  definiteSingular: string;
  indefinitePlural: string;
  definitePlural: string;
}

export interface VerbForms {
  imperative: string;
  infinitive: string;
  present: string;
  past: string;
  supine: string;
}

export interface AdjectiveForms {
  // Comparison
  positive: string;
  comparative: string;
  superlative: string;
  // Declension
  indefiniteEn: string;
  indefiniteEtt: string;
  indefinitePlural: string;
  definite: string;
}

export interface WordDetails {
  word: string;
  ipa: string;
  gender: 'en' | 'ett' | 'n/a';
  partOfSpeech: string;
  definitions: {
    english: string;
    secondary: string;
  };
  examples: ExampleSentence[];
  compounds: string[];
  // New fields for grammar
  inflections?: {
    noun?: NounForms;
    verb?: VerbForms;
    adjective?: AdjectiveForms;
  };
  grammarNotes?: string;
}

export interface SearchHistoryItem extends WordDetails {
  timestamp: number;
}

export interface LanguageOption {
  code: string;
  label: string;
}

export interface VocabularyItem {
  swedish: string;
  english: string;
  secondary: string;
}

export interface GrammarPoint {
  topic: string;
  explanationSv: string;
  explanationEn: string;
}

export interface ChapterContent {
  chapterNumber: number;
  title: string;
  summarySv: string;
  summaryEn: string;
  grammar: GrammarPoint[];
  vocabulary: VocabularyItem[];
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}