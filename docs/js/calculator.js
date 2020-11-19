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
    populateSelectOptions("height_inches", 0, 11);
    populateSelectOptions("weight_pounds", 1, 300);
    fill_form();
    initializeRadioTooltips();
};

// populates the options for select menus requiring integer selection
function populateSelectOptions(
    optionID,
    optionMin,
    optionMax,
    reverse = false
) {
    let select = document.getElementById(optionID);
    if (reverse) {
        for (let i = optionMax; i >= optionMin; i--) {
            iterateAddOption(select, i);
        }
    } else {
        for (let i = optionMin; i <= optionMax; i++) {
            iterateAddOption(select, i);
        }
    }
}

// adds option element to select HTMLElement given iterator
function iterateAddOption(selectElement, iterCount) {
    let option = document.createElement("option");
    option.text = iterCount;
    option.value = iterCount;
    selectElement.options.add(option);
}

// if user data exists in browser, prepopulate form with previous values and display fitness
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
    userProfile = createUserProfile();

    // verify no empty fields
    if (emptyFieldExists(userProfile) || !userProfile) {
        return;
    }

    userProfile.age = calculateAge(userProfile);
    userProfile.height_total_inches = calculateTotalInches(userProfile);
    userProfile.bmi = calculateBMI(userProfile);
    userProfile.fitness_level = calculateFitness(userProfile);

    // display fitness level to page
    displayFitness(userProfile.fitness_level);

    // store data in browser
    console.log("storing data to session storage");
    sessionStorage.userProfile = JSON.stringify(userProfile);
    sessionStorage.fitnessLevel = JSON.stringify(userProfile.fitness_level);
}

// create a userProfile object from html data field values
function createUserProfile() {
    // create user_profile object from datafields
    try {
        let userProfile = {
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
        return userProfile;
    } catch (error) {
        console.error("Radio button not selected");
        return null;
    }
}

function calculateAge(userProfile) {
    return currentYear - parseInt(userProfile.bday_year);
}

function calculateTotalInches(userProfile) {
    return (
        12 * parseInt(userProfile.height_feet) +
        parseInt(userProfile.height_inches)
    );
}

// takes user weight(pounds) and height (inches), returns BMI:float
function calculateBMI(userProfile) {
    return (
        (userProfile.weight_pounds / userProfile.height_total_inches ** 2) * 703
    );
}

// Reveals HTML elements for results, add and colorize Fitness Level Result text
function displayFitness(fitnessLevel) {
    // reveal hidden html elements displaying result
    document.getElementById("yourResultText").hidden = false;
    document.getElementById("profilePrompt").hidden = false;

    displayFitnessLevelText(fitnessLevel);
}

// update or add text of user Fitness Level
function displayFitnessLevelText(fitnessLevel) {
    let yourResult = document.getElementById("yourResultText");
    let fitnessDisplay = document.getElementById("fitness_result");

    // fitnessLevel element already exists. Update fitness level text
    if (typeof fitnessDisplay != "undefined" && fitnessDisplay != null) {
        fitnessDisplay.textContent = fitnessLevel;
    } else {
        // create a span and add fitness level Text
        fitnessDisplay = document.createElement("span");
        fitnessDisplay.setAttribute("id", "fitness_result");
        fitnessDisplay.textContent = fitnessLevel;

        // append newly created span
        yourResult.appendChild(fitnessDisplay);
    }
    colorizeFitnessLevelText(fitnessLevel, fitnessDisplay);
}

function colorizeFitnessLevelText(fitnessLevel, fitnessDisplay) {
    // change color of result
    if (fitnessLevel == FITNESS_LEVEL_LOW) {
        fitnessDisplay.style.color = "red";
    } else if (fitnessLevel == FITNESS_LEVEL_MID) {
        fitnessDisplay.style.color = "orange";
    } else if (fitnessLevel == FITNESS_LEVEL_HIGH) {
        fitnessDisplay.style.color = "green";
    }
}

/**
 * Algorithm for estimating user fitness level.
 * BMI, age, and daily activity level values result in different point values.
 * Point values are used to classify user as "low", "medium", or "high" fitness
 */
function calculateFitness(userProfile) {
    let bmi = userProfile.bmi;
    let age = userProfile.age;
    let activity_level = userProfile.activity_level;

    let fitness_points = 0;

    fitness_points = activity_level_calc(fitness_points, activity_level)

    fitness_points = bmi_calc(bmi, fitness_points)

    if (age > 70 || age < 6) {
        fitness_points -= 1;
    }

    let fitness_level;
    if (fitness_points <= 1) {
        fitness_level = "Low Fitness";
    } else if (fitness_points == 2 || fitness_points == 3) {
        fitness_level = "Medium Fitness";
    } else if (fitness_points >= 4) {
        fitness_level = "High Fitness";
    }

    return fitness_level;
}


/* This function changes the fitness level points of the user 
based on the user's activity level for the user's fitness level calc*/
function activity_level_calc(fitness_points, activity_level)
{
   // Assign the user fitness points based on their activity level
   if (activity_level == "Sedentary") {
      fitness_points = 1;
  } else if (activity_level == "Lightly Active") {
      fitness_points = 2;
  } else if (activity_level == "Moderately Active") {
      fitness_points = 3;
  } else if (activity_level == "Highly Active") {
      fitness_points = 4;
  }
  return fitness_points
}


/* This function changes the fitness_points of the user based on their 
input BMI for the user's fitness level calculation */
function bmi_calc(bmi, fitness_points)
{
   // modify the user's fitness points based on their bmi
   if (bmi > 40) {
      fitness_points -= 4;
  } else if (bmi > 35) {
      fitness_points -= 3;
  } else if (bmi > 30) {
      fitness_points -= 2;
  } else if (bmi > 25) {
      fitness_points -= 1;
  } else if (bmi < 5) {
      fitness_points -= 4;
  } else if (bmi < 10) {
      fitness_points -= 3;
  } else if (bmi < 15) {
      fitness_points -= 2;
  } else if (bmi < 18.5) {
      fitness_points -= 1;
  }
   return fitness_points
}


function emptyFieldExists(userProfile) {
    // check that the user selected values for dropdown lists
    for (key in userProfile) {
        if (userProfile[key] === "") {
            console.error("Empty select list");
            return true;
        }
    }
    return null;
}

function initializeRadioTooltips() {
    // initialize popup for question icon tooltips
    $(".question.icon.tooltip").popup({
        inline: false,
    });

    // initialize popups for radio buttons on calculator form
    $(".radio.checkbox.sedentary").popup({
        title: "Sedentary",
        content:
            "Occupation requires mostly sitting and little to no physical exertion. Less than 30 minutes of intentional exercise per day.",
        position: "top center",
    });

    $(".radio.checkbox.lightly_active").popup({
        title: "Lightly Active",
        content:
            "Daily exercise equivalent to 30 minutes of walking, or 15 minutes of vigorous activity such as jogging.",
        position: "top center",
    });

    $(".radio.checkbox.moderately_active").popup({
        title: "Moderately Active",
        content:
            "Daily exercise equivalent of 100 minutes of walking, or 50 minutes of vigorous activity such as jogging.",
        position: "top center",
    });

    $(".radio.checkbox.highly_active").popup({
        title: "Highly Active",
        content:
            "Occupation requires heavy physical activity for most of the day (e.g. carpenter), or 2 hours of vigorous activity such as jogging.",
        position: "top center",
    });
}
