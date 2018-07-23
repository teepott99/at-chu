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

var polyline = L.polyline([
  [25.7617, -80.1918],
  [51.5074, -0.076132],
]
  ).addTo(map);



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
      geocoder.geocode({'address': address}, function(results, status) {
        if (status === 'OK') {
          // document.getElementById('latitude').value = results[0].geometry.location.lat();
          // document.getElementById('longitude').value = results[0].geometry.location.lng();
    
          let address = {lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()};
    
          console.log(address);
          // resultsMap.setCenter(results[0].geometry.location);
          // var marker = new google.maps.Marker({
          //   map: resultsMap,
          //   position: results[0].geometry.location
          // });
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
     };
    }  


// document.addEventListener('submit', async (event) => {
//   //   event.preventDefault();
//   geocodeAddress(geocoder);
// });


// const results = document.getElementById('userLocation');

// document.addEventListener('submit', async (event) => {
//   //   event.preventDefault();
// console.log(geocodeAddress(results));
// });

// function geocodeConvert(results, tagResults){
//   const results = document.getElementById('userLocation');
//   const tagResults = document.getElementById('tagLocation');
  

//   document.addEventListener('submit', async (event) => {
//   event.preventDefault();
 
//   const userResults = await provider.search({ query: userInput.value });
//   const tagResults = await provider.search({ query: tagInput.value });
//   console.log(userResults, tagResults);
// }




// var searchControl = L.esri.Geocoding.geosearch().addTo(map);
// // Adding layer groups to search control
// var results = L.layerGroup.addTo(map);

// searchControl.on('results', function(data){
//   results.clearLayers();
//   for(var i=data.results.length - 1; i>=0; i--){
//     results.addLayer(L.marker(data.results[i].latlng));
//   }
// })



// const { 
//   GeoSearchControl, 
//   OpenStreetMapProvider,
// } = window.GeoSearch;

// // const form = document.querySelector('form');
// // const input = form.querySelector('input[type="text"]');
// // const results = document.getElementById('results');

// const provider = new OpenStreetMapProvider();
 
// const form = document.getElementById('postForm');
// const userInput = form.getElementById('userLocation');
// const tagInput = form.getElementById('tagLocation');
 
// form.addEventListener('submit', async (event) => {
//   event.preventDefault();
 
//   const userResults = await provider.search({ query: userInput.value });
//   const tagResults = await provider.search({ query: tagInput.value });
//   console.log(userResults, tagResults); // » [{}, {}, {}, ...]
// });

 


//NEED TO UPDATE ACTIVE NAV TAB PER PAGE
// $('.tabular.menu .item').tab();

// $('.item')

// //Update Nav Bar Active class
// const link = $("a[href$='']")

// (function(e) {
//   // e.preventDefault();
//   $('.item').removeClass('active');
//   $(this).addClass('active');
// });

