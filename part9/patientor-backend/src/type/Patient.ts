import { z } from 'zod';

export const PatientSchema = z.object({
    id: z.string(),
    name: z.string(),
    dateOfBirth: z.string(),
    ssn: z.string(),
    gender: z.string(),
    occupation: z.string()
});

export type Patient = z.infer<typeof PatientSchema>;

export type NonSensitivePatient = Omit<Patient, 'ssn'>;

export type NewPatient = Omit<Patient, 'id'>;