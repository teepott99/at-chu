//Leaflet

//Map 
var map = L.map('mapid').setView([25.7617, -80.1918], 5);

//Map Styles
L.tileLayer('https://api.mapbox.com/styles/v1/teepott/cjjvtbvb30qi82rlah9vvh16o/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidGVlcG90dCIsImEiOiJjamp2dDZxYXI5dGV6M2twMTlnMnlkdW12In0.6mzsSubKcXrowebXFnNzgg', {
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'your.mapbox.access.token'
}).addTo(map);

//Leaflet Draw Lines for map
function drawLine(userCord, tagCord){

  var userArray = userCord;
  var tagArray = tagCord;
  console.log("Coordinates for draw", userArray, tagArray);
  var polyLine = L.polyline([
    userArray,
    tagArray,
  ]
    ).addTo(map);
};


// function callPopUp(coord) {
//   var popup = L.popup()
//   .setLatLng(coord)
//   .setContent('{{this.name}} in {{this.location}}')
//   .openOn(map);
// }


//Create all lines
var elem = document.getElementsByClassName("loc1");
var elem2 = document.getElementsByClassName("loc2");

for (var i = 0; i < elem.length; ++i) {
  if (typeof elem[i].value !== "undefined") {
      //Pull values currently strings and convert to number arrays
      var one = elem[i].value.split(",").map(Number);
      var two = elem2[i].value.split(",").map(Number);
      drawLine(one, two);
      console.log("Is this working??", one, two);
      // callPopUp(elem[i].value.split(",").map(Number));
    }
  }

// Google Geocoder
function geocode() {
    const geocoder = new google.maps.Geocoder();
    
    geocodeAddress(geocoder);

    function geocodeAddress(geocoder) {
      console.log("helly");
      var address = document.getElementById('address').value;
      var address2 = document.getElementById('tagLocation').value;
      geocoder.geocode({'address': address}, function(results, status) {
        if (status === 'OK') {
          document.getElementById('latitude').value = results[0].geometry.location.lat();
          document.getElementById('longitude').value = results[0].geometry.location.lng();
    
          let address = {lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()};
    
          console.log(address);
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });


      geocoder.geocode({'address': address2}, function(results, status) {
        if (status === 'OK') {

          document.getElementById('tagLatitude').value = results[0].geometry.location.lat();
          document.getElementById('tagLongitude').value = results[0].geometry.location.lng();
    
          let address = {lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()};
    
          console.log(address2);
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });



     };
    };