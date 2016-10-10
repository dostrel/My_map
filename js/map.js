
var map;
function initMap()
{
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 48.866667, lng: 2.333333},
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
}

function fullscreen()
{
    var elem = document.getElementById("map");
    if (elem.requestFullscreen)
    {
        elem.requestFullscreen();
    }
    else if (elem.msRequestFullscreen)
    {
        elem.msRequestFullscreen();
    }
    else if (elem.mozRequestFullScreen)
    {
        elem.mozRequestFullScreen();
    }
    else if (elem.webkitRequestFullscreen)
    {
        $('.mapfullcreen').addClass('maxscreen');

        elem.webkitRequestFullscreen();
    }
}

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
            }
            geocoder.geocode(request,function(result,status)
            {
                if(status == google.maps.GeocoderStatus.OK)
                {
                   map.setCenter(result[0].geometry.location);
                }
            });
        }
        return false;
    })
}

function marker()
{

}

