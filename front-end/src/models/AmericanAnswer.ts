


export interface AmericanAnswer {
    id: string;
    user: number;
    user_answer: number
    question: number;
    }
  
  
    export interface AmericanState {
      americanAnswer: AmericanAnswer;
      americanAnswers: AmericanAnswer[];

      selectedAnswers: boolean;
    };