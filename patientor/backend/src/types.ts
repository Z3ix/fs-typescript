import { z } from "zod"; 
/*export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
}*/

/*export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
}       

*/

//export type NewPatient = Omit<Patient,'id'>;
//export type SafePatient = Omit<Patient,'ssn'>;

export const Gender = {
    Male: "male",
    Female: "female",
    Other: "other"
} as const;
export type Gender = typeof Gender[keyof typeof Gender];

export const NewPatientSchema = z.object({
    name: z.string(),
    dateOfBirth: z.iso.date(),
    ssn: z.string(),
    occupation: z.string(),
    gender: z.enum(Gender)
});

export type NewPatient = z.infer<typeof NewPatientSchema>;
export interface Patient extends NewPatient {
    id: string;
}
export type SafePatient = Omit<Patient, 'ssn'>;

export const DiagnoseSchema = z.object({
    code: z.string(),
    name:z.string(),
    latin: z.string().optional()
});

export type Diagnose = z.infer<typeof DiagnoseSchema>;