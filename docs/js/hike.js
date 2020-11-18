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
//array to store nearby trails
let trailArray = [];

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
         retrieveLatitudeLongitude(results);
      } 
      // Provide an error id the address does not exist
      else 
      {
         alert("Geocode was not successful for the following reason: " + status);
      } 
   });
}

function retrieveLatitudeLongitude(results) {
  latitude = results[0].geometry.location.lat();
  longitude = results[0].geometry.location.lng();
         
  // Print to the console for testing
  console.log(latitude); 
  console.log(longitude); 

  //call getNearbyTrails() for hiking API
  getNearbyTrails(latitude, longitude);
}

/*Summary: The autoComplete function instantiates when the page loads and autocompletes the address the user may be typing. It provides the user with options to autocomplete the entry */
function autoCompleteLocationSearchBar() 
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


/*IN PROGRESS: create divs for each trail with trail info*/
let makeTrailDivs = (trails) => {
   let parentDiv = document.getElementById("trails");
   while (parentDiv.firstChild) {
      parentDiv.firstChild.remove();
   }
   let hikingAPIInfo = document.createElement("p");
   let APIText = document.createTextNode("All trail photos and information from https://www.hikingproject.com");
   hikingAPIInfo.appendChild(APIText);
   parentDiv.appendChild(hikingAPIInfo);
   hikingAPIInfo = document.createElement("p");
   APIText = document.createTextNode("Click on a trail's image to go to the hikingproject page");
   hikingAPIInfo.appendChild(APIText);
   parentDiv.appendChild(hikingAPIInfo);

   for (i in trails) {
     //create a trail div to hold all trail information
     let newTrailDiv = document.createElement("div");
     newTrailDiv.className = "one column centered row"
     newTrailDiv.id = "trail"+i.toString();
     //create img element for trail photo
     let trailImage = document.createElement("img");
     //add the image source
     trailImage.src = trails[i].photo;
     trailImage.onclick = function (trail) {
        return function() {
         sessionStorage.setItem('trail', JSON.stringify(trail));
         window.location.href = "recommend.html";
        }
     }(trails[i]);
     //append img element to newTrailDiv
     newTrailDiv.appendChild(trailImage);

     //create trail name header element
     let trailName = document.createElement("h2");
     let trailNameText = document.createTextNode(trails[i].name)
     trailName.appendChild(trailNameText);
     newTrailDiv.appendChild(trailName)
     
     //create trail location paragraph
     let trailLocation = document.createElement("p");
     let trailLocationText = document.createTextNode(trails[i].location);
     trailLocation.appendChild(trailLocationText);
     newTrailDiv.append(trailLocation);
     
     //create trail latitude/longitude paragraph element
     let trailLatLon = document.createElement("p");
     // Add a pin image to each trail next to the lat and lon
     let pinImage = document.createElement("img"); 
     pinImage.src="http://clipart-library.com/image_gallery/n622173.jpg"; 
     pinImage.style.width = '6%'; 
     pinImage.style.height = 'auto'; 
     let trailLatLonText = document.createTextNode("Lat: "+trails[i].latitude+"     Lon: "+trails[i].longitude);
     trailLatLon.appendChild(pinImage); //Add pin image next to location
     trailLatLon.appendChild(trailLatLonText);
     newTrailDiv.appendChild(trailLatLon);

     //create trail difficulty element
     let trailDiff = document.createElement("p");
     let trailDiffText = document.createTextNode(trails[i].difficulty);
     let difficultyButton = document.createElement("BUTTON"); 
     difficultyButton.setAttribute("class", "difficultyButton");
     difficultyButton.setAttribute("onclick", "showDifficultyGuide()");
     let buttonText = document.createTextNode("?"); 
     difficultyButton.appendChild(buttonText); 
     trailDiff.appendChild(trailDiffText);
     trailDiff.appendChild(difficultyButton); 
     newTrailDiv.appendChild(trailDiff);
     
     // Colorize and bolden the text for each trail given its difficulty
     modifyTrailDifficultyColor(trails[i].difficulty, trailDiff); 

     //create trail length paragraph element
     let trailLength = document.createElement("p");
     let trailLengthText = document.createTextNode("Length: "+trails[i].length+" miles");
     trailLength.appendChild(trailLengthText);
     newTrailDiv.appendChild(trailLength);
     
     //make From: To: div elements for each trail
     let directionsNode = document.getElementById("directionsHolder");
     let directionsNodeClone = directionsNode.cloneNode(true);
     directionsNodeClone.style.display = "";
     directionsNodeClone.childNodes[1].childNodes[7].value = trails[i].name;
     newTrailDiv.appendChild(directionsNodeClone);

     //append newly created trail div to the main trails div holder on hike.html
     parentDiv.appendChild(newTrailDiv);
   }

}

class Trail {
   constructor(length, lat, lon, highestElevation, elevationGain, difficulty, photo, name, location) {
      this.length = length;
      this.latitude = lat;
      this.longitude = lon;
      this.highestElevation = highestElevation;
      this.elevationGain = elevationGain;
      this.difficulty = difficulty;
      this.photo = photo;
      this.name = name;
      this.location = location;
   }
}


/*Builds trail objects from API call of getNearbyTrails() */
let buildTrails = (trails) => {
   trailArray = [];
   trailArray.length = 0;
   for (i in trails) {
      if (trails[i].difficulty === 'black' || trails[i].difficulty === 'blueBlack') {
         trails[i].difficulty = 'HARD';
      } else if (trails[i].difficulty === 'blue') {
         trails[i].difficulty = 'MEDIUM'; 
      } else if (trails[i].difficulty === 'green' || trails[i].difficulty === 'greenBlue') {
         trails[i].difficulty = 'EASY';
      }
      let newTrail = new Trail(
         trails[i].length, 
         trails[i].latitude, 
         trails[i].longitude, 
         trails[i].high,
         trails[i].high - trails[i].low,
         trails[i].difficulty,
         trails[i].imgMedium,
         trails[i].name,
         trails[i].location
      );
      trailArray.push(newTrail);
   }
   makeTrailDivs(trailArray);
}


/*this function colors the text for each trail's difficulty based on 
its difficulty level and makes it bold.*/
let modifyTrailDifficultyColor = (difficulty, trailDiff) =>
{
   // Bolden each trail and color it accordingly. 
   if(difficulty === 'EASY')
   {   
      trailDiff.style.color = 'green';
      trailDiff.style.fontWeight = "900"
   }
   else if(difficulty === 'MEDIUM')
   {  
      trailDiff.style.color = 'orange';
      trailDiff.style.fontWeight = "900"
   }
   else if(difficulty === 'HARD')
   {  
      trailDiff.style.color = 'red';
      trailDiff.style.fontWeight = "900"
   }
}


/* this function displays the popup difficulty guide when the user
clicks a button to learn more. */
function showDifficultyGuide()
{
   $('.difficultyGuide').show();
}

/* Hides the difficulty guide*/
function hideDifficultyGuide ()
{
   $('.difficultyGuide').hide();
}


// NavigateToTrail gets the input text the user entered in the From and To field on a particular trail and brings the user to google maps with the from and to boxes filled when they click the button. 
function navigateToTrail(thisTrail)
{
   // Find the location of the form attached to this button
   var form = thisTrail.parentNode.childNodes[1];

   // Set an id for the From input box on the trail
   form.childNodes[3].id = "trailFrom"; 

   // Set an id for the To input box on the trail
   form.childNodes[7].id = "trailTo"; 

   // get the value entered in the From and To field
   fromLocation = document.getElementById('trailFrom').value;
   toLocation = document.getElementById('trailTo').value;

   // set the saddr and daddr name attributes for the inputs
   let fromInput = document.getElementById('trailFrom');
   fromInput.setAttribute("name", "saddr");
   // set the value that was retrieved from user input for from and to
   fromInput.value = fromLocation;

   let toInput = document.getElementById('trailTo');
   toInput.setAttribute("name", "daddr");
   toInput.value = toLocation;

   // Set an id for the form to be submitted
   form.id = "trailForm"; 

   // redirect using the submit form
   document.getElementById("trailForm").submit();
} 

