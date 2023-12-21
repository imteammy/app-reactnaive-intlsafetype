import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { counterSlice } from "../slice";

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type ReduxState = ReturnType<typeof store.getState>;
export type ReduxDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<ReduxDispatch>();
export const useAppSelector: TypedUseSelectorHook<ReduxState> = useSelector;

export default store;
