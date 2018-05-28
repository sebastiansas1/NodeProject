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
  
  
