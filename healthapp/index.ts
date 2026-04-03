import express from 'express';
import {calculateBmi} from './bmi/bmiCalculator.ts';
import { calculateExercises} from './exerciseCalculator.ts';

import type { Request, Response } from 'express';


const app = express();
app.use(express.json()); 
app.get('/hello', (_req,res)=>{
    res.send('Hello Full Stack!');
});

app.post('/exercises', (req: Request,res: Response)=> {
    const {daily_exercises,  target} = req.body;
    if(!daily_exercises || !target){

        res.status(400).json({
            error: "parameters missing"
        });
        return
    }
    if(!Array.isArray(daily_exercises) || isNaN(+target) || !daily_exercises.every(item => typeof item == 'number')){
        res.status(400).json({
            error: "malformatted parameters"
        });
        return
    }
    const result = calculateExercises(daily_exercises,target);
    console.log(result)
    res.status(200).json(result);


});

app.get('/bmi', (req,res) => {


    const height = Number(req.query?.height);
    const weight = Number(req.query?.weight);
    if (isNaN(height) || isNaN(weight)) {
            res.status(400).json({
                error: "malformatted parameters"
            });
            return
    }
    const bmi = calculateBmi(height,weight);
    res.status(200).json({
        height,
        weight,
        bmi
    });
});


app.listen(3000, ()=> console.log('Server Running'));