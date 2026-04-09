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

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>;
}
const HealthCheckRating = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
} as const;

type HealthCheckRating = typeof HealthCheckRating[keyof typeof HealthCheckRating];

export const SickLeaveSchema = z.object({
    startDate: z.iso.date(),
    endDate: z.iso.date()
})

export type SickLeave = z.infer<typeof SickLeaveSchema>;

export const DischargeSchema = z.object({
    date: z.iso.date(),
    criteria: z.string()
})

export type Discharge = z.infer<typeof DischargeSchema>

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: SickLeave;
}

interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: Discharge;
}
export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, 'id'>;

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
    gender: z.enum(Gender),

});

export type NewPatient = z.infer<typeof NewPatientSchema>;
/*
export interface Patient extends NewPatient {
    id: string;
}
*/
export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Array<Entry>
}

export type SafePatient = Omit<Patient, 'ssn'|'entries'>;

export const DiagnoseSchema = z.object({
    code: z.string(),
    name:z.string(),
    latin: z.string().optional()
});

export type Diagnose = z.infer<typeof DiagnoseSchema>;