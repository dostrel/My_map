
var map;
var mark;
function initMap()
{
    var myLatLng = {lat: 48.866667, lng: 2.333333};
    map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        fullscreenControl: true
    });
     mark = marker(myLatLng);

    function eventMarker()
{
    setPosition(mark);
}
    google.maps.event.addListener(mark,'dragend', eventMarker);
    adress();
}

// In the following example, markers appear when the user clicks on the map.
// Each marker is labeled with a single alphabetical character.
var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var labelIndex = 0;

function initialize() {
    var bangalore = { lat: 12.97, lng: 77.59 };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: bangalore
    });

    // This event listener calls addMarker() when the map is clicked.
    google.maps.event.addListener(map, 'click', function(event) {
        addMarker(event.latLng, map);
    });

    // Add a marker at the center of the map.
    addMarker(bangalore, map);
}

// Adds a marker to the map.
function addMarker(location, map) {
    // Add the marker at the clicked location, and add the next-available label
    // from the array of alphabetical characters.
    var marker = new google.maps.Marker({
        position: location,
        label: labels[labelIndex++ % labels.length],
        map: map
    });
}

google.maps.event.addDomListener(window, 'load', initialize);






























function adress()
{
    var geocoder = new google.maps.Geocoder();
    var id = document.getElementById("addresse");
    $(id).keypress(function(e)
    {
        if(e.keyCode === 13)
        {
            var request = {
                address: $(this).val()
            };
            geocoder.geocode(request,function(result,status)
            {
                if(status == google.maps.GeocoderStatus.OK)
                {
                    var poss = result[0].geometry.location;
                    map.setCenter(poss);
                    mark.setPosition(poss);
                    setPosition(mark);
                }
            });
        }
        return false;
    })

}
function marker(myLatLng)
{
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Drag me!',
        draggable: true,
        animation: google.maps.Animation.DROP
    });
    setPosition(marker);
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
    return marker;
}

function setPosition(marker)
{
    var poss = marker.getPosition();
    $('#latitude').val(poss.lat);
    $('#longitude').val(poss.lng);
}

function itineraire()
{}

