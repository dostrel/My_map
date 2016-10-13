/**
 * Created by Dostrel on 11/10/2016.
 */
var map;
var infoWindow;
var depart;
var arriver;
var pos;
var marker;
var directionsDisplay;
var request;
var myLatLng;
var directionsService;
var calculateAndDisplayRoute;
var selectedMode;
var origin_autocomplete;
var destination_autocomplete;
var poss;
var labels;
var labelIndex;
function initMap()
{
    myLatLng = {lat: 48.866667, lng: 2.333333};
    map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        fullscreenControl: true
    });
     marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Drag me!',
        draggable: true,
        animation: google.maps.Animation.DROP
    });

    marker.addListener('click', toggleBounce);
    function toggleBounce()
    {
        if (marker.getAnimation() !== null)
        {
            marker.setAnimation(null);
        }
        else
        {
            marker.setAnimation(google.maps.Animation.BOUNCE);
        }
    }
    labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    labelIndex = 0;
    var buttonMode = document.getElementById('floating-panel');
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(buttonMode);


    directionsService = new google.maps.DirectionsService();
    selectedMode = $('#mode').val();
    geolocalisation();
    autoComplet();
    setPosition();
    google.maps.event.addListener(marker,'dragend', setPosition);
    google.maps.event.addListener(map, 'click', function(event) {
        addMarker(event.latLng, map);
    });
   

}

function addMarker(myLatLng, map) {
    // Add the marker at the clicked location, and add the next-available label
    // from the array of alphabetical characters.
     marker = new google.maps.Marker({
        position: myLatLng,
        label: labels[labelIndex++ % labels.length],
        map: map
    });

}
function autoComplet()
{

    depart = document.getElementById("depart");
    arriver = document.getElementById("arriver");
    origin_autocomplete = new google.maps.places.Autocomplete(depart);
    origin_autocomplete.bindTo('bounds', map);

    destination_autocomplete = new google.maps.places.Autocomplete(arriver);
    destination_autocomplete.bindTo('bounds', map);
}

function geolocalisation()
{
    infoWindow = new google.maps.InfoWindow({map: map});
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position)
        {
            pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            {
                document.getElementById("depart").value = pos.lat + ',' + pos.lng;
            }
            infoWindow.setPosition(pos);
            infoWindow.setContent('VOUS ETE ICI');
            map.setCenter(pos);
        }, function()
        {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    }
    else
    {
        handleLocationError(false, infoWindow, map.getCenter());
    }

}

function tracer()
{
    depart = document.getElementById("depart").value;
    arriver = document.getElementById("arriver").value;
    selectedMode = document.getElementById('mode').value;
    directionsDisplay = new google.maps.DirectionsRenderer({
        draggable: true,
        map: map,
        panel: document.getElementById('right-panel')
    });

    directionsDisplay.addListener('directions_changed', function()
    {
        computeTotalDistance(directionsDisplay.getDirections());
    });

     request = {
        destination: arriver,
        origin:depart,
        waypoints: [{location: 'paris, fr'}, {location: 'paris , fr'}],
       // travelMode: 'DRIVING',
        travelMode: google.maps.TravelMode[selectedMode],
        avoidTolls: true
    };

    directionsService.route(request, function(response, status)
    {
        if (status === google.maps.DirectionsStatus.OK)
        {
            directionsDisplay.setDirections(response);
        }
        else
        {
            alert('Could not display directions due to: ' + status);
        }
    });
}


function changeMode()
{
    var dest = $('#arriver').val();
    var orig = $('#depart').val();

    selectedMode = $('#mode').val();

    if (!dest || !orig){
        return;
    }
    request = {
        destination: dest,
        origin:orig,
        waypoints: [{location: 'paris, fr'}, {location: 'paris , fr'}],
        // travelMode: 'DRIVING',
        travelMode: google.maps.TravelMode[selectedMode],
        avoidTolls: true
    };

    directionsService.route(request, function(response, status)
    {
        if (status === google.maps.DirectionsStatus.OK)
        {
            directionsDisplay.setDirections(response);
        }
        else
        {
            alert('Could not display directions due to: ' + status);
        }
    });
}

function setPosition()
{
    poss = marker.getPosition();
    $('#latitude').val(poss.lat);
    $('#longitude').val(poss.lng);
}


function computeTotalDistance(result)
{
    var total = 0;
    var myroute = result.routes[0];
    for (var i = 0; i < myroute.legs.length; i++)
    {
        total += myroute.legs[i].distance.value;
    }
    total = total / 1000;
    document.getElementById('total').innerHTML = total + ' km';
}


