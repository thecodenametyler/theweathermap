$(function() {
    var appId = "3317c0c8845e36421007f32c3c4f5b02";
    var accessToken = 'pk.eyJ1Ijoicml0ZXNoLXN1Z2FyIiwiYSI6ImNqcmhkZGJnMTJtM2k0M24weDFobDNuMjkifQ.B18HvNAgxnCAaRkNKN7KEw';
    var bounds = [];
    var citites = ['Buenos Aires', 'Mendoza', 'Bariloche', 'El Calafate', 'Puerto Madryn'];
    var mymap = L.map('mapid').setView([0, 0], 4);
    //reff types of maps
    //https://leaflet-extras.github.io/leaflet-providers/preview/
    L.tileLayer('https://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}?access_token='+accessToken, {
        attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'your.mapbox.access.token'
    }).addTo(mymap);

    //Defining an icon class
    var LeafIcon = L.Icon.extend({
        options: {
            //iconUrl: '../img/forcasticon/01d.svg',
            //shadowUrl: '../img/forcasticon/01d.svg',
            iconSize:     [38, 95],
            shadowSize:   [50, 64],
            iconAnchor:   [22, 94],
            shadowAnchor: [4, 62],
            popupAnchor:  [-3, -76]
        }
    });
    //reff for cluster
    //https://github.com/Leaflet/Leaflet.markercluster#usage
    var markers = L.markerClusterGroup();


    console.log($('#stateId option').length);
    var checkifdone = setInterval(checkIfStateLoaded, 1000);

    function checkIfStateLoaded() {
        
        if($('#stateId option').length > 5){
            console.log($('#stateId option').length);
            citites = [];
            $('#stateId option').each(function(index) {
                citites.push($(this).val());
            });
            citites.shift();
            console.log(citites);
            plotMarkers();
            clearInterval(checkifdone);
        }
    }

    function myStopFunction() {
        clearInterval(checkifdone);
    }
    
    function plotMarkers() {
        for (var city in citites) {
            if (citites.hasOwnProperty(city)) {
                $.getJSON("http://api.openweathermap.org/data/2.5/weather?q="+citites[city]+", MU&APPID=" + appId,
                    function(data) {
                        console.log(data);
                        markers.addLayer(
                            L.marker(
                                [data.coord.lat, data.coord.lon],
                                {icon: new LeafIcon({iconUrl: '../img/forcasticon/'+data.weather[0].icon+'.svg'})
                            })
                            .bindTooltip(""+Math.round((data.main.temp - (273.15)) * 10) / 10+"&deg;C", 
                            {
                                permanent: true, 
                                direction: 'center'
                            })
                        );
                        mymap.addLayer(markers);
                        
                        bounds.push([data.coord.lat, data.coord.lon]);
                        mymap.fitBounds(bounds);
                    }
                ).done(function(data){
                    if(data.cod == 200) {
                    }
                })
                .fail(function(error){
                    console.log('error');
                });
            }
        }
    }

    var checkifCitiesdone = "";
    $( "#stateId" ).change(function() {
        console.log(this.value);
        checkifCitiesdone = setInterval(checkIfCitiesLoaded, 1000);
    });

    function checkIfCitiesLoaded() {
            
        if($('#cityId option').length > 1){
            console.log($('#cityId option').length);
            citites = [];
            $('#cityId option').each(function(index) {
                citites.push($(this).val());
            });
            citites.shift();
            console.log(citites);
            plotMarkers();
            clearInterval(checkifCitiesdone);
        }
    }

    function myStopCitiesFunction() {
        clearInterval(checkifCitiesdone);
    }
});