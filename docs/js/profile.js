window.onload = () => {
    userData = getUserData();

    try {
        displayUserSummary(userData);
    } catch (error) {
        console.error("Please navigate to this page via user button")
    }
    
};

function getUserData() {
    console.log("retrieving user data");
    if (sessionStorage.userProfile) {
        userData = JSON.parse(sessionStorage.userProfile);
        console.log(userData);
        return userData;
    } else {
        console.log("no user data");
        return null;
    }
}

function displayUserSummary(userData){
    user_summary = document.getElementById("user_summary")
    console.log(user_summary);
    for(attribute in userData){
        console.log(`${attribute}: ${userData[attribute]}`)
    }
    let birthdate = document.getElementById("birthdate");
    birthdate.textContent = `${userData["bday_month"]}/${userData["bday_day"]}/${userData["bday_year"]}`;
    
    let height = document.getElementById("height");
    height.textContent = `${userData["height_feet"]} '${userData["height_inches"]}" (${userData["height_total_inches"]} inches)`;

    let weight = document.getElementById("weight");
    weight.textContent = `${userData["weight_pounds"]} pounds`;

    let bmi = document.getElementById("bmi");
    bmi.textContent = `${parseFloat(userData["bmi"]).toFixed(1)} `;

    let activityLevel = document.getElementById("activity_level");
    activityLevel.textContent = `${userData["activity_level"]} `;

    let fitnessLevel = document.getElementById("fitness_level");
    fitnessLevel.textContent = `${userData["fitness_level"]} `;

        // change color of result
    if (userData["fitness_level"] == "Low Fitness") {
        fitnessLevel.style.color = "red";
    } else if (userData["fitness_level"]== "Medium Fitness") {
        fitnessLevel.style.color = "orange";
    } else if (userData["fitness_level"] == "High Fitness") {
        fitnessLevel.style.color = "green";
    }


}
