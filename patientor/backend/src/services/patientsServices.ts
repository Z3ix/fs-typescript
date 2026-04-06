import data from "../database/patients.ts";
import type { NewPatient, Patient, SafePatient } from "../types.ts";
import { v1 as uuid } from 'uuid';

const patientsData: Patient[] = data as Patient[];

export const getAll = (): SafePatient[] => {
    return patientsData.map(({id,name,dateOfBirth,gender,occupation}) => ({id, name, dateOfBirth, gender, occupation}));
};

export const addPatient = (data: NewPatient): Patient =>{
    const newPatient : Patient = {...data, id: uuid()};
    patientsData.push(newPatient);
    return newPatient;
};
   