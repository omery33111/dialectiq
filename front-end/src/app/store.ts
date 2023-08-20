import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authenticationReducer from '../features/authentication/authenticationSlice';
import profileReducer from '../features/profile/profileSlice';
import callbackReducer from '../features/callback/callbackSlice';

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    profile: profileReducer,
    callback: callbackReducer
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
