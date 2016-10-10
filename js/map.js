
var map;
function initMap()
{
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 48.866667, lng: 2.333333},
        zoom: 3
    });
}

function fullcreen()
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
    $('#adresse')
}
