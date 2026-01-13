import { z } from 'zod';
import {Gender} from "./Gender";
import { Entry } from './Entry';

export const PatientSchema = z.object({
    id: z.string(),
    name: z.string(),
    dateOfBirth: z.string(),
    ssn: z.string(),
    gender: Gender,
    occupation: z.string(),
    entries: Array<Entry>
});

export type Patient = z.infer<typeof PatientSchema>;

export type NonSensitivePatient = Omit<Patient, 'ssn'>;

export type NewPatient = Omit<Patient, 'id'|'entries'>;