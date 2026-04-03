export interface ExericeBreakdown {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

interface InputArgs {
    target: number,
    record: number[]
}

function parseInput(args: string[]): InputArgs {
    if (args.length < 4) throw new Error('Not enough arguments');
    let target: number;
    const record: number[] = [];
    if (!isNaN(Number(args[2]))){
        target = Number(args[2]);
    } else {
        throw new Error(' Wrong input');
    }
    for (let i = 3; i<args.length; i++){
        if (!isNaN(Number(args[i]))){
            record.push(Number(args[i]));
        } else {
            throw new Error(' Wrong input');
        } 
    }
    return {
        target,
        record
    };

}

export function calculateExercises(record: number[], target: number): ExericeBreakdown {
    let trainingDays = 0;
    const periodLength = record.length;
    let total = 0;
    for (let i = 0; i < periodLength; i++ ) {
        if (record[i] > 0 ){
            trainingDays++; 
            total += record[i];
        }
    }
    const average = total/periodLength;
    const success = average >= target;
    const rate = average/target;
    const rating = rate>=1.2?3:(rate>=0.8?2:1);
    let ratingDescription :string;
    if (rating==3){
        ratingDescription = 'You did your best and im proud of you!';
    } else if (rating ==2){
        ratingDescription = 'Great efforst, keep going!';
    } else {
        ratingDescription = 'You can do better, don\'t give up!';
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
}

if (process.argv.length> 2) {
    try {
        const {target , record } = parseInput(process.argv);
        console.log(calculateExercises(record,target));
    } catch (e: unknown) {
        let errorMessage = 'Something bad happened.';
        if (e instanceof Error) {
            errorMessage += ' Error: ' + e.message;
        }
        console.log(errorMessage);
    }
}