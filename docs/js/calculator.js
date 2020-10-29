// Handles form input and calculations of calculator.html page

function populateSelectOptions(optionID, optionMin, optionMax, reverse = false) {
    var select = document.getElementById(optionID);
    if (reverse) {
        for (var i = optionMax; i >= optionMin; i--) {
            var option = document.createElement("option")
            option.text = i;
            option.value = i;
            select.options.add(option);
        }
    } else {
        for (var i = optionMin; i <= optionMax; i++) {
            var option = document.createElement("option")
            option.text = i;
            option.value = i;
            select.options.add(option)
        }
    }

}

// Populate drop-down lists
populateSelectOptions("user_bday_day", 1, 31);
// get current year
const currentTime = new Date()
const currentYear = currentTime.getFullYear()
populateSelectOptions("user_bday_year", currentYear - 100, currentYear, reverse = true)

populateSelectOptions("user_height_feet", 1, 7)
populateSelectOptions("user_height_inches", 0, 12)

populateSelectOptions("user_weight_pounds", 1, 300)

function submitData() {
    console.log("submitting DATA")

    // create user_profile object from datafiels
    try {
        var user_profile = {
            bday_month: document.getElementById("user_bday_month").value,
            bday_day: document.getElementById("user_bday_day").value,
            bday_year: document.getElementById("user_bday_year").value,
            height_feet: document.getElementById("user_height_feet").value,
            height_inches: document.getElementById("user_height_inches").value,
            weight: document.getElementById("user_weight_pounds").value,
            activity_level: document.querySelector('input[name="user_activity_level"]:checked').value
        }
    } catch (error) {
        console.error("Radio button not selected");
        return;
    }

    // check that the user selected values for dropdown lists
    for (key in user_profile) {
        if (user_profile[key] === "") {
            console.error("Empty select list")
            return;
        }
    }

    // calculate user age and BMI
    user_profile.age = currentYear - parseInt(user_profile.bday_year);
    user_profile.height_total_inches = 12 * parseInt(user_profile.height_feet) + parseInt(user_profile.height_inches);
    user_profile.bmi = calculateBMI(user_profile.weight, user_profile.height_total_inches)
    user_profile.fitness_level = calculateFitness(user_profile.bmi, user_profile.age, user_profile.activity_level);

    console.log(user_profile);
    displayFitness(user_profile.fitness_level);

    // store data
    console.log('storing data to session storage')
    sessionStorage.user_profile = JSON.stringify(user_profile)
    sessionStorage.fitness_level = JSON.stringify(user_profile.fitness_level);
}

function displayFitness(fitness_level) { // create a new div element
    var fitnessLevelElement = document.getElementById("fitness_result");
    if (typeof(fitnessLevelElement) != 'undefined' && fitnessLevelElement != null) {
        fitnessLevelElement.textContent = "Your Result: " + fitness_level;
    } else {
        fitnessLevelElement = document.createElement("div");
        fitnessLevelElement.setAttribute("id", "fitness_result")
        fitnessLevelElement.textContent = "Your Result: " + fitness_level;


        // add the newly created element and its content into the DOM
        const parentDiv = document.getElementById("user_form");
        parentDiv.insertBefore(fitnessLevelElement, null);
    }

    // change color of result
    if (fitness_level == "Low Fitness") {
        fitnessLevelElement.style.color = "red"
    } else if (fitness_level == "Medium Fitness") {
        fitnessLevelElement.style.color = "orange"
    } else if (fitness_level == "High Fitness") {
        fitnessLevelElement.style.color = "green"
    }
}

function calculateBMI(weight, height) {
    return((weight / (height) ** 2) * 703)
}
function calculateFitness(bmi, age, activity_level) {
    var fitness_points = 0;
    if (activity_level == "sedentary") {
        fitness_points = 1;
    } else if (activity_level == "lightly active") {
        fitness_points = 2;
    } else if (activity_level == "moderately active") {
        fitness_points = 3;
    } else if (activity_level == "highly active") {
        fitness_points = 4;
    }

    if (bmi > 40) {
        fitness_points -= 4;
    } else if (bmi > 35) {
        fitness_points -= 3;
    } else if (bmi > 30) {
        fitness_points -= 2;
    } else if (bmi > 25) {
        fitness_points -= 1;
    } else if (bmi < 10) {
        fitness_points -= 2;
    } else if (bmi < 15) {
        fitness_points -= 1;
    }

    if (age > 70 || age < 10) {
        fitness_points -= 1;
    }

    var fitness_level;
    if (fitness_points <= 1) {
        fitness_level = "Low Fitness"
    } else if (fitness_points == 2 || fitness_points == 3) {
        fitness_level = "Medium Fitness"
    } else if (fitness_points >= 4) {
        fitness_level = "High Fitness"
    }

    return fitness_level;
}
