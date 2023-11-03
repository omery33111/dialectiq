import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { VoiceState } from '../../models/Voice';
import { getPagedVoiceSubjects, getRightVoices, getVoiceSubjects, getVoiceSubjectsAmount, getVoices, getVoicesOfSubject, postAnswerVoice } from './voiceAPI';
import { RootState } from '../../app/store';



const initialState: VoiceState = {
  voices: [],
  voice: {
    subject: {id: "", subject_name: ""}, id: "", question: "", correct_answer: ""},
  
  subject: { id: "", description: "", subject_name: "", picture: ""},
  subjects: [{ id: "", description: "", subject_name: "", picture: ""}],
  subjectVoices: [],

  voiceAnswer: {id: "", user: 0, user_answer: "", question: 0},
  voiceAnswers: [],

  voiceSubjectAmount: 0,

  isLoading: false,
  isError: false,

  voiceResult: []
};




export const getRightVoicesAsync = createAsyncThunk(
  "voice/getRightVoices",
  async () => {
    const response = await getRightVoices();
    return response;
  }
);



export const getVoicesAsync = createAsyncThunk('voice/getVoices', async () => {
  const response = await getVoices();
  return response.data;
});



export const getPagedVoiceSubjectsAsync = createAsyncThunk(
  "voice/getPagedVoiceSubjects",
  async (page: number) => {
    const response = await getPagedVoiceSubjects(page);
    return response;
  }
);


export const getVoiceSubjectsAmountAsync = createAsyncThunk(
  "voice/getVoiceSubjectsAmount",
  async () => {
    const response = await getVoiceSubjectsAmount();
    return response;
  }
);



export const getVoiceSubjectsAsync = createAsyncThunk(
  'voice/getVoiceSubjects',
  async () => {
    const response = await getVoiceSubjects();
    return response.data;
  }
);



export const getVoicesOfSubjectAsync = createAsyncThunk(
  'voice/getVoicesOfSubject',
  async (id: string) => {
    const response = await getVoicesOfSubject(id);
    return response.data;
  }
);



export const postAnswerVoiceAsync = createAsyncThunk(
  'voice/postAnswerVoice',
  async (data: { voiceAnswerData: any, answers: { user_answer: number, question: number }[] }) => {
      const response = await postAnswerVoice(data.voiceAnswerData, data.answers);
      return response.data;
  }
);



export const voiceSlice = createSlice({
  name: 'voice',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getVoicesAsync.fulfilled, (state, action) => {
        state.voices = action.payload;
      })

      .addCase(getRightVoicesAsync.fulfilled, (state, action) => {
        state.voiceResult = action.payload.data
      })

      .addCase(getVoiceSubjectsAsync.fulfilled, (state, action) => {
        state.subjects = action.payload;
      })

      .addCase(getPagedVoiceSubjectsAsync.fulfilled, (state, action) => {
        state.subjects = action.payload.data;
        state.isLoading = false;
      })
      .addCase(getPagedVoiceSubjectsAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPagedVoiceSubjectsAsync.rejected, (state) => {
        state.isError = true;
      })

      .addCase(getVoiceSubjectsAmountAsync.fulfilled, (state, action) => {
        state.voiceSubjectAmount = action.payload.data;
      })

      .addCase(getVoicesOfSubjectAsync.fulfilled, (state, action) =>
      {
        state.subjectVoices = action.payload
        state.isLoading = false;
      })
      .addCase(getVoicesOfSubjectAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getVoicesOfSubjectAsync.rejected, (state) => {
        state.isError = true;
      })

      .addCase(postAnswerVoiceAsync.fulfilled, (state, action) => {
        state.voiceAnswers = [...state.voiceAnswers, action.payload];
      })
  },
});




export const selectVoiceQuestionsisLoading = (state: RootState) => state.voice.isLoading;
export const selectPagedVoiceSubjectisLoading = (state: RootState) => state.voice.isLoading;

export const selectVoiceCorrectAnswers = (state: RootState) => state.voice.voiceResult;

export const selectVoiceSubjectsAmount = (state: RootState) => state.voice.voiceSubjectAmount;

export const selectVoices = (state: RootState) => state.voice.voices;
export const selectSingleVoice = (state: RootState) => state.voice.voice;

export const selectAllSubjectsOfVoice = (state: RootState) => state.voice.subjects;
// export const selectSingleSubjectOfAmerican = (state: RootState) => state.voice.subject;
export const selectSubjectQuizes = (state: RootState) => state.voice.subjectVoices;

// export const selectAmericanAnswers = (state: RootState) => state.voice.americanAnswers;
// export const selectSingleAmericanAnswer = (state: RootState) => state.voice.americanAnswer;


export default voiceSlice.reducer;
