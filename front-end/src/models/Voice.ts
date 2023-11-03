import { SentenceQuestion } from "./Sentence";
import { VoiceAnswer } from "./VoiceAnswer";
import { VoiceSubject } from "./VoiceSubject";



export interface VoiceQuestion {
    id: string;
    question: string;
    correct_answer: string;
    subject: {id: string, subject_name: string}
    }
  

export interface VoiceResult {
  id: string;
  question: string;
  user_answer: string;
}


    export interface VoiceState {
      voices: VoiceQuestion[]
      voice: VoiceQuestion

      subjectVoices: SentenceQuestion[]
      subjects: VoiceSubject[];
      subject: VoiceSubject;

      voiceAnswer: VoiceAnswer;
      voiceAnswers: VoiceAnswer[];

      // selectedAnswers: boolean;

      voiceSubjectAmount: number;

      isLoading: boolean;
      isError: boolean;

      voiceResult: VoiceResult[]
    };