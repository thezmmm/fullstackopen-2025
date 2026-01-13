import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type { Draft} from "@reduxjs/toolkit";
import diaryService from "../services/diaryService";
import type {NewDiary,Diary} from "../types/diary";

export const initializeDiary:any = createAsyncThunk<
    Diary[],
    void
    >(
    'diary/initializeDiary',
    async () => {
        const data = await diaryService.getAllDiaries();
        return data;
    }
);

export const addDiary:any = createAsyncThunk<
    Diary,
    NewDiary
    >(
    'diary/addDiary',
    async (newDiary: NewDiary) => {
        const data = await diaryService.addDiary(newDiary);
        return data;
    }
);

const initialState: Diary[] = [];

const diarySlice = createSlice({
    name: 'diary',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(initializeDiary.fulfilled, (_state:Draft<Diary[]>, action) => {
            return action.payload;
        });
        builder.addCase(addDiary.fulfilled, (state:Draft<Diary[]>, action) => {
            state.push(action.payload);
        });
    }
});

export default diarySlice.reducer;
