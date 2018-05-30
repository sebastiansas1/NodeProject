$(document).ready(function(){
  initMap();

});



function initMap(){
 
  var location = new google.maps.LatLng(53.3811, -1.4701);
  
  var geocode = new google.maps.Geocoder();
  
  var infoWindow = new google.maps.InfoWindow;

   // Try HTML5 geolocation.
   if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('You are here');
      infoWindow.open(map);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }


  var map = new google.maps.Map(document.getElementById('map'),{
    zoom: 18,
    center: location,
    mapTypeId: 'roadmap'
  })

  geocodeAddress(geocode, map);
};

function geocodeAddress(geocoder, resultsMap) {
  var address;
  var address1 = $('#address').children().eq(0).text();
  var address2 = $('#address').children().eq(1).text();
  address = address1 + address2
  console.log("address for geocode " + address);
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === 'OK') {
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

// $(document).on("ready page:load", loadMap);

// function loadMap () {

//     var map;
//     var EpiGenesys = new google.maps.LatLng(53.38268939075736, -1.4710334784347197);

//     var panoramaOptions = {
//         position: EpiGenesys,
//         pov: {
//           heading: 4,
//           pitch: 10
//         }
//     };

//     map = new google.maps.Map(document.getElementById('map'), {
//         zoom: 18,
//         center: EpiGenesys,
//         mapTypeId: 'roadmap'
//     });

//     var marker = new google.maps.Marker({
//         position: EpiGenesys,
//         map: map,
//         title: 'EpiGenesys'
//       });
    
// }

// function initialize() {
//     var EpiGenesys = new google.maps.LatLng(53.38268939075736, -1.4710334784347377);

  
//     var mapOptions = {
//       center: EpiGenesys,
//       zoom: 17
//     };
//     var map = new google.maps.Map(
//       document.getElementById('map'), mapOptions);
//     var marker1 = new google.maps.Marker({
//       position: EpiGenesys,
//       map: map,
//       title: 'Entrance'
//     });
//     var panoramaOptions = {
//       position: EpiGenesys,
//       pov: {
//         heading: 272,
//         pitch: -2
//       }
//     };
//     var panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'), panoramaOptions);
//     var marker2 = new google.maps.Marker({
//       position: EpiGenesys,
//       map: panorama,
//       title: 'Entrance'
//     });
//     map.setStreetView(panorama);
//   }
  
  
