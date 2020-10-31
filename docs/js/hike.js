// Allow the user to search by pressing enter rather than by using the search button
document.getElementById("Hike_Search_Bar")
   .addEventListener("keyup", function(event) {
   event.preventDefault();
   
   // If the enter key is hit, click the search button
   if (KeyboardEvent.code === 13) {
      document.getElementById("Search_Button").click();
   }
});

// initialize variables to store the user location
var latitude; 
var longitude; 

/*Summary: geolocate uses the address the user typed into the search bar and sends it to Google's geocoder. The Geocoder returns the latitude and longitude of the address entered. */
function geolocate()
{
   // Create a geocoder
   var geocoder; 

   geocoder = new google.maps.Geocoder();

   // Retrieve the address entered on the search bar
   var address = document.getElementById("Hike_Search_Bar").value;

   // Geocode the address
   geocoder.geocode({'address': address}, function(results, status) 
   {   
      // If the address exists, get the latitude and longitude
      if(status == 'OK') 
      {
         latitude = results[0].geometry.location.lat();
         longitude = results[0].geometry.location.lng();
         
         // Print to the console for testing
         console.log(latitude); 
         console.log(longitude); 

         //call getNearbyTrails() for hiking API
         // getNearbyTrails(latitude, longitude);
      } 
      // Provide an error id the address does not exist
      else 
      {
         alert("Geocode was not successful for the following reason: " + status);
      } 
   });
}

/*Summary: The autoComplete function instantiates when the page loads and autocompletes the address the user may be typing. It provides the user with options to autocomplete the entry */
function autoComplete() 
{
   // Get the address the user is typing in the search bar
   var address = (document.getElementById('Hike_Search_Bar'));
   
   // Autocomplete the address
   var autocomplete = new google.maps.places.Autocomplete(address);

   // Set the type of entries to search for (cities only, etc.)
   autocomplete.setTypes(['geocode']);

   // Continue to check for changes in user input
   google.maps.event.addListener(autocomplete,'place_changed',function() {
      // Autocomplete a suggestion for a place
      var place = autocomplete.getPlace();

      // If the user enters a place that doesn't exist, return. 
      if (!place.geometry) 
      {
         window.alert("No details available for input: '" + place.name + "'");
         return;
      }

   // instantiate an array to store address suggestions
   var address = '';

   // Show the autocomplete result options to the user via the array
   if (place.address_components) 
   {
      address = [
         (place.address_components[0] && place.address_components[0].short_name || ''),
         (place.address_components[1] && place.address_components[1].short_name || ''),
         (place.address_components[2] && place.address_components[2].short_name || '')
         ].join(' ');
   }
   });
}

/*IN PROGRESS: get all nearby trails based on 15 miles from Hiking API  */
let getNearbyTrails = () => {
   latitude = 40.0274
   latitude = latitude.toString();
   latitude += '&'
   longitude = -105.2519
   longitude = longitude.toString();
   longitude += '&'
   hikingAPIURL = 'https://cors-anywhere.herokuapp.com/https://hikingproject.com/data/get-trails?lat='+latitude+'lon='+longitude+'&maxDistance=15&key=200963130-d1165a7ae0baf0bddd35de87f1df233e'
   console.log(hikingAPIURL)
   fetch(hikingAPIURL, {method:'GET', headers:{'Access-Control-Allow-Origin': '*'}})
   .then(response => response.json())
   .then(data => console.log(data))
}
getNearbyTrails();

// start the autocomplete functionality when the page loads
google.maps.event.addDomListener(window, 'load', autoComplete);