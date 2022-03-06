// eslint-disable-next-line
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Options } from 'type';

export type Essential = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type SignUpState = Essential & {
  options: Options;
};

const initialState: SignUpState = {
  email: '',
  password: '',
  confirmPassword: '',
  options: {
    gender: null,
    height: 0,
    weight: 0,
    is_core: false,
    is_leg: false,
    is_back: false,
    is_sit: false,
    is_stand: false,
    is_balance: false,
  },
};

export const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    saveEssential: (state, action: PayloadAction<Essential>) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.confirmPassword = action.payload.confirmPassword;
    },

    saveOptions: (state, action: PayloadAction<Options>) => {
      state.options.gender = action.payload?.gender;
      state.options.height = action.payload?.height;
      state.options.weight = action.payload?.weight;
      state.options.is_back = action.payload.is_back;
      state.options.is_core = action.payload.is_core;
      state.options.is_leg = action.payload.is_leg;
      state.options.is_balance = action.payload.is_balance;
      state.options.is_stand = action.payload.is_stand;
      state.options.is_sit = action.payload.is_sit;
    },
  },
});

export const { saveEssential, saveOptions } = signUpSlice.actions;
export default signUpSlice.reducer;
