let getDirections = () => {
	fromLocation = document.getElementById("from").value;
	toLocation = document.getElementById("to").value;

	// Additional ideas: input validation/sanitation, default values in the buttons

	// set the saddr and daddr name attributes for the inputs
	let fromInput = document.getElementById("from");
	fromInput.setAttribute("name", "saddr");
	// set the value that was retrieved from user input for from and to
	fromInput.value = fromLocation;

	let toInput = document.getElementById("to");
	toInput.setAttribute("name", "daddr");
	toInput.value = toLocation;

	// redirect using the submit form
	document.getElementById("toGoogleMaps").submit();
}