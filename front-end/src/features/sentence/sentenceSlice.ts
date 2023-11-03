import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getPagedSentenceSubjects, getRightSentences, getSentenceSubjects, getSentenceSubjectsAmount, getSentences, getSentencesOfSubject, postAnswerSentence } from './sentenceAPI';
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
  
  selectedAnswers: false,

  sentenceSubjectAmount: 0,

  isLoading: false,
  isError: false,

  sentenceResult: []
};



export const getRightSentencesAsync = createAsyncThunk(
  "sentence/getRightSentences",
  async () => {
    const response = await getRightSentences();
    return response;
  }
);



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



export const getPagedSentenceSubjectsAsync = createAsyncThunk(
  "sentence/getPagedSentenceSubjects",
  async (page: number) => {
    const response = await getPagedSentenceSubjects(page);
    return response;
  }
);


export const getSentenceSubjectsAmountAsync = createAsyncThunk(
  "sentence/getSentenceSubjectsAmount",
  async () => {
    const response = await getSentenceSubjectsAmount();
    return response;
  }
);



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

      .addCase(getRightSentencesAsync.fulfilled, (state, action) => {
        state.sentenceResult = action.payload.data
      })

      .addCase(getPagedSentenceSubjectsAsync.fulfilled, (state, action) => {
        state.subjects = action.payload.data;
        state.isLoading = false;
      })
      .addCase(getPagedSentenceSubjectsAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPagedSentenceSubjectsAsync.rejected, (state) => {
        state.isError = true;
      })

      .addCase(getSentenceSubjectsAmountAsync.fulfilled, (state, action) => {
        state.sentenceSubjectAmount = action.payload.data;
      })


      .addCase(getSentenceSubjectsAsync.fulfilled, (state, action) => {
        state.subjects = action.payload;
      })

      .addCase(getSentencesOfSubjectAsync.fulfilled, (state, action) =>
      {
        state.subjectSentences = action.payload
        state.isLoading = false;
      })
      .addCase(getSentencesOfSubjectAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSentencesOfSubjectAsync.rejected, (state) => {
        state.isError = true;
      })

      .addCase(postAnswerSentenceAsync.fulfilled, (state, action) => {
        state.sentenceAnswers = [...state.sentenceAnswers, action.payload];
      })
  },
});



export const { saveAnswers } = sentenceSlice.actions;

export const selectSentenceCorrectAnswers = (state: RootState) => state.sentence.sentenceResult;

export const selectSentenceQuestionsisLoading = (state: RootState) => state.sentence.isLoading;

export const selectPagedSentenceSubjectisLoading = (state: RootState) => state.sentence.isLoading;

export const selectSentenceSubjectsAmount = (state: RootState) => state.sentence.sentenceSubjectAmount;

export const selectSentences = (state: RootState) => state.sentence.sentences;
export const selectSingleSentence = (state: RootState) => state.sentence.sentence;

export const selectAllSubjectsOfSentence = (state: RootState) => state.sentence.subjects;
export const selectSubjectSentences = (state: RootState) => state.sentence.subjectSentences;



export default sentenceSlice.reducer;
