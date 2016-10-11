
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
/*
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
 <label for="latitude" class="col-xs-12 btn btn-primary">latitude</label>
 <input id="latitude" class="col-xs-12" type="text">

 <label for="longitude" class="col-xs-12 btn btn-primary">longitude</label>
 <input id="longitude" class="col-xs-12" type="text">

 <input id="submit" value="Valide" class="col-xs-12" type="button" onclick="adress()">
}*/
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
    var pos = marker.getPosition();
    $('#latitude').val(pos.lat);
    $('#longitude').val(pos.lng);
}

function itineraire()
{}

