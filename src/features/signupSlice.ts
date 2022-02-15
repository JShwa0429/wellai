// eslint-disable-next-line
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Option = {
  gender?: string;
  height?: number;
  weight?: number;
  likeCore: boolean;
  likeLeg: boolean;
  likeBack: boolean;
  likeSit: boolean;
  likeStand: boolean;
  likeBalance: boolean;
};

export type Essential = {
  email: string;
  nickname: string;
  password: string;
  passwordCheck: string;
};

export type SignUpState = Essential & Option;

const initialState: SignUpState = {
  email: '',
  nickname: '',
  password: '',
  passwordCheck: '',
  likeCore: false,
  likeLeg: false,
  likeBack: false,
  likeSit: false,
  likeStand: false,
  likeBalance: false,
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
      state.gender = action.payload?.gender;
      state.height = action.payload?.height;
      state.weight = action.payload?.weight;
      state.likeBack = action.payload.likeBack;
      state.likeCore = action.payload.likeCore;
      state.likeLeg = action.payload.likeLeg;
      state.likeBalance = action.payload.likeBalance;
      state.likeStand = action.payload.likeStand;
      state.likeSit = action.payload.likeSit;
    },
  },
});

export const { emailChange, nicknameChange, passwordChange, passwordCheckChange, saveEssential, saveOption } =
  signUpSlice.actions;
export default signUpSlice.reducer;
