import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Test {
  value: number;
}

export const testSlice = createSlice({
  name: 'test',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<{ value: number }>) => {
      state.value += action.payload.value;
    },
  },
  extraReducers: {},
});

export const { increment, decrement, incrementByAmount } = testSlice.actions;
export default testSlice.reducer;
