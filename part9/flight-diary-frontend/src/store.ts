import {configureStore} from "@reduxjs/toolkit";
import diaryReducer from "./slice/diarySlice";

export const store = configureStore({
    reducer: {
        diary: diaryReducer
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;