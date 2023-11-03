import { AmericanAnswer } from "./AmericanAnswer";
import { AmericanSubject } from "./AmericanSubject";



export interface AmericanQuestion {
    id: string;
    question: string;
    answer1: string;
    answer2: string;
    answer3: string;
    answer4: string;
    correct_answer: number;
    subject: {id: string, subject_name: string}
    }
  

export interface AmericanResult {
  id: string;
  question: string;
  user_answer: string;
}


    export interface AmericanState {
      americans: AmericanQuestion[]
      american: AmericanQuestion

      subjectAmericans: AmericanQuestion[]
      subjects: AmericanSubject[];
      subject: AmericanSubject;

      americanAnswer: AmericanAnswer;
      americanAnswers: AmericanAnswer[];

      selectedAnswers: boolean;

      americanSubjectAmount: number;

      isLoading: boolean;
      isError: boolean;

      americanResult: AmericanResult[];
    };