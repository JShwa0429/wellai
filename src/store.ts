import { configureStore } from '@reduxjs/toolkit';
import signUpReducer from './features/signupSlice';
export const store = configureStore({
  reducer: {
    signUp: signUpReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const selectSignUp = (state: RootState) => state.signUp;
