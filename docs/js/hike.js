
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
  
   // Get the latitiude and longitude
   latitude = results[0].geometry.location.lat();
   longitude = results[0].geometry.location.lng(); 

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


let makeTrailDivs = (trails) => {
   let parentDiv = document.getElementById("trails");
   clearTrailDivs(parentDiv);
   createTrailAPIInfoElements(parentDiv);

   for (i in trails) {
     //create a trail div to hold all trail information
     let newTrailDiv = document.createElement("div");
     newTrailDiv.className = "one column centered row"
     newTrailDiv.id = "trail"+i.toString();
     createTrailImage(trails[i], newTrailDiv);
     createTrailNameLocationText(trails[i], newTrailDiv);
     createTrailLatLonPin(trails[i], newTrailDiv);
     createTrailDifficultyElements(trails[i], newTrailDiv);
     createTrailLengthText(trails[i], newTrailDiv);
     createDirectionsElement(trails[i], newTrailDiv);
     parentDiv.appendChild(newTrailDiv);
   }

}

function clearTrailDivs(parentDiv) {
   while (parentDiv.firstChild) {
      parentDiv.firstChild.remove();
   }
}
function createTrailAPIInfoElements(parentDiv) {
   let hikingAPIInfo = document.createElement("p");
   let APIText = document.createTextNode("All trail photos and information from https://www.hikingproject.com");
   hikingAPIInfo.appendChild(APIText);
   parentDiv.appendChild(hikingAPIInfo);
   hikingAPIInfo = document.createElement("p");
   APIText = document.createTextNode("Click on a trail's image to go to the hikingproject page");
   hikingAPIInfo.appendChild(APIText);
   parentDiv.appendChild(hikingAPIInfo);
}
function createTrailImage(trail, newTrailDiv) {
   let trailImage = document.createElement("img");
   trailImage.src = trail.imgMedium; //******** */
   trailImage.onclick = function (trail) {
      return function() {
      // Get the trail's url and navigate to the trail page for the API
      let url = trail.url.toString()
      window.location.href = url;
      }
   }(trail);

   newTrailDiv.appendChild(trailImage);
}
function createTrailNameLocationText(trail, newTrailDiv) {
   let trailName = document.createElement("h2");
   trailName.setAttribute("class", "trail_info")
   let trailNameText = document.createTextNode(trail.name)
   trailName.appendChild(trailNameText);
   newTrailDiv.appendChild(trailName)
   
   //create trail location paragraph
   let trailLocation = document.createElement("p");
   trailLocation.setAttribute("class", "trail_info")
   let trailLocationText = document.createTextNode(trail.location);
   trailLocation.appendChild(trailLocationText);
   newTrailDiv.append(trailLocation);
}
function createTrailLatLonPin(trail, newTrailDiv) {
   // Add a pin image to each trail next to the lat and lon
   let pinImage = document.createElement("img"); 
   pinImage.src="./images/pin.png"; 
   pinImage.style.width = 'auto'; 
   pinImage.style.height = '15px'; 
   pinImage.setAttribute("class", "pin_image")

   let trailLatLon = document.createElement("p");
   let trailLatLonText = document.createTextNode("Lat: "+trail.latitude+" Lon: "+trail.longitude);
   trailLatLon.appendChild(pinImage); //Add pin image next to location
   trailLatLon.appendChild(trailLatLonText);
   newTrailDiv.appendChild(trailLatLon);
}
function createTrailDifficultyElements(trail, newTrailDiv) {
   let trailDiff = document.createElement("p");
   trailDiff.setAttribute("class", "trail_info");
   let trailDiffText = document.createTextNode(trail.difficulty);

   let difficultyButton = document.createElement("BUTTON"); 
   difficultyButton.setAttribute("class", "difficultyButton");
   difficultyButton.setAttribute("title", "Learn more about trail difficulties");
   difficultyButton.setAttribute("onclick", "showDifficultyGuide()");

   let buttonText = document.createTextNode("?"); 
   difficultyButton.appendChild(buttonText); 

   trailDiff.appendChild(trailDiffText);
   trailDiff.appendChild(difficultyButton); 
   newTrailDiv.appendChild(trailDiff);

   modifyTrailDifficultyColor(trail.difficulty, trailDiff); 
}
function createTrailLengthText(trail, newTrailDiv) {
   let trailLength = document.createElement("p");
   trailLength.setAttribute("class", "trail_info");
   let trailLengthText = document.createTextNode("Length: "+trail.length+" miles");
   let gearButton = document.createElement("p");
   let backpackImg = document.createElement("img");

   backpackImg.src="./images/backpackButton.jpg"; 
   backpackImg.style.width = 'auto'; 
   backpackImg.style.height = '30px';
   backpackImg.setAttribute("title", "Trail info/gear recommendations");
   backpackImg.setAttribute("class", "trail_info");
   backpackImg.onclick = function (trail) {
      return function() {
      sessionStorage.setItem('trail', JSON.stringify(trail));
      window.location.href = "recommend.html";
      }
   }(trail);

   trailLength.appendChild(trailLengthText); 
   newTrailDiv.appendChild(trailLength);
   gearButton.appendChild(backpackImg);
   newTrailDiv.appendChild(gearButton); 
}
function createDirectionsElement(trail, newTrailDiv) {
   let directionsNode = document.getElementById("directionsHolder");
   let directionsNodeClone = directionsNode.cloneNode(true);
   directionsNodeClone.style.display = "";
   directionsNodeClone.childNodes[1].childNodes[7].value = trail.name;
   newTrailDiv.appendChild(directionsNodeClone);
}

/*Changes trail object difficulties from API call of getNearbyTrails() */
let calcTrailDifficulty = (trails) => {
   trailArray = [];
   trailArray.length = 0;
   for (i in trails) {
      if (trails[i].difficulty === 'black' || trails[i].difficulty === 'blueBlack') {
         trails[i].difficulty = TRAIL_DIFFICULTY_HARD;
      } else if (trails[i].difficulty === 'blue') {
         trails[i].difficulty = TRAIL_DIFFICULTY_MEDIUM; 
      } else if (trails[i].difficulty === 'green' || trails[i].difficulty === 'greenBlue') {
         trails[i].difficulty = TRAIL_DIFFICULTY_EASY;
      }
      trailArray.push(trails[i]);
   }
   makeTrailDivs(trails);
}


/*this function colors the text for each trail's difficulty based on 
its difficulty level and makes it bold.*/
let modifyTrailDifficultyColor = (difficulty, trailDiff) =>
{
   // Bolden each trail and color it accordingly. 
   if(difficulty === TRAIL_DIFFICULTY_EASY)
   {   
      trailDiff.style.color = 'green';
      trailDiff.style.fontWeight = "900"
   }
   else if(difficulty === TRAIL_DIFFICULTY_MEDIUM)
   {  
      trailDiff.style.color = 'orange';
      trailDiff.style.fontWeight = "900"
   }
   else if(difficulty === TRAIL_DIFFICULTY_HARD)
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

/* Get all nearby trails based on 15 miles from Hiking API  */
let getNearbyTrails = (latitude, longitude) => {
   latString = latitude.toString();
   lonString = longitude.toString();
   const PROXY_URL = 'https://pathfinder-osu-cs361.herokuapp.com/';
   hikingAPIURL = PROXY_URL + 'https://hikingproject.com/data/get-trails?lat='+latString+'&lon='+lonString+'&maxDistance=15&key=200211115-d5a310327da9942ee690145b2d1ca5fc'
   startLoading();
   fetch(hikingAPIURL)
      .then(response => response.json())
      .then((data) => {
         calcTrailDifficulty(data.trails);
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

   result = calculateDifficulty(fitnessLevel, userMood)
   return result
}


/* This function determines the difficulty of trails to recommend 
to the user based on the user's fitness level and their input mood */
function calculateDifficulty(fitnessLevel, userMood)
{
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