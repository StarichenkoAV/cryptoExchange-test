import { configureStore } from "@reduxjs/toolkit";
import exchangeSlice from "./exchangeSlice";
import { useDispatch } from "react-redux";

const store = configureStore({
	reducer: {
	  exchange: exchangeSlice,
	},
  });

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type StoreStateType = ReturnType<typeof store.getState>;

export default store;

