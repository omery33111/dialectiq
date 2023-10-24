import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authenticationReducer from '../features/authentication/authenticationSlice';
import profileReducer from '../features/profile/profileSlice';
import callbackReducer from '../features/callback/callbackSlice';
import administratorReducer from '../features/administrator/administratorSlice';
import blogReducer from '../features/blog/blogSlice';
import commentReducer from '../features/comment/commentSlice';
import americanReducer from '../features/american/americanSlice';
import sentenceReducer from '../features/sentence/sentenceSlice';
import voiceReducer from '../features/voice/voiceSlice';

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    profile: profileReducer,
    callback: callbackReducer,
    administrator: administratorReducer,
    blog: blogReducer,
    comment: commentReducer,
    american: americanReducer,
    sentence: sentenceReducer,
    voice: voiceReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
