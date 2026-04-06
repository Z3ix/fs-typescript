import express, { type NextFunction,type Request, type Response } from 'express';
import { addPatient, getAll } from '../services/patientsServices.ts';

import {z} from 'zod';
import  {NewPatientSchema, type NewPatient } from '../types.ts';

const router = express.Router();

router.get('/', (req,res) =>{
    return res.json(getAll());
});

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
router.use(errorHandler);
export default router;