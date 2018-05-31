$(document).ready(function () {
  autocompletePlace();
  initMap();
});


function initMap() {

  var location = new google.maps.LatLng(53.3811, -1.4701);

  var geocode = new google.maps.Geocoder();

  var infoWindow = new google.maps.InfoWindow;

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: location,
    mapTypeId: 'roadmap'
  })

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('You are here');
      infoWindow.open(map);
      map.setCenter(pos);

    }, function () {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  geocodeAddress(geocode, map);

};

function geocodeAddress(geocoder, resultsMap) {
  var address;
  var address1 = $('#address').children().eq(0).text();
  var address2 = $('#address').children().eq(1).text();
  address = address1 + address2
  console.log("address for geocode " + address);
  geocoder.geocode({
    'address': address
  }, function (results, status) {
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

function autocompletePlace() {

  var placeSearch, autocomplete;

  var restaurantForm = {
    nr: 'long_name',
    street: 'long_name',
    city: 'long_name',
    county: 'long_name',
    country: 'long_name',
    postcode: 'short_name'
  }
  initAutocomplete();

  function initAutocomplete() {
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    autocomplete = new google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */
      (document.getElementById('search-address')), {
        types: ['geocode']
      });

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    autocomplete.addListener('place_changed', fillInAddress);
  }

  function fillInAddress() {
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();
    var counter = 0;

    for (var component in restaurantForm) {
      document.getElementById(component).value = '';
      document.getElementById(component).disabled = false;
      document.getElementById(component).value = place.address_components[counter].long_name;
      counter++;
    }
  }
}