import express, { type NextFunction,type Request, type Response } from 'express';
import { addEntry, addPatient, getAll, getById } from '../services/patientsServices.ts';

import {z} from 'zod';
import  {NewPatientSchema, type EntryWithoutId, type NewPatient } from '../types.ts';

const router = express.Router();

router.get('/', (req,res) =>{
    return res.json(getAll());
});

router.get('/:id',(req,res) =>{
    const id = req.params.id
    const patient = getById(id)
    if (!patient?.entries){
        patient.entries = []
    }
    return res.json(patient)
})

const errorHandler = (error: unknown,req: Request, res: Response, next: NextFunction) => {
    if (error instanceof z.ZodError) {
        res.status(400).json({error: error.issues});
    } else {
        next(error);
    }
};
const patientParser = (req: Request, res: Response, next: NextFunction)=> {
    try {
        NewPatientSchema.parse(req.body);
        next();
    } catch (e:unknown){
        next(e);
    }
};
router.post('/', patientParser, (req: Request<unknown,unknown, NewPatient>,res:Response) => {
    try {
        const addedPatient = addPatient(req.body);
        res.status(200).json(addedPatient);
    } catch (e){
        res.status(400).json(e);
    }
  
});
interface RequestParams{
    id: string;
}
router.post('/:id/entries', (req: Request<RequestParams,unknown, EntryWithoutId>,res)=> {
    try{
        const result = addEntry(req.params.id, req.body)
        res.status(200).json(result)
    } catch (e:unknown) {
        if (e instanceof Error){
            console.log(e.message)
            res.status(400).json(e)
        }
    }
})
router.use(errorHandler);
export default router;