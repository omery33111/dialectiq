import { SentenceQuestion } from "./Sentence";



export interface SentenceSubject {
    id: string;
    description: string;
    subject_name: string;
    picture: string
    }
  
  
    export interface SentenceSubjectState {
      subjectSentences: SentenceQuestion[]
      subjects: SentenceSubject[];
      subject: SentenceSubject;
    };
