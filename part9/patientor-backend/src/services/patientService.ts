import patientData from '../data/patients';
import {Patient, NonSensitivePatient, NewPatient} from "../type/Patient";
import { v4 as uuidv4 } from 'uuid';

const data: Patient[] = patientData;

const getPatients = (): Patient[] => {
    return data;
}

const getNonSensitivePatients = (): NonSensitivePatient[] => {
    return data.map(({ id, name, dateOfBirth, gender, occupation,entries }) => ({
        id, name, dateOfBirth, gender, occupation,entries
    }));
}

const addPatient = (newPatient: NewPatient): Patient => {
    const id = uuidv4();
    const patientWithId: Patient = {
        id,
        ...newPatient,
        entries: []
    };
    data.push(patientWithId);
    return patientWithId;
}

const getPatientById = (id: string): Patient | undefined => {
    return data.find(patient => patient.id === id);
}

export default {
    getPatients,
    getNonSensitivePatients,
    addPatient,
    getPatientById
}