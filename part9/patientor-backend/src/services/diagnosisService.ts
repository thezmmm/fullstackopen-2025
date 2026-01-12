import data from '../data/diagnoses';
import Diagnosis from "../type/Diagnosis";

const getDiagnoses = (): Diagnosis[] => {
    return data;
}

export default {
    getDiagnoses
}