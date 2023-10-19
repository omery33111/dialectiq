


export interface SentenceAnswer {
    id: string;
    user: number;
    user_answer: string
    question: number;
    }
  
  
    export interface SentenceState {
      sentenceAnswer: SentenceAnswer;
      sentenceAnswers: SentenceAnswer[];

      selectedAnswers: boolean;
    };