import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
};

const counterSlice = createSlice({
  initialState,
  name: "counterSlice",
  reducers: {
    increment: (state, action: PayloadAction<number | undefined>) => {
      state.count += action?.payload ?? 1;
    },
    decrement: (state, action: PayloadAction<number | undefined>) => {
      state.count -= action?.payload ?? 1;
    },
    reset: (state) => {
      state.count = 0;
    },
    set: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
  },
  extraReducers() {},
});

export const { increment, decrement, reset, set } = counterSlice.actions;
export { counterSlice };
