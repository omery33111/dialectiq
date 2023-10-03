import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { AmericanState } from '../../models/American';
import { getAmericans, getSingleAmerican, getSingleAmericanSubject, postAnswerAmerican } from './americanAPI';



const initialState: AmericanState = {
  americans: [],
  american: {
    subject: {id: "", subject_name: ""}, id: "", question: "", answer1: "", answer2: "", answer3: "", answer4: "", correct_answer: 0},
  
  subject: { id: "", description: "", subject_name: "", picture: ""},
  subjects: [{ id: "", description: "", subject_name: "", picture: ""}],
  subjectAmericans: [],

  americanAnswer: {id: "", user: 0, user_answer: 0, question: 0},
  americanAnswers: [],
  
  selectedAnswers: false
};



export const getAmericansAsync = createAsyncThunk('administrator/getAmericans', async () => {
  const response = await getAmericans();
  return response.data;
});



export const getSingleAmericanAsync = createAsyncThunk(
  'american/getSingleAmerican',
  async (id: string) => {
    const response = await getSingleAmerican(id);
    return response.data;
  }
);



export const getSingleAmericanSubjectAsync = createAsyncThunk(
  'american/getSingleAmericanSubject',
  async (id: string) => {
    const response = await getSingleAmericanSubject(id);
    return response.data;
  }
);



export const postAnswerAmericanAsync = createAsyncThunk(
  'american/postAnswerAmerican',
  async (data: { americanAnswerData: any, answers: { user_answer: number, question: number }[] }) => {
      const response = await postAnswerAmerican(data.americanAnswerData, data.answers);
      return response.data;
  }
);



export const americanSlice = createSlice({
  name: 'american',
  initialState,
  reducers: {
    saveAnswers: (state, action) => {
      state.selectedAnswers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAmericansAsync.fulfilled, (state, action) => {
        state.americans = action.payload;
      })

      .addCase(getSingleAmericanAsync.fulfilled, (state, action) => {
        state.american = action.payload
      })

      .addCase(getSingleAmericanSubjectAsync.fulfilled, (state, action) => {
        state.subject = action.payload
      })

      .addCase(postAnswerAmericanAsync.fulfilled, (state, action) => {
        state.americanAnswers = [...state.americanAnswers, action.payload];
      })
  },
});



export const { saveAnswers } = americanSlice.actions;

export const selectAmericans = (state: RootState) => state.american.americans;
export const selectSingleAmerican = (state: RootState) => state.american.american;

export const selectAllSubjectsOfAmerican = (state: RootState) => state.american.subjects;
export const selectSingleSubjectOfAmerican = (state: RootState) => state.american.subject;
export const selectSubjectAmericans = (state: RootState) => state.american.subjectAmericans;

export const selectAmericanAnswers = (state: RootState) => state.american.americanAnswers;
export const selectSingleAmericanAnswer = (state: RootState) => state.american.americanAnswer;


export default americanSlice.reducer;
