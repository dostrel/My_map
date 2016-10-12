/**
 * Created by Dostrel on 11/10/2016.
 */
var map;
var infoWindow;
var depart;
var arriver;
var pos;
var marker;
function initMap()
{
    var myLatLng = {lat: 48.866667, lng: 2.333333};
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
   // setPosition(marker);
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
    geolocalisation();

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
            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
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
    var directionsDisplay = new google.maps.DirectionsRenderer({
        draggable: true,
        map: map,
        panel: document.getElementById('right-panel')
    });
    directionsDisplay.addListener('directions_changed', function()
    {
        computeTotalDistance(directionsDisplay.getDirections());
    });
    var request = {
        destination: arriver,
        origin:depart,
        waypoints: [{location: 'paris, fr'}, {location: 'paris , fr'}],
        travelMode: 'DRIVING',
        avoidTolls: true
    };
    var directionsService = new google.maps.DirectionsService();
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
