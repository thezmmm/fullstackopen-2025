import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../store";
import Diary from "./Diary";
import {useEffect} from "react";
import {initializeDiary} from "../slice/diarySlice";
import diaryService from "../services/diaryService";

const DiaryList = () => {
    const diaries = useSelector((state: RootState) => state.diary);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeDiary());
    },[dispatch])

    return (
        <div>
            <h2>Diary Entries</h2>
            {diaries.map((diary) => (
                <Diary diary={diary}></Diary>
            ))}
        </div>
    )
}

export default DiaryList;