import { SentenceQuestion } from "./Sentence";
import { VoiceSubject } from "./VoiceSubject";



export interface VoiceQuestion {
    id: string;
    question: string;
    correct_answer: string;
    subject: {id: string, subject_name: string}
    }
  
  
    export interface VoiceState {
      voices: VoiceQuestion[]
      voice: VoiceQuestion

      subjectVoices: SentenceQuestion[]
      subjects: VoiceSubject[];
      subject: VoiceSubject;

      // sentenceAnswer: SentenceAnswer;
      // sentenceAnswers: SentenceAnswer[];

      // selectedAnswers: boolean;
    };