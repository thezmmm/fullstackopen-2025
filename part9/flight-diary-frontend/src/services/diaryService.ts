import axios from "axios";
import type {NewDiary} from "../types/diary";

const baseUrl = '/api/diaries'

const getAllDiaries = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

const getDiaryById = async (id: number) => {
    const res = await axios.get(`${baseUrl}/${id}`)
    return res.data
}

const addDiary = async (newDiary: NewDiary) => {
    const res = await axios.post(baseUrl, newDiary)
    return res.data
}

export default {getAllDiaries, getDiaryById, addDiary}