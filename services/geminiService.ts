import { GoogleGenAI, Type, Schema } from "@google/genai";
import { WordDetails, ChapterContent } from "../types";

// Ensure API key is available
const apiKey = process.env.API_KEY;
if (!apiKey) {
  console.error("API_KEY is missing from environment variables.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || 'DUMMY_KEY' });

const wordSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    word: { type: Type.STRING, description: "The Swedish word in its basic form" },
    ipa: { type: Type.STRING, description: "IPA pronunciation guide" },
    gender: { type: Type.STRING, enum: ["en", "ett", "n/a"], description: "Grammatical gender (en, ett, or n/a for non-nouns)" },
    partOfSpeech: { type: Type.STRING, description: "Part of speech (noun, verb, adjective, etc.)" },
    definitions: {
      type: Type.OBJECT,
      properties: {
        english: { type: Type.STRING, description: "Definition in English" },
        secondary: { type: Type.STRING, description: "Definition in the requested secondary language" },
      },
      required: ["english", "secondary"],
    },
    examples: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          swedish: { type: Type.STRING, description: "Example sentence in Swedish" },
          english: { type: Type.STRING, description: "English translation of the example" },
          secondary: { type: Type.STRING, description: "Secondary language translation of the example" },
        },
        required: ["swedish", "english", "secondary"],
      },
    },
    compounds: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of 3 common compound words or related phrases",
    },
    inflections: {
      type: Type.OBJECT,
      properties: {
        noun: {
          type: Type.OBJECT,
          properties: {
            indefiniteSingular: { type: Type.STRING },
            definiteSingular: { type: Type.STRING },
            indefinitePlural: { type: Type.STRING },
            definitePlural: { type: Type.STRING },
          },
          description: "Only if the word is a noun. The 4 declension forms.",
        },
        verb: {
          type: Type.OBJECT,
          properties: {
            imperative: { type: Type.STRING },
            infinitive: { type: Type.STRING },
            present: { type: Type.STRING },
            past: { type: Type.STRING },
            supine: { type: Type.STRING },
          },
          description: "Only if the word is a verb. The 5 conjugation forms.",
        },
        adjective: {
          type: Type.OBJECT,
          properties: {
            positive: { type: Type.STRING },
            comparative: { type: Type.STRING },
            superlative: { type: Type.STRING },
            indefiniteEn: { type: Type.STRING },
            indefiniteEtt: { type: Type.STRING },
            indefinitePlural: { type: Type.STRING },
            definite: { type: Type.STRING },
          },
          description: "Only if the word is an adjective. Comparison and declension forms.",
        }
      },
      description: "Morphological forms based on part of speech. Only populate the relevant sub-object.",
    },
    grammarNotes: {
      type: Type.STRING,
      description: "A brief explanation of the conjugation/declension rules for this specific word (e.g., 'Group 1 verb ending in -ar', 'Class 3 noun')."
    }
  },
  required: ["word", "ipa", "gender", "partOfSpeech", "definitions", "examples", "compounds"],
};

const chapterSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    chapterNumber: { type: Type.INTEGER, description: "The chapter number" },
    title: { type: Type.STRING, description: "The title or main theme of the chapter" },
    summary: { type: Type.STRING, description: "A concise summary of what is covered in this chapter" },
    grammar: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          topic: { type: Type.STRING, description: "The grammar topic name (e.g., Present Tense, Word Order)" },
          explanation: { type: Type.STRING, description: "A brief explanation of the grammar rule" }
        },
        required: ["topic", "explanation"]
      }
    },
    vocabulary: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          swedish: { type: Type.STRING, description: "The Swedish word" },
          english: { type: Type.STRING, description: "English translation" },
          secondary: { type: Type.STRING, description: "Secondary language translation" }
        },
        required: ["swedish", "english", "secondary"]
      }
    }
  },
  required: ["chapterNumber", "title", "summary", "grammar", "vocabulary"]
};

export const lookupSwedishWord = async (word: string, targetLanguage: string): Promise<WordDetails> => {
  try {
    const model = "gemini-2.5-flash";
    const prompt = `
      You are an expert Swedish language teacher.
      Analyze the Swedish word: "${word}".
      
      Provide the following:
      1. The lemma (base form) of the word.
      2. IPA pronunciation.
      3. Grammatical gender ('en' or 'ett'). If not a noun, use 'n/a'.
      4. Part of speech (e.g., noun, verb, adjective).
      5. Definition in English.
      6. Definition in ${targetLanguage}.
      7. Three distinct example sentences showing different usage contexts.
         - Provide the Swedish sentence.
         - Provide the English translation.
         - Provide the ${targetLanguage} translation.
      8. Three common compound words or related idioms involving this word.
      9. Inflection/Morphology details:
         - If it is a NOUN: Provide indefinite/definite singular/plural forms.
         - If it is a VERB: Provide imperative, infinitive, present, past (preteritum), and supine forms.
         - If it is an ADJECTIVE: Provide comparison forms (positive, comparative, superlative) AND declension forms (en, ett, plural, definite).
      10. Grammar Notes: Explain the specific rule pattern this word follows (e.g. "Group 2b verb", "Irregular adjective", "Plural ending in -or").

      Return the result strictly in JSON format matching the schema.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: wordSchema,
        temperature: 0.3, 
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response text received from Gemini.");
    }

    const data = JSON.parse(text) as WordDetails;
    return data;
  } catch (error) {
    console.error("Error looking up word:", error);
    throw error;
  }
};

export const getRivstartChapter = async (chapter: number, chapterTitle: string, targetLanguage: string): Promise<ChapterContent> => {
  try {
    const model = "gemini-2.5-flash";
    const prompt = `
      You are an expert Swedish language tutor familiar with the textbook "Rivstart A1+A2 (3rd Edition)".
      
      Generate a study guide for Chapter ${chapter}: "${chapterTitle}".
      
      Include:
      1. A brief summary of the communicative goals (what the student learns to do) in this specific chapter theme.
      2. Key Grammar Points introduced in this specific chapter (3-5 points).
      3. A Vocabulary List of 10-15 important words relevant to the theme "${chapterTitle}".
         - Translate these to English and ${targetLanguage}.
      
      Return the result strictly in JSON format matching the schema.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: chapterSchema,
        temperature: 0.4,
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response text received from Gemini.");
    }

    const data = JSON.parse(text) as ChapterContent;
    return data;
  } catch (error) {
    console.error("Error fetching chapter:", error);
    throw error;
  }
}