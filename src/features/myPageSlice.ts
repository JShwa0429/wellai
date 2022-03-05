// eslint-disable-next-line
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SignUpState = {
  userId: string;
  nickname: string | undefined;
  isLoading: boolean;
};

const initialState: SignUpState = {
  nickname: undefined,
  isLoading: false,
  userId: '',
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
  },
});

export const { emailChange, isLoadingChange, nicknameChange } = myPageSlice.actions;
export default myPageSlice.reducer;
