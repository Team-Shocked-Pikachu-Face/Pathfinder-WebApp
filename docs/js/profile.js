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
    birthdate = document.getElementById("birthdate");
    birthdate.textContent = `${userData["bday_month"]}/${userData["bday_day"]}/${userData["bday_year"]}`
    birthdate = document.getElementById("height");
    birthdate.textContent = `${userData["height_feet"]} '${userData["height_inches"]}" (${userData["height_total_inches"]} inches)`

    birthdate = document.getElementById("weight");
    birthdate.textContent = `${userData["weight_pounds"]} pounds`

    birthdate = document.getElementById("bmi");
    birthdate.textContent = `${parseFloat(userData["bmi"]).toFixed(2)} `

    birthdate = document.getElementById("activity_level");
    birthdate.textContent = `${userData["activity_level"]} `

    birthdate = document.getElementById("fitness_level");
    birthdate.textContent = `${userData["fitness_level"]} `



}
