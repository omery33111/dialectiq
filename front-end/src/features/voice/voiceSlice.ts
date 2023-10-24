import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { VoiceState } from '../../models/Voice';
import { getVoiceSubjects, getVoices, getVoicesOfSubject } from './voiceAPI';
import { RootState } from '../../app/store';



const initialState: VoiceState = {
  voices: [],
  voice: {
    subject: {id: "", subject_name: ""}, id: "", question: "", correct_answer: ""},
  
  subject: { id: "", description: "", subject_name: "", picture: ""},
  subjects: [{ id: "", description: "", subject_name: "", picture: ""}],
  subjectVoices: [],

  // sentenceAnswer: {id: "", user: 0, user_answer: "", question: 0},
  // sentenceAnswers: [],
  
};



export const getVoicesAsync = createAsyncThunk('voice/getVoices', async () => {
  const response = await getVoices();
  return response.data;
});



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

      .addCase(getVoiceSubjectsAsync.fulfilled, (state, action) => {
        state.subjects = action.payload;
      })

      .addCase(getVoicesOfSubjectAsync.fulfilled, (state, action) =>
      {
        state.subjectVoices = action.payload
      })
  },
});



export const selectVoices = (state: RootState) => state.voice.voices;
export const selectSingleVoice = (state: RootState) => state.voice.voice;

export const selectAllSubjectsOfVoice = (state: RootState) => state.voice.subjects;
// export const selectSingleSubjectOfAmerican = (state: RootState) => state.voice.subject;
export const selectSubjectQuizes = (state: RootState) => state.voice.subjectVoices;

// export const selectAmericanAnswers = (state: RootState) => state.voice.americanAnswers;
// export const selectSingleAmericanAnswer = (state: RootState) => state.voice.americanAnswer;


export default voiceSlice.reducer;
