//gender male: 1       female: 0


// low activity = 1.3
//moderate activity = 1.5
// high activity = 1.7

//userTarget = 0 to loose weight
//userTarget = 1 to to maintain weight
//userTarget = 2 to to gain weight

var userHeight = 1.77;
var userWeight = 80;
var userAge = 20;
var userGender = 1;
var userActivity = 1.5;
var userGoal = 80;
var userCurrentWeight = 75;
var userTarget = 2;




//weeks calculator 
function HowManyWeeks(goal, current_weight) {
    const diff = Math.abs(goal - current_weight);
    const noOfWeeks = diff/0.45 ;
    return noOfWeeks;
}

//BMI calculator
function BmiCalculator(weight , height) {
    var BMI = weight / (height * height);
    var status;
    BMI_int = Math.floor(BMI);
    if(BMI_int < 18) status = "underweight";
    else if (BMI_int >= 18 && BMI_int<25) status = "Normal weight";
    else if (BMI_int >= 25 && BMI_int < 30) status = "overweight";
    else status = "Obese";
    return [BMI_int, status];
}

//ideal weight calculator
function idealWeight (height){
    const idealWeight_range = new Array;
    idealWeight_range[0] = Math.floor(18 * (height * height));
    idealWeight_range[1] = Math.floor(24 * (height * height));
    const median_ideal_weight = (idealWeight_range[0] + idealWeight_range[1]) / 2;
    return median_ideal_weight;
}





//function to calculate calories rn
function CaloriesForCurrentWeight(age, gender, activity, current_weight){
    //male
    if(gender == 1) {
        switch(true){
            case (age>=10 && age<=17):
                return ((17.7 * current_weight) +657)* activity;
                break;
            case (age>=18 && age<=29):
                return ((15.1 * current_weight) +692)* activity;
                break;
            case (age>=30 && age<=59):
                return ((11.5 * current_weight) +873)* activity;
                break;
            case (age>=60):
                return ((11.7 * current_weight) +585)* activity;
                break;
        }
    //female
    }else {
        switch(true){
            case (age>=10 && age<=17):
                return ((13.4 * current_weight) +692)* activity;
                break;
            case (age>=18 && age<=29):
                return ((14.8 * current_weight) +487)* activity;
                break;
            case (age>=30 && age<=59):
                return ((8.3 * current_weight) +846)* activity;
                break;
            case (age>=60):
                return ((9.0 * current_weight) +656)* activity;
                break;
        }
    }
    
}

function DailyCaloriesIntake(currentCalories, target) {
    if (target == 0) return currentCalories - 500;
    else if( target == 1)  return currentCalories;
    else return currentCalories + 500;
}


//ideal weight
console.log(idealWeight(userHeight));

//BMI calculator 
console.log(BmiCalculator(userWeight, userHeight));


//calculate no of weeks
console.log(HowManyWeeks(userGoal, userCurrentWeight))

//to calculate calories with curretn weight
var calories = CaloriesForCurrentWeight(userAge, userGender, userActivity, userCurrentWeight);
console.log(calories);

//calories to lose, gain weight or to maintain weight
console.log(DailyCaloriesIntake(calories, userTarget));


