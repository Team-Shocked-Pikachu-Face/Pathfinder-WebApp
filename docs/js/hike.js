document.getElementById("Hike_Search_Bar")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (KeyboardEvent.code === 13) {
        document.getElementById("Search_Button").click();
    }
});


var latitude; 
var longitude; 


function geolocate()
{
   console.log("test"); 

   var geocoder; 

   geocoder = new google.maps.Geocoder();

   var address = document.getElementById("Hike_Search_Bar").value;

   console.log(address);

   geocoder.geocode({'address': address}, function(results, status) 
   {  
      console.log("testing function"); 
      
      if(status == 'OK') 
      {
         console.log("good status");
         latitude = results[0].geometry.location.lat();
         longitude = results[0].geometry.location.lng();
         console.log(latitude); 
         console.log(longitude); 
      } 
      else 
      {
         console.log("bad status");
         alert("Geocode was not successful for the following reason: " + status);
      } 
   });
}


function autoComplete() 
{
   var address = (document.getElementById('Hike_Search_Bar'));
   
   var autocomplete = new google.maps.places.Autocomplete(address);

   autocomplete.setTypes(['geocode']);

   google.maps.event.addListener(autocomplete,'place_changed',function() {
      var place = autocomplete.getPlace();

      if (!place.geometry) 
      {
         return;
      }

   var address = '';

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

google.maps.event.addDomListener(window, 'load', autoComplete);