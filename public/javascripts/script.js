document.addEventListener('DOMContentLoaded', () => {

}, false);

$('.menu-class.sidebar')
  .sidebar('setting', 'transition', 'overlay')
  .sidebar('toggle')
;

var mymap = L.map('mapid').setView([51.505, -0.09], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/teepott/cjjvtbvb30qi82rlah9vvh16o/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidGVlcG90dCIsImEiOiJjamp2dDZxYXI5dGV6M2twMTlnMnlkdW12In0.6mzsSubKcXrowebXFnNzgg', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);


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

