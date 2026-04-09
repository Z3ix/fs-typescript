import axios from "axios";
import { Entry, EntryWithoutId, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getById = async (id:string) => {
  const res = await axios.get<Patient>(
    `${apiBaseUrl}/patients/${id}`
  )
  return res.data
}



const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const addEntry = async(id: string, entry: EntryWithoutId) =>{
  const result = await axios.post<Entry>(`${apiBaseUrl}/patients/${id}/entries`,entry)
  return result.data

}

export default {
  getAll, create, getById,addEntry
};

