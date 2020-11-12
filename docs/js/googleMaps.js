// Google Maps URLs documentation: https://developers.google.com/maps/documentation/urls/get-started
// Additional ideas: input validation/sanitation, default values in the buttons
let getDirections = () => {
	// get the elements of the textfields
	fromLocation = document.getElementById("from").value;
	toLocation = document.getElementById("to").value;

	// set the saddr and daddr name attributes for the inputs
	let fromInput = document.getElementById("from");
	fromInput.setAttribute("name", "saddr");
	// set the value that was retrieved from user input for from and to
	fromInput.value = fromLocation;

	let toInput = document.getElementById("to");
	toInput.setAttribute("name", "daddr");
	toInput.value = toLocation;

	// redirect using the submit form
	if (this.id == "toGoogleMaps") {
		document.getElementById("toGoogleMaps").submit();
	} else {
		document.getElementById("directionsHolder").submit();
	}
}