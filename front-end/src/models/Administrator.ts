import { AmericanQuestion } from "./American";
import { AmericanAnswer } from "./AmericanAnswer";
import { AmericanSubject } from "./AmericanSubject";
import { Blog } from "./Blog";



export interface AdministratorState {
    blogs: Blog[]
    singleBlog: Blog

    americans: AmericanQuestion[]
    american: AmericanQuestion

    subjectAmericans: AmericanQuestion[]
    subjects: AmericanSubject[];
    subject: AmericanSubject;

    americanAnswer: AmericanAnswer
    americanAnswers: AmericanAnswer[]
  };