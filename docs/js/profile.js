window.onload = () => {
    // Populate drop-down lists
    userData = getUserData();
    if (!userData) {
        console.log("USER DATA NOT FOUND - redirecting to calculator form");
        window.location.href = "calculator.html";  
    } 
    else{
        console.log("USER DATA FOUND - continuing with profile page")
        displayUserSummary(userData);
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
    birthdate = document.getElementById("birthdate");
    birthdate.textContent = `Date of Birth: ${userData["bday_month"]}/${userData["bday_day"]}/${userData["bday_year"]}`
    birthdate = document.getElementById("height");
    birthdate.textContent = `Height: ${userData["height_feet"]} '${userData["height_inches"]}" (${userData["height_total_inches"]} inches)`

    birthdate = document.getElementById("weight");
    birthdate.textContent = `Weight: ${userData["weight_pounds"]} pounds`

    birthdate = document.getElementById("bmi");
    birthdate.textContent = `BMI: ${parseFloat(userData["bmi"]).toFixed(2)} `

    birthdate = document.getElementById("activity_level");
    birthdate.textContent = `Activity Level: ${userData["activity_level"]} `

    birthdate = document.getElementById("fitness_level");
    birthdate.textContent = `Fitness Level: ${userData["fitness_level"]} `



}
