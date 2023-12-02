import { configureStore } from "@reduxjs/toolkit";
import mainSlice from "./mainSlice";
import { useDispatch } from "react-redux";

const store = configureStore({
	reducer: {
	  main: mainSlice,
	},
  });

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
