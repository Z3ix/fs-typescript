
interface inputArgs{
    height: number,
    weight: number
}


function parseInput(args: string[]): inputArgs {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))){
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        };
    } else {
        throw new Error(' Wrong input');
    }

}

export function calculateBmi(height: number, weight: number): string {
    const heightInMeters = height/100;
    const bmi = weight/(heightInMeters*heightInMeters);
    if (bmi < 16) return 'Underweight (Severe thinness) ';
    if (bmi <= 17) return 'Underweight (Moderate thinness)';
    if (bmi <= 18.5) return 'Underweight (Mild thinness)';
    if (bmi <= 25) return 'Normal range';
    if (bmi <= 30) return 'Overweight (Pre-obese)';
    if (bmi <= 35) return 'Obese (Class I)';
    if (bmi <= 40) return 'Obese (Class II)';
    return 'Obese (Class III)';

}

if (process.argv.length> 2) {
    try {
        const {height, weight} = parseInput(process.argv);
        console.log(calculateBmi(height,weight));
    } catch (e: unknown) {
        let errorMessage = 'Something bad happened.';
        if (e instanceof Error) {
            errorMessage += ' Error: ' + e.message;
        }
        console.log(errorMessage);
    }
}
