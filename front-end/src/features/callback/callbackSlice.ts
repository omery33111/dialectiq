import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postCallback } from './callbackAPI';
import { CallbackState } from '../../models/Callback';
import { RootState } from '../../app/store';



const initialState: CallbackState = {
  callbacks: []
};



export const postCallbackAsync = createAsyncThunk(
  'callback/postCallback',
  async (callbackData: any) => {
  const response = await postCallback(callbackData);
  return response.data;
  }
);



export const callbackSlice = createSlice({
  name: 'callback',
  initialState,
  reducers: {
    do: (state) => {
    },

    },
  extraReducers: (builder) => {
    builder
      .addCase(postCallbackAsync.fulfilled, (state, action) =>
      {
        state.callbacks = [...state.callbacks, action.payload];
      })
  },
});



// export const { do } = schedulerSlice.actions;

export const selectCallbacks = (state: RootState) => state.callback.callbacks;

export default callbackSlice.reducer;