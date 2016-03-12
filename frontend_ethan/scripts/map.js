
username = 'locafox';
password = 'LocaF#xes!';
       var map;
       var marker = [];
mapCordinates = {

    authenticate: function () {
        $.ajax({
            username: 'locafox',
            password: 'LocaF#xes!',
            url: 'https://foxtest.herokuapp.com',
            type: 'GET',
            dataType: 'json',
            crossDomain: true,
            data: { username: 'locafox', password: 'LocaF#xes!' },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization",
                    "Basic " + (username + ":" + password));
            },
            sucess: function (result) {
                //out('done');
                mapCordinates.getToken();
            }
        });
    },
    getToken: function () {
        $.ajax({
            method: "POST",
            url: 'https://foxtest.herokuapp.com/v1/token',
            headers: {
                "Authorization": "Basic " + btoa(username + ":" + password)
            },
            success: function (data) {
                //console.log("token: " + data);
                mapCordinates.getMapCordinates(data.token);
            }
        })
    },
    getMapCordinates: function (token) {
        $.ajax({
            method: "POST",
            url: 'https://foxtest.herokuapp.com/v1/offers',
            data: { 'token': token },
            headers: {
                "Authorization": "Basic " + btoa(username + ":" + password)
            },
            success: function (data) {
                //console.log("co-ordinates: " + data);
                getMapPins.getValues(data);
            }
        })
    }
}

getMapPins = {
    getValues: function (object) {
        var id = 0;
        var lat = 0;
        var longitude = 0;
        for (var i = 0; i <= object.length; i++) {
            //console.log("object: " + i + " " + object[i]);
            id = object[i].id;
            lat = object[i].lat;
            longitude = object[i].long;
            //console.log("object: " + " " + id + " " + lat + " " + long);
            getMapPins.setMarkers(id, lat, longitude);
        }
    },

    setMarkers: function (id, lat, longitude) {

        var latlng = new google.maps.LatLng(lat, longitude);
        var myOptions = {
            zoom: 6,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        map = new google.maps.Map(document.getElementById("map"), myOptions);
		markers = new google.maps.Marker({
			position: latlng,
			map: map
		});
		marker[id] = markers;
	}
}

function initMap() {
    var mapDiv = document.getElementById('map');
    var map = new google.maps.Map(mapDiv, {
        center: { lat: 52.53, lng: 13.29 },
        zoom: 6
    });
	 mapCordinates.authenticate();
}

// $(document).ready(function () {
   
// });