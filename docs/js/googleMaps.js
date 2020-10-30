let getDirections = () => {
	fromLocation = document.getElementById("from").value;
	toLocation = document.getElementById("to").value;

	// redirect using the submit form
	document.getElementById("toGoogleMaps").submit();
}