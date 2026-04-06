import data from "../database/diagnoses.ts";
import type { Diagnose } from "../types.ts";

const diagnoseData : Diagnose[] = data;
export const getAll = ():Diagnose[] => {
    return diagnoseData;
};