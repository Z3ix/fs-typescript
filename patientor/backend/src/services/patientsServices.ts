import data from "../database/patients.ts";
import type { Entry, EntryWithoutId, NewPatient, Patient, SafePatient } from "../types.ts";
import { v1 as uuid } from 'uuid';

const patientsData: Patient[] = data as Patient[];

export const getAll = (): SafePatient[] => {
    return patientsData.map(({id,name,dateOfBirth,gender,occupation}) => ({id, name, dateOfBirth, gender, occupation}));
};

export const addPatient = (data: NewPatient): Patient =>{
    const newPatient : Patient = {...data, id: uuid(), entries:[]};
    patientsData.push(newPatient);
    return newPatient;
};

export const getById =( id: string) : Patient => {
    const patient = patientsData.find(item => item.id === id)
    if (patient) return patient
    throw new Error("Patiend not found")
}
   
export const addEntry = (id: string, entry: EntryWithoutId ): Entry => {
    const newEntry = {...entry, id: uuid()}
    const patient = patientsData.find(item => item.id === id)
    if (!patient) throw new Error("Patient does not exist")
    patient.entries.push(newEntry)
    return newEntry;
}