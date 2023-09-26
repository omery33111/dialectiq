import { AmericanQuestion } from "./American";



export interface AmericanSubject {
    id: string;
    subject_name: string;
    }
  
  
    export interface AmericanSubjectState {
      subjectAmericans: AmericanQuestion[]
      subjects: AmericanSubject[];
      subject: AmericanSubject;
    };
