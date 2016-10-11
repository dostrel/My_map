/**
 * Created by Dostrel on 11/10/2016.
 */
var map;
var infoWindow;
var depart;
var arriver;
var pos;
function initMap()
{
    var myLatLng = {lat: 48.866667, lng: 2.333333};
    map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        fullscreenControl: true
    });
    var marker = new google.maps.Marker({
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
        map: map
    });
    var request = {
        destination: arriver,
        origin:depart,
        travelMode: 'DRIVING',

    };

    var directionsService = new google.maps.DirectionsService();
    directionsService.route(request, function(response, status)
    {
        if (status == 'OK')
        {
            directionsDisplay.setDirections(response);
        }
    });
}
