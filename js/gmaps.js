var map;
var sf = {lat: 37.7749, lng: -122.4194};

/**
 * The CenterControl adds a control to the map that recenters the map on
 * sf.
 * This constructor takes the control DIV as an argument.
 * @constructor
 */
 var map, infoWindow, longitude, latitude;

 var markers = [
    {
        "title": 'CIRCA',
        "lat": 38.8870,
        "lng": -77.0944,
        "description": 'Aksa Beach is a popular beach and a vacation spot in Aksa village at Malad, Mumbai.'
    },
    {
        "title": 'Giant Foods',
        "lat": 38.8856536,
        "lng": -77.10297880000002,
        "description": 'Juhu Beach is one of favourite tourist attractions situated in Mumbai.'
    },
    {
        "title": 'Lyon Hall',
        "lat": 38.8853862,
        "lng": -77.09520709999998,
        "description": 'Girgaum Beach commonly known as just Chaupati is one of the most famous public beaches in Mumbai.'
    },
    {
        "title": 'Green Pig Bistro',
        "lat": 38.8856541,
        "lng": -77.09261170000002,
        "description": 'Jijamata Udyan is situated near Byculla station is famous as Mumbai (Bombay) Zoo.'
    },
    {
        "title": 'The Cheesecake Factory',
        "lat": 38.8879346,
        "lng": -77.09348239999997,
        "description": 'Sanjay Gandhi National Park is a large protected area in the northern part of Mumbai city.'
    }
    ];

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
             /*
             createMarker(pos["lat"], pos["lng"]);
*/
             for (var i = 0; i < markers.length; i++) {
               var data = markers[i];

               createMarker(markers[i].lat, markers[i].lng);
               console.log(markers[i].lat);
               console.log(markers[i].lng);

             //Attach click event to the marker.
             (function (marker, data) {
                 google.maps.event.addListener(marker, "click", function (e) {
                     //Wrap the content inside an HTML DIV in order to set height and width of InfoWindow.

                     infoWindow.setContent("<div style = 'width:200px;min-height:40px'>" + data.description + "</div>");
                     infoWindow.open(map, marker);

                 });
             })(marker, data);
         }

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

/*
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

      */
