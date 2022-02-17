import { combineReducers } from '@reduxjs/toolkit';

import test from '../../features/test';
import signUpReducer from '../../features/signupSlice';
const rootReducer = combineReducers({
  test,
  signUp: signUpReducer,
});

export default rootReducer;
