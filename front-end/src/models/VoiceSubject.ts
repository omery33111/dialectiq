import { VoiceQuestion } from "./Voice";



export interface VoiceSubject {
    id: string;
    description: string;
    subject_name: string;
    picture: string
    }
  
  
    export interface VoiceSubjectState {
      subjectVoices: VoiceQuestion[];
      subjects: VoiceSubject[];
      subject: VoiceSubject;

      isLoading: boolean;
      isError: boolean;
    };
