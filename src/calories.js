//gender male: 1       female: 0
var userHeight = 1.422;
var userWeight = 41;
var userAge = 20;
var userGender = 0;
var userActivity = 1.7;
var userGoal = 50;

// High = 1.7
// low = 1.3
// medium = 1.5
//BMI calculator
const BmiCalculator = (weight, height) => {
    var BMI = weight / (height * height);
    var status;
    var BMI_int = Math.floor(BMI);
    if (BMI_int < 18) status = "underweight";
    else if (BMI_int >= 18 && BMI_int < 25) status = "Normal weight";
    else if (BMI_int >= 25 && BMI_int < 30) status = "overweight";
    else status = "Obese";
    return [BMI_int, status];
}

//ideal weight calculator
function idealWeight(height) {
    const idealWeight_range = new Array;
    idealWeight_range[0] = Math.floor(18 * (height * height));
    idealWeight_range[1] = Math.floor(24 * (height * height));
    const median_ideal_weight = (idealWeight_range[0] + idealWeight_range[1]) / 2;
    return median_ideal_weight;
}


//if user want to go with ideal weight
const CaloriesWithoutGoal = (age, height, gender, activity) => {
    var median_ideal_weight = idealWeight(height);

    //male
    if (gender == 1) {
        switch (true) {
            case (age >= 10 && age <= 17):
                return ((17.7 * median_ideal_weight) + 657) * activity;
                break;
            case (age >= 18 && age <= 29):
                return ((15.1 * median_ideal_weight) + 692) * activity;
                break;
            case (age >= 30 && age <= 59):
                return ((11.5 * median_ideal_weight) + 873) * activity;
                break;
            case (age >= 60):
                return ((11.7 * median_ideal_weight) + 585) * activity;
                break;
        }
        //female
    } else {
        switch (true) {
            case (age >= 10 && age <= 17):
                return ((13.4 * median_ideal_weight) + 692) * activity;
                break;
            case (age >= 18 && age <= 29):
                return ((14.8 * median_ideal_weight) + 487) * activity;
                break;
            case (age >= 30 && age <= 59):
                return ((8.3 * median_ideal_weight) + 846) * activity;
                break;
            case (age >= 60):
                return ((9.0 * median_ideal_weight) + 656) * activity;
                break;
        }
    }

}

//function with goal
export function CaloriesWithGoal(age, gender, activity, goal) {
    //male
    if (gender == 1) {
        switch (true) {
            case (age >= 10 && age <= 17):
                return ((17.7 * goal) + 657) * activity;
                break;
            case (age >= 18 && age <= 29):
                return ((15.1 * goal) + 692) * activity;
                break;
            case (age >= 30 && age <= 59):
                return ((11.5 * goal) + 873) * activity;
                break;
            case (age >= 60):
                return ((11.7 * goal) + 585) * activity;
                break;
        }
        //female
    } else {
        switch (true) {
            case (age >= 10 && age <= 17):
                return ((13.4 * goal) + 692) * activity;
                break;
            case (age >= 18 && age <= 29):
                return ((14.8 * goal) + 487) * activity;
                break;
            case (age >= 30 && age <= 59):
                return ((8.3 * goal) + 846) * activity;
                break;
            case (age >= 60):
                return ((9.0 * goal) + 656) * activity;
                break;
        }
    }

}

export { BmiCalculator, CaloriesWithoutGoal }

// //ideal weight
// console.log(idealWeight(userHeight));

// //BMI calculator 
// console.log(BmiCalculator(userWeight, userHeight));

// //with goal
// console.log(CaloriesWithGoal(userAge, userGender, userActivity, userGoal));

// //without goal
// console.log(CaloriesWithoutGoal(userAge, userHeight, userGender, userActivity));

