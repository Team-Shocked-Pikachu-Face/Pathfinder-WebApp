// Handles form input and calculations of calculator.html page
const currentTime = new Date()
const currentYear = currentTime.getFullYear()

window.onload = () => { // Populate drop-down lists
    populateSelectOptions("bday_day", 1, 31);
    populateSelectOptions("bday_year", currentYear - 100, currentYear, reverse = true)
    populateSelectOptions("height_feet", 1, 7)
    populateSelectOptions("height_inches", 0, 12)
    populateSelectOptions("weight_pounds", 1, 300)
    fill_form();
}

function populateSelectOptions(optionID, optionMin, optionMax, reverse = false) {
    var select = document.getElementById(optionID);
    // populate options in increasing order
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

function fill_form() {
    user_data = getUserData()
    if (user_data) {
        selects = document.getElementsByClassName("dataSelect")
        Array.from(selects).forEach(element => {
            element.value = user_data[element.id];
        })

        // pre-check any radio buttons from previously submitted user data
        radios = document.getElementsByClassName("dataRadio")
        Array.from(radios).forEach(element => {
            if (user_data[element.name] == element.value) {
                element.checked = true;
            }
        })
    }
}

function getUserData() {
    console.log("retrieving user data");
    user_data = JSON.parse(sessionStorage.user_profile);
    console.log(user_data);
    return user_data
}


function submitData() {
    console.log("submitting DATA")

    // create user_profile object from datafields
    try {
        var user_profile = {
            bday_month: document.getElementById("bday_month").value,
            bday_day: document.getElementById("bday_day").value,
            bday_year: document.getElementById("bday_year").value,
            height_feet: document.getElementById("height_feet").value,
            height_inches: document.getElementById("height_inches").value,
            weight_pounds: document.getElementById("weight_pounds").value,
            activity_level: document.querySelector('input[name="activity_level"]:checked').value
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
    user_profile.bmi = calculateBMI(user_profile.weight_pounds, user_profile.height_total_inches)
    user_profile.fitness_level = calculateFitness(user_profile.bmi, user_profile.age, user_profile.activity_level);

    console.log("user_profile:\n", user_profile);
    displayFitness(user_profile.fitness_level);

    // store data
    console.log('storing data to session storage')
    sessionStorage.user_profile = JSON.stringify(user_profile);
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
