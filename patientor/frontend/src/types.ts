import {z} from 'zod';
export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Array<Entry>;
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}
export const HealthCheckRating = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
} as const;

export type HealthCheckRating = typeof HealthCheckRating[keyof typeof HealthCheckRating];

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

