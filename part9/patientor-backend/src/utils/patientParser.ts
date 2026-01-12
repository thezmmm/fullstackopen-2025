import {NewPatient}  from "../type/Patient";
export const isPatient = (obj: any): obj is NewPatient => {
    return 'name' in obj &&
        typeof obj.name === 'string' &&
        'dateOfBirth' in obj &&
        typeof obj.dateOfBirth === 'string' &&
        'ssn' in obj &&
        typeof obj.ssn === 'string' &&
        'gender' in obj &&
        typeof obj.gender === 'string' &&
        'occupation' in obj &&
        typeof obj.occupation === 'string';
}

export const parsePatient = (obj: any): NewPatient => {
    if (!isPatient(obj)) {
        throw new Error('Invalid patient data');
    }
    return obj;
}

