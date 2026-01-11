interface MultiplyValues {
    value1: number;
    value2: number[];
}

const parseArguments = (args: string[]): MultiplyValues => {
    if (args.length < 4) throw new Error('Not enough arguments');

    const value1 = Number(args[2]);
    if (isNaN(value1)) throw new Error('First value is not a number');

    const value2 = args.slice(3).map(arg => {
        const num = Number(arg);
        if (isNaN(num)) throw new Error('One of the values is not a number');
        return num;
    });
    return {
        value1,
        value2
    }
}

const calculateExercises = (dailyExercises: number[], target: number) => {
    const periodLength = dailyExercises.length;
    const trainingDays = dailyExercises.filter(day => day > 0).length;
    const totalHours = dailyExercises.reduce((sum, hours) => sum + hours, 0);
    const average = totalHours / periodLength;
    const success = average >= target;

    let rating: number;
    let ratingDescription: string;

    if (average >= target) {
        rating = 3;
        ratingDescription = 'Great job!';
    } else if (average >= target * 0.75) {
        rating = 2;
        ratingDescription = 'Not too bad but could be better.';
    } else {
        rating = 1;
        ratingDescription = 'You need to work harder.';
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


try {
    const { value1, value2 } = parseArguments(process.argv);
    console.log(calculateExercises(value2, value1));
}catch (e) {
    if (e instanceof Error) {
        console.log('Error:', e.message);
    }
}