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