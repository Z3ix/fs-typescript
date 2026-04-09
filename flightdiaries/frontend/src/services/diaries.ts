import axios from "axios";
import type { DairyEntry, NewDairyEntry, NonSensitiveDiaryEntry } from "../types";


const getAll = async () => {

    const result = await axios.get<NonSensitiveDiaryEntry[]>('/api/diaries');
    return result.data;

};

export const createEntry = async (entry:NewDairyEntry) => {
    const result = await axios.post<DairyEntry>('/api/diaries',entry);
    return result.data;

};



export default {
    getAll,
    createEntry
};