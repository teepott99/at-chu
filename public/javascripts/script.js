// //leaflet geosearch dependencies
// const debounce = require('lodash.debounce');
// const nodent = require('nodent-runtime');
// var leafletGeosearch = require("leaflet-geosearch")

// document.addEventListener('DOMContentLoaded', () => {

// }, false);


//Leaflet

//Map 
var mymap = L.map('mapid').setView([25.7617, -80.1918], 5);

//Map Styles
L.tileLayer('https://api.mapbox.com/styles/v1/teepott/cjjvtbvb30qi82rlah9vvh16o/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidGVlcG90dCIsImEiOiJjamp2dDZxYXI5dGV6M2twMTlnMnlkdW12In0.6mzsSubKcXrowebXFnNzgg', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);

//Leaflet Geosearch Setup

const { 
  GeoSearchControl, 
  OpenStreetMapProvider,
} = window.GeoSearch;

// const provider = new OpenStreetMapProvider();

// const form = document.querySelector('form');
// const input = form.querySelector('input[type="text"]');
// const results = document.getElementById('results');

// form.addEventListener('submit', (event) => {
//   event.preventDefault();

//   provider.search({ query: input.value }).then((results) => {
//     console.log(results);
//   });
// });






// var GeoSearchControl = window.GeoSearch.GeoSearchControl;
// var OpenStreetMapProvider = window.GeoSearch.OpenStreetMapProvider;


const provider = new OpenStreetMapProvider();
 
const form = document.getElementById('postForm');
const userInput = form.getElementById('userLocation');
const tagInput = form.getElementById('tagLocation');
 
form.addEventListener('submit', async (event) => {
  event.preventDefault();
 
  const userResults = await provider.search({ query: userInput.value });
  const tagResults = await provider.search({ query: tagInput.value });
  console.log(userResults, tagResults); // » [{}, {}, {}, ...]
});

 


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

