/**
 * Feature 1: User Profile and Fitness Calculator
 * Takes user data from form and estimates their fitness level.
 */

// retrieve current time to calculate user age and populate "bdayYear" field
const currentTime = new Date();
const currentYear = currentTime.getFullYear();

// on window load: display form with prefilled values
window.onload = () => {
    // Populate drop-down lists
    populateSelectOptions(
        "bday_year",
        currentYear - 100,
        currentYear,
        (reverse = true)
    );
    populateSelectOptions("bday_day", 1, 31);
    populateSelectOptions("height_feet", 1, 7);
    populateSelectOptions("height_inches", 0, 12);
    populateSelectOptions("weight_pounds", 1, 300);
    fill_form();
};

// populates the options for select menus requiring integer selection
function populateSelectOptions(
    optionID,
    optionMin,
    optionMax,
    reverse = false
) {
    var select = document.getElementById(optionID);
    // populate options in increasing order
    if (reverse) {
        for (var i = optionMax; i >= optionMin; i--) {
            var option = document.createElement("option");
            option.text = i;
            option.value = i;
            select.options.add(option);
        }
    } else {
        for (var i = optionMin; i <= optionMax; i++) {
            var option = document.createElement("option");
            option.text = i;
            option.value = i;
            select.options.add(option);
        }
    }
}

// if user data exists in browser, prepopulate form with previous values
function fill_form() {
    userData = getUserData();
    if (userData) {
        selects = document.getElementsByClassName("data_select");
        Array.from(selects).forEach((element) => {
            element.value = userData[element.id];
        });

        // pre-check any radio buttons from previously submitted user data
        radios = document.getElementsByClassName("data_radio");
        Array.from(radios).forEach((element) => {
            if (userData[element.name] == element.value) {
                element.checked = true;
            }
        });
        displayFitness(userData.fitness_level);
    }
}

// parses JSON user data and returns JS object
function getUserData() {
    if (sessionStorage.userProfile) {
        console.log("user data retrieval successful");
        userData = JSON.parse(sessionStorage.userProfile);
        console.log(userData);
        return userData;
    } else {
        console.log("no user data");
        return null;
    }
}

// Submits data of "user_form". Validates data and places into "userProfile", which is stored in sessionStorage
function submitData() {
    console.log("Attempting to submit data");

    // create user_profile object from datafields
    try {
        var userProfile = {
            bday_month: document.getElementById("bday_month").value,
            bday_day: document.getElementById("bday_day").value,
            bday_year: document.getElementById("bday_year").value,
            height_feet: document.getElementById("height_feet").value,
            height_inches: document.getElementById("height_inches").value,
            weight_pounds: document.getElementById("weight_pounds").value,
            activity_level: document.querySelector(
                'input[name="activity_level"]:checked'
            ).value,
        };
    } catch (error) {
        console.error("Radio button not selected");
        return;
    }

    // check that the user selected values for dropdown lists
    for (key in userProfile) {
        if (userProfile[key] === "") {
            console.error("Empty select list");
            return;
        }
    }

    // calculate user age and BMI
    userProfile.age = currentYear - parseInt(userProfile.bday_year);
    userProfile.height_total_inches =
        12 * parseInt(userProfile.height_feet) +
        parseInt(userProfile.height_inches);
    userProfile.bmi = calculateBMI(
        userProfile.weight_pounds,
        userProfile.height_total_inches
    );
    userProfile.fitness_level = calculateFitness(
        userProfile.bmi,
        userProfile.age,
        userProfile.activity_level
    );

    console.log("user_profile:\n", userProfile);
    displayFitness(userProfile.fitness_level);

    // store data in browser
    console.log("storing data to session storage");
    sessionStorage.userProfile = JSON.stringify(userProfile);
    sessionStorage.fitnessLevel = JSON.stringify(userProfile.fitness_level);
}

// Creates a div to display fitness level. If div already exists, updates fitness level within div.
function displayFitness(fitnessLevel) {
    const yourResult = document.getElementById("yourResultText");
    yourResult.hidden = false;
    var fitnessDisplay = document.getElementById("fitness_result");
    if (typeof fitnessDisplay != "undefined" && fitnessDisplay != null) {
        fitnessDisplay.textContent = fitnessLevel;
    } else {
        fitnessDisplay = document.createElement("span");
        fitnessDisplay.setAttribute("id", "fitness_result");
        fitnessDisplay.textContent = fitnessLevel;

        // add the newly created element and its content into the DOM
        yourResult.insertBefore(fitnessDisplay, null);
    }

    // change color of result
    if (fitnessLevel == "Low Fitness") {
        fitnessDisplay.style.color = "red";
    } else if (fitnessLevel == "Medium Fitness") {
        fitnessDisplay.style.color = "orange";
    } else if (fitnessLevel == "High Fitness") {
        fitnessDisplay.style.color = "green";
    }
}

// takes user weight(pounds) and height (inches), returns BMI:float
function calculateBMI(weight, height) {
    /**@return:  */
    return (weight / height ** 2) * 703;
}

/**
 * Algorithm for estimating user fitness level.
 * BMI, age, and daily activity level values result in different point values.
 * Point values are used to classify user as "low", "medium", or "high" fitness
 */
function calculateFitness(bmi, age, activity_level) {
    var fitness_points = 0;
    if (activity_level == "Sedentary") {
        fitness_points = 1;
    } else if (activity_level == "Lightly Active") {
        fitness_points = 2;
    } else if (activity_level == "Moderately Active") {
        fitness_points = 3;
    } else if (activity_level == "Highly Active") {
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

    if (age > 70 || age < 6) {
        fitness_points -= 1;
    }

    var fitness_level;
    if (fitness_points <= 1) {
        fitness_level = "Low Fitness";
    } else if (fitness_points == 2 || fitness_points == 3) {
        fitness_level = "Medium Fitness";
    } else if (fitness_points >= 4) {
        fitness_level = "High Fitness";
    }

    return fitness_level;
}
