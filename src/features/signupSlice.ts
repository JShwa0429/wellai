// eslint-disable-next-line
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Option } from 'rc-select';

export type Option = {
  gender: string | null;
  height?: number;
  weight?: number;
  core: boolean;
  leg: boolean;
  back: boolean;
  sit: boolean;
  stand: boolean;
  balance: boolean;
};

export type Essential = {
  email: string;
  nickname: string;
  password: string;
  passwordCheck: string;
};

export type SignUpState = Essential & {
  option: Option;
};

const initialState: SignUpState = {
  email: '',
  nickname: '',
  password: '',
  passwordCheck: '',
  option: {
    gender: null,
    height: 0,
    weight: 0,
    core: false,
    leg: false,
    back: false,
    sit: false,
    stand: false,
    balance: false,
  },
};

export const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    emailChange: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    nicknameChange: (state, action: PayloadAction<string>) => {
      state.nickname = action.payload;
    },
    passwordChange: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    passwordCheckChange: (state, action: PayloadAction<string>) => {
      state.passwordCheck = action.payload;
    },

    saveEssential: (state, action: PayloadAction<Essential>) => {
      state.email = action.payload.email;
      state.nickname = action.payload.nickname;
      state.password = action.payload.password;
      state.passwordCheck = action.payload.passwordCheck;
    },

    saveOption: (state, action: PayloadAction<Option>) => {
      state.option.gender = action.payload?.gender;
      state.option.height = action.payload?.height;
      state.option.weight = action.payload?.weight;
      state.option.back = action.payload.back;
      state.option.core = action.payload.core;
      state.option.leg = action.payload.leg;
      state.option.balance = action.payload.balance;
      state.option.stand = action.payload.stand;
      state.option.sit = action.payload.sit;
    },
  },
});

export const { emailChange, nicknameChange, passwordChange, passwordCheckChange, saveEssential, saveOption } =
  signUpSlice.actions;
export default signUpSlice.reducer;
