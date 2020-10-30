window.onload = () => {
    // Populate drop-down lists
    userData = getUserData();
    if (userData) {
        console.log("USER DATA FOUND - proceeding with profile page");
    } else {
        console.log("USER DATA NOT FOUND - redirecting to form");
        window.location.href = "calculator.html";
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

var fitnessLevel = document.getElementById("fitness_level");
fitnessLevel.textContent = sessionStorage.fitnessLevel;
