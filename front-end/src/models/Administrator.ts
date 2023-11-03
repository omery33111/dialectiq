import { AmericanQuestion, AmericanResult } from "./American";
import { AmericanAnswer } from "./AmericanAnswer";
import { AmericanSubject } from "./AmericanSubject";
import { Blog } from "./Blog";
import { Callback } from "./Callback";
import { SentenceQuestion } from "./Sentence";
import { VoiceQuestion } from "./Voice";



export interface AdministratorState {
    blogs: Blog[];
    singleBlog: Blog;

    americans: AmericanQuestion[];
    american: AmericanQuestion;

    subjectAmericans: AmericanQuestion[];
    subjects: AmericanSubject[];
    subject: AmericanSubject;

    americanAnswer: AmericanAnswer;
    americanAnswers: AmericanAnswer[];

    sentence: SentenceQuestion;
    sentences: SentenceQuestion[];

    voice: VoiceQuestion;
    voices: VoiceQuestion[];

    callbacks: Callback[];

    americanAmount: number;
    sentenceAmount: number;
    voiceAmount: number;
    callbackAmount: number;

    isLoading: boolean;
    isError: boolean;

    americanResult: AmericanResult[];
  };