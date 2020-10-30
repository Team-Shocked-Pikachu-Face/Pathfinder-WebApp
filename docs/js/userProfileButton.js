function profileButtonRedirect() {
    console.log("user profile clicked");
    if (sessionStorage.userProfile) {
        console.log("USER DATA FOUND - continuing to profile page");
        window.location.href = "profile.html";
    } else {
        console.log("USER DATA NOT FOUND - redirecting to calculator page");
        alert("Please fill out basic information to access User Profile!")
        window.location.href = "calculator.html";
    }
}
