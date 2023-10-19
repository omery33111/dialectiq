import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getSentenceSubjects, getSentences, getSentencesOfSubject, postAnswerSentence } from './sentenceAPI';
import { SentenceState } from '../../models/Sentence';



const initialState: SentenceState = {
  sentences: [],
  sentence: {
    subject: {id: "", subject_name: ""}, id: "", question: "", correct_answer: ""},
  
  subject: { id: "", description: "", subject_name: "", picture: ""},
  subjects: [{ id: "", description: "", subject_name: "", picture: ""}],
  subjectSentences: [],

  sentenceAnswer: {id: "", user: 0, user_answer: "", question: 0},
  sentenceAnswers: [],
  
  selectedAnswers: false
};



export const postAnswerSentenceAsync = createAsyncThunk(
  'sentence/postAnswerSentence',
  async (data: { sentenceAnswerData: any, answers: { user_answer: number, question: number }[] }) => {
      const response = await postAnswerSentence(data.sentenceAnswerData, data.answers);
      return response.data;
  }
);



export const getSentencesAsync = createAsyncThunk('sentence/getSentences', async () => {
  const response = await getSentences();
  return response.data;
});



export const getSentenceSubjectsAsync = createAsyncThunk(
  'sentence/getSentenceSubjects',
  async () => {
    const response = await getSentenceSubjects();
    return response.data;
  }
);



export const getSentencesOfSubjectAsync = createAsyncThunk(
  'sentence/getSentencesOfSubject',
  async (id: string) => {
    const response = await getSentencesOfSubject(id);
    return response.data;
  }
);



export const sentenceSlice = createSlice({
  name: 'sentence',
  initialState,
  reducers: {
    saveAnswers: (state, action) => {
      state.selectedAnswers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSentencesAsync.fulfilled, (state, action) => {
        state.sentences = action.payload;
      })

      .addCase(getSentenceSubjectsAsync.fulfilled, (state, action) => {
        state.subjects = action.payload;
      })

      .addCase(getSentencesOfSubjectAsync.fulfilled, (state, action) =>
      {
        state.subjectSentences = action.payload
      })

      .addCase(postAnswerSentenceAsync.fulfilled, (state, action) => {
        state.sentenceAnswers = [...state.sentenceAnswers, action.payload];
      })
  },
});



export const { saveAnswers } = sentenceSlice.actions;

export const selectSentences = (state: RootState) => state.sentence.sentences;
export const selectSingleSentence = (state: RootState) => state.sentence.sentence;

export const selectAllSubjectsOfSentence = (state: RootState) => state.sentence.subjects;
// export const selectSingleSubjectOfAmerican = (state: RootState) => state.sentence.subject;
export const selectSubjectSentences = (state: RootState) => state.sentence.subjectSentences;

// export const selectAmericanAnswers = (state: RootState) => state.sentence.americanAnswers;
// export const selectSingleAmericanAnswer = (state: RootState) => state.sentence.americanAnswer;


export default sentenceSlice.reducer;
