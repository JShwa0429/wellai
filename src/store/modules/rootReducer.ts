import { combineReducers } from '@reduxjs/toolkit';

import test from '../../features/test';
import signUpReducer from '../../features/signupSlice';
import myPageReducer from '../../features/myPageSlice';
const rootReducer = combineReducers({
  test,
  signUp: signUpReducer,
  myPage: myPageReducer,
});

export default rootReducer;
