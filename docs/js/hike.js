document.getElementById("Hike_Search_Bar")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (KeyboardEvent.code === 13) {
        document.getElementById("Search_Button").click();
    }
});
