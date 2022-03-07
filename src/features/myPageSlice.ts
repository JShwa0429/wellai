// eslint-disable-next-line
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SignUpState = {
  userId: string;
  nickname: string | undefined;
  isLoading: boolean;
  token: string | undefined;
};
export type Tokens = {
  access: string;
  refresh: string;
};

const initialState: SignUpState = {
  nickname: undefined,
  isLoading: false,
  userId: '',
  token: undefined,
};

export const myPageSlice = createSlice({
  name: 'myPage',
  initialState,
  reducers: {
    emailChange: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    nicknameChange: (state, action: PayloadAction<string>) => {
      state.nickname = action.payload;
    },
    isLoadingChange: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    tokenChange: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const { emailChange, isLoadingChange, nicknameChange, tokenChange } = myPageSlice.actions;
export default myPageSlice.reducer;
