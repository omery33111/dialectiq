import { SentenceAnswer } from "./SentenceAnswer";
import { SentenceSubject } from "./SentenceSubject";



export interface SentenceQuestion {
    id: string;
    question: string;
    correct_answer: string;
    subject: {id: string, subject_name: string}
    }
  
  
    export interface SentenceState {
      sentences: SentenceQuestion[]
      sentence: SentenceQuestion

      subjectSentences: SentenceQuestion[]
      subjects: SentenceSubject[];
      subject: SentenceSubject;

      sentenceAnswer: SentenceAnswer;
      sentenceAnswers: SentenceAnswer[];

      selectedAnswers: boolean;
    };