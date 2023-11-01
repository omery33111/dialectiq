


export interface VoiceAnswer {
    id: string;
    user: number;
    user_answer: string
    question: number;
    }
  
  
    export interface VoiceState {
      voiceAnswer: VoiceAnswer;
      voiceAnswers: VoiceAnswer[];

      selectedAnswers: boolean;
    };