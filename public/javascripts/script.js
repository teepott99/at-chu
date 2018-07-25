//Leaflet

//Map 
var map = L.map('mapid').setView([25.7617, -80.1918], 5);

//Map Styles
L.tileLayer('https://api.mapbox.com/styles/v1/teepott/cjjvtbvb30qi82rlah9vvh16o/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidGVlcG90dCIsImEiOiJjamp2dDZxYXI5dGV6M2twMTlnMnlkdW12In0.6mzsSubKcXrowebXFnNzgg', {
    // attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'your.mapbox.access.token'
}).addTo(map);

//Leaflet Geosearch Setup

function drawLine(userCord, tagCord){
  console.log("Coordinates for draw", userCord, tagCord)

  var polyline = L.polyline([
    userCord,
    tagCord,
  ]
    ).addTo(map);
};



// var polyline = L.polyline([
//   [25.7617, -80.1918],
//   [51.5074, -0.076132],
// ]
//   ).addTo(map);



// function callPopUp() {
//   var popup = L.popup()
//   .setLatLng([25.7617, -80.1918])
//   .setContent('{{this.name}} in {{this.location}}')
//   .openOn(map);
// }

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