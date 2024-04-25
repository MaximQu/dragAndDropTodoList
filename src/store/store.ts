import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import todoSlice from "./slice";

export const store = configureStore({
	reducer: {
		todoSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
