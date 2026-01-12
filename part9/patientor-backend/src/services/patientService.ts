import data from '../data/patients';
import Patient, { NonSensitivePatient} from "../type/Patient";
import { v4 as uuidv4 } from 'uuid';

const getPatients = (): Patient[] => {
    return data;
}

const getNonSensitivePatients = (): NonSensitivePatient[] => {
    return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id, name, dateOfBirth, gender, occupation
    }));
}

const addPatient = (newPatient: Omit<Patient, 'id'>): Patient => {
    const id = uuidv4();
    const patientWithId: Patient = {
        id,
        ...newPatient
    };
    data.push(patientWithId);
    return patientWithId;
}

export default {
    getPatients,
    getNonSensitivePatients,
    addPatient
}