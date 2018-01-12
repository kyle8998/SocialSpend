//const findPeople = require('../data/firebase_push.js').findPeople

var map;
var sf = {lat: 37.7749, lng: -122.4194};

/**
 * The CenterControl adds a control to the map that recenters the map on
 * sf.
 * This constructor takes the control DIV as an argument.
 * @constructor
 */
 var map, infoWindow;

 var markers = [
    {
        "title": 'CIRCA',
        "address": "",
        "phone": "+1 301-483-3448",
        "website": "http://circa.com",
        "lat": 38.8870,
        "lng": -77.0944,
        "place_id": "ChIJVz9MKIS2t4kRoYbQXABqYzQ",
        "num_people": 0,
        "description": 'New American bistro with creative fare, an active bar scene & outdoor seating.'
    },
    {
        "title": 'Giant Food',
        "address": "",
        "phone": "+1 301-484-0380",
        "website": "http://giantfood.com",
        "lat": 38.8856536,
        "lng": -77.10297880000002,
        "place_id": "ChIJmXMR0ym0t4kRNT_fHDYv6xg",
        "num_people": 2,
        "description": 'American supermarket chain with 169 stores and 159 full service pharmacies located in Delaware, Maryland, Pennsylvania, Virginia, and Washington, D.C'
    },
    {
        "title": 'Lyon Hall',
        "address": "",
        "phone": "+1 307-480-3029",
        "website": "http://lyonhall.com",
        "lat": 38.8853862,
        "lng": -77.09520709999998,
        "place_id": "ChIJG_qeQIS2t4kRtvKx8qLclBs",
        "num_people": 3,
        "description": 'Girgaum Beach commonly known as just Chaupati is one of the most famous public beaches in Mumbai.'
    },
    {
        "title": 'Green Pig Bistro',
        "address": "",
        "phone": "+1 284-250-0472",
        "website": "http://greenpigbistro.com",
        "lat": 38.8856541,
        "lng": -77.09261170000002,
        "place_id": "ChIJi8J3wIW2t4kR8hSSyF7i6xE",
        "num_people": 1,
        "description": 'Jijamata Udyan is situated near Byculla station is famous as Mumbai (Bombay) Zoo.'
    },
    {
        "title": 'The Cheesecake Factory',
        "address": "",
        "phone": "+1 390-349-2759",
        "website": "http://cheesecakes.com",
        "lat": 38.8879346,
        "lng": -77.09348239999997,
        "place_id": "EiVXaWxzb24gQmx2ZCwgQXJsaW5ndG9uLCBWQSAyMjIwMSwgVVNB",
        "num_people": 0,
        "description": 'Sanjay Gandhi National Park is a large protected area in the northern part of Mumbai city.'
    },
    {
        "title": 'Whole Food Markets',
        "address": "",
        "phone": "+1 307-502-5428",
        "website": "http://foodmarkets.com",
        "lat": 38.88924,
        "lng": -77.09089599999999,
        "place_id": "ChIJYXu_IIa2t4kRuU7OdddDn3Q",
        "num_people": 2,
        "description": 'Sanjay Gandhi National Park is a large protected area in the northern part of Mumbai city.'
    },
    {
        "title": 'The Container Store',
        "address": "",
        "phone": "+1 240-429-0582",
        "website": "http://containerstore.com",
        "lat": 38.8875227,
        "lng": -77.09207229999998,
        "place_id": " ChIJYTziboa2t4kRUE7mZOR1bEo",
        "num_people": 2,
        "description": 'Sanjay Gandhi National Park is a large protected area in the northern part of Mumbai city.'
    },
    {
        "title": 'Mr Tire Auto Service Centers',
        "address": "",
        "phone": "+1 502-104-5038",
        "website": "http://tireautoservice.com",
        "lat": 38.8960347,
        "lng": -77.13244750000001,
        "place_id": "ChIJ48ZQt0y0t4kRFzUGTP-yH34",
        "num_people": 0,
        "description": 'Sanjay Gandhi National Park is a large protected area in the northern part of Mumbai city.'
    },
    {
        "title": 'Arlington Rooftop Bar & Grill',
        "address": "",
        "phone": "+1 504-294-2954",
        "website": "http://rooftopbargrill.com",
        "lat": 38.8902773,
        "lng": -77.0881602,
        "place_id": "ChIJR-yfSoi2t4kRasSlSd4RHho",
        "num_people": 0,
        "description": 'Sanjay Gandhi National Park is a large protected area in the northern part of Mumbai city.'
    },
    {
        "title": 'Cava Mezze Clarendon',
        "address": "",
        "phone": "+1 301-384-2604",
        "website": "http://circa.com",
        "lat": 38.8902773,
        "lng": -77.0881602,
        "place_id": 'ChIJ5Y-6fYa2t4kRPcvWjkDJoTU',
        "num_people": 3,
        "description": 'Sanjay Gandhi National Park is a large protected area in the northern part of Mumbai city.'
    },


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

                     infoWindow.setContent("<div style = 'width:200px;min-height:40px'>" + data.num_people + " Friends were here recently!</div>");
                     infoWindow.open(map, marker);


                    function setInfoPanelForMarker(data){
                      document.getElementById('place-title').innerHTML = data['title']
                      document.getElementById('place-subtitle').innerHTML = data['description']
                      document.getElementById('place-address').innerHTML = data['address']
                      document.getElementById('place-phone').innerHTML = data['phone']
                      document.getElementById('place-website').innerHTML = data['website']
                      document.getElementById('place-num-of-friends').innerHTML = data['num_people']
                    }

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
