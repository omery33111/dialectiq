import { AmericanQuestion } from "./American";



export interface AmericanSubject {
    id: string;
    description: string;
    subject_name: string;
    picture: string
    }
  
  
    export interface AmericanSubjectState {
      subjectAmericans: AmericanQuestion[]
      subjects: AmericanSubject[];
      subject: AmericanSubject;

      isLoading: boolean;
      isError: boolean;
    };
