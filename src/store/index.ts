import "regenerator-runtime/runtime";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer";

const store = configureStore({
	reducer: rootReducer,
});

export type StoreStateType = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;

export default store;