/*IN PROGRESS: get all nearby trails based on 15 miles from Hiking API  */
let getNearbyTrails = (latitude, longitude) => {
   latString = latitude.toString();
   lonString = longitude.toString();
   const PROXY_URL = 'https://pathfinder-osu-cs361.herokuapp.com/';
   hikingAPIURL = PROXY_URL + 'https://hikingproject.com/data/get-trails?lat='+latString+'&lon='+lonString+'&maxDistance=15&key=200211115-d5a310327da9942ee690145b2d1ca5fc'
   startLoading();
   fetch(hikingAPIURL)
      .then(response => response.json())
      .then((data) => {
         buildTrails(data.trails);
         filterTrails();
         showBestChoiceButton();
         endLoading();
      })
      .catch((err) => {
         console.log(err);
         endLoading();
      })
}

function showBestChoiceButton() {
   const el = document.getElementById('best_choice_feature');
   el.style.display = '';
}

let startLoading = () => {
   const el = document.getElementById('trailLoader');
   el.className = 'ui active inverted dimmer';
};

let endLoading = () => {
   const el = document.getElementById('trailLoader');
   el.className = '';
};

/**
 * Calculate the best trail difficulty based on user's fitness level and mood.
 * @return null|string - trail difficulty
 */
function calculateBestChoice() {
   const fitnessLevel = JSON.parse(sessionStorage.getItem('fitnessLevel'));
   const userMood = JSON.parse(sessionStorage.getItem('userMood'));
   if (!fitnessLevel) {
      console.error('Could not get fitness level');
      return null;
   }
   if (!userMood) {
      console.error('Could not get user mood');
      return null;
   }

   switch (fitnessLevel) {
      case FITNESS_LEVEL_LOW:
         switch (userMood) {
            case USER_MOOD_LOW:
               return TRAIL_DIFFICULTY_EASY;
            case USER_MOOD_MID:
               return TRAIL_DIFFICULTY_EASY;
            case USER_MOOD_HIGH:
               return TRAIL_DIFFICULTY_MEDIUM;
         }

      case FITNESS_LEVEL_MID:
         switch (userMood) {
            case USER_MOOD_LOW:
               return TRAIL_DIFFICULTY_EASY;
            case USER_MOOD_MID:
               return TRAIL_DIFFICULTY_MEDIUM;
            case USER_MOOD_HIGH:
               return TRAIL_DIFFICULTY_HARD;
         }

      case FITNESS_LEVEL_HIGH:
         switch (userMood) {
            case USER_MOOD_LOW:
               return TRAIL_DIFFICULTY_MEDIUM;
            case USER_MOOD_MID:
               return TRAIL_DIFFICULTY_MEDIUM;
            case USER_MOOD_HIGH:
               return TRAIL_DIFFICULTY_HARD;
         }
   }
}

/**
 * Filter trails by the user's fitness level and mood
 */
function filterTrails() {
   const bestChoiceIsEnabled = JSON.parse(sessionStorage.getItem('bestChoiceIsEnabled'));
   const bestChoice = calculateBestChoice();

   let trailsFound = false;
   trailArray.forEach((trail, index) => {
      const trailDiv = document.getElementById(`trail${index}`);
      const canDisplay = !bestChoiceIsEnabled || trail.difficulty === bestChoice;
      if (canDisplay) {
         trailDiv.style.display = '';
         trailsFound = true;
      } else {
         trailDiv.style.display = 'none';
      }
   });

   if (!trailsFound) {
      showNoTrailsFoundMessage();
   } else {
      hideNoTrailsFoundMessage();
   }
}

function showNoTrailsFoundMessage() {
   const el = document.getElementById('no_trails_found');
   el.style.display = '';
}
function hideNoTrailsFoundMessage() {
   const el = document.getElementById('no_trails_found');
   el.style.display = 'none';
}

// start the autocomplete functionality when the page loads
google.maps.event.addDomListener(window, 'load', autoCompleteLocationSearchBar);