var map;
var sf = {lat: 37.7749, lng: -122.4194};

/**
 * The CenterControl adds a control to the map that recenters the map on
 * sf.
 * This constructor takes the control DIV as an argument.
 * @constructor
 */
 var map, infoWindow;

       function initMap() {
         map = new google.maps.Map(document.getElementById('map'), {
           center: {lat: -34.397, lng: 150.644},
           zoom: 15
         });
         infoWindow = new google.maps.InfoWindow;

         // Try HTML5 geolocation.
         if (navigator.geolocation) {
           navigator.geolocation.getCurrentPosition(function(position) {
             var pos = {
               lat: position.coords.latitude,
               lng: position.coords.longitude
             };

             infoWindow.setPosition(pos);
             // infoWindow.setContent('Location found.');
             // infoWindow.open(map);
             map.setCenter(pos);
             createMarker(pos["lat"], pos["lng"]);
           }, function() {
             handleLocationError(true, infoWindow, map.getCenter());
           });
         }
         else {
           // Browser doesn't support Geolocation
           handleLocationError(false, infoWindow, map.getCenter());
         }


       }

       function handleLocationError(browserHasGeolocation, infoWindow, pos) {
         infoWindow.setPosition(pos);
         infoWindow.setContent(browserHasGeolocation ?
                               'Error: The Geolocation service failed.' :
                               'Error: Your browser doesn\'t support geolocation.');
         infoWindow.open(map);
       }

       // Create marker function
       function createMarker(lat, lng) {
           marker = new google.maps.Marker({
               map: map,
               animation: google.maps.Animation.DROP,
               position: {lat, lng}
           });
       }

       function initAutocomplete() {
         var map = new google.maps.Map(document.getElementById('map'), {
           center: {lat: -33.8688, lng: 151.2195},
           zoom: 13,
           mapTypeId: 'roadmap'
         });

         // Create the search box and link it to the UI element.
         var input = document.getElementById('pac-input');
         var searchBox = new google.maps.places.SearchBox(input);
         map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

         // Bias the SearchBox results towards current map's viewport.
         map.addListener('bounds_changed', function() {
           searchBox.setBounds(map.getBounds());
         });

         var markers = [];
         // Listen for the event fired when the user selects a prediction and retrieve
         // more details for that place.
         searchBox.addListener('places_changed', function() {
           var places = searchBox.getPlaces();

           if (places.length == 0) {
             return;
           }

           // Clear out the old markers.
           markers.forEach(function(marker) {
             marker.setMap(null);
           });
           markers = [];

           // For each place, get the icon, name and location.
           var bounds = new google.maps.LatLngBounds();
           places.forEach(function(place) {
             if (!place.geometry) {
               console.log("Returned place contains no geometry");
               return;
             }
             var icon = {
               url: place.icon,
               size: new google.maps.Size(71, 71),
               origin: new google.maps.Point(0, 0),
               anchor: new google.maps.Point(17, 34),
               scaledSize: new google.maps.Size(25, 25)
             };

             // Create a marker for each place.
             markers.push(new google.maps.Marker({
               map: map,
               icon: icon,
               title: place.name,
               position: place.geometry.location
             }));

             if (place.geometry.viewport) {
               // Only geocodes have viewport.
               bounds.union(place.geometry.viewport);
             } else {
               bounds.extend(place.geometry.location);
             }
           });
           map.fitBounds(bounds);
         });
       }







//Here was working

// var data = '{"places":[' +
// '{"title":"Starbucks","description":"Get your coffee" },' +
// '{"title":"Dunkin Donuts","description":"Get your Donuts" },' +
// '{"title":"Samantha Perfumes","description":"Perfume samples for free everyday!" }]}';

// obj = JSON.parse(data);


// for (var element in obj.places) {
   
//        var title = obj.places[element].title;
//        var description =  obj.places[element].description;
//        var badge = document.createElement('div');

//         badge.innerHTML = 
//          '<div class="info-panel-overview">' +
//                      '<div class="row">' +
//                       ' <div class="col-sm-4"> <img src="images/starbucks-logo.jpg" alt="..." class="img-fluid"> </div>'
//                         ' <div class="col-sm-8"> <p>' +
//                             title + '</p>  <p>' + description + '<p>'

//                      +  '</p> </div>' +
//                    ' </div>' +
//                  '</div>';


//          badge.innerHTML =
//              '<div class="info-panel-overview"> <div class="row"> <div class="col-sm-4"> <img src="images/starbucks-logo.jpg" alt="..." class="img-fluid"> </div> <div class="col-sm-8"> <p>' + title + ' ' + description + '</div></div></div>';


//         //I gave the div the same ID's as the keys in the object for ease

//         document.getElementById("element").appendChild(badge);
    
}






