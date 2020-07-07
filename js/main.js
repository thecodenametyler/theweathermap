$(function() {
    var appId = "3317c0c8845e36421007f32c3c4f5b02"; //key for openweathermap
    var accessToken = 'pk.eyJ1Ijoicml0ZXNoLXN1Z2FyIiwiYSI6ImNqcmhkZGJnMTJtM2k0M24weDFobDNuMjkifQ.B18HvNAgxnCAaRkNKN7KEw'; //key for leaflet
    var countryCode = "";
    var bounds = [];
    var selectedRegion = [];
    var citites = ['Buenos Aires', 'Mendoza', 'Bariloche', 'El Calafate', 'Puerto Madryn']; //default cities in case
    var mymap = L.map('mapid').setView([0, 0], 4);
    //reff types of maps
    //https://leaflet-extras.github.io/leaflet-providers/preview/
    // L.tileLayer('https://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}?access_token='+accessToken, {
    //     attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    //     maxZoom: 18,
    //     id: 'mapbox.streets',
    //     accessToken: 'your.mapbox.access.token'
    // }).addTo(mymap);
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
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

    //check for country code in the #countryId input
    if($('#countryId').length > 0) {
        countryCode = $('#countryId').val();
    }

    var checkifdone = setInterval(checkIfStateLoaded, 1000);

    function checkIfStateLoaded() {
        //check if the geodata.solutions script have been initialized then fire the plot markers event based on the regions available
        if($('#stateId option').length > 5){
            citites = [];
            $('#stateId option').each(function(index) {
                citites.push($(this).val());
            });
            citites.shift();
            plotMarkers();
            clearInterval(checkifdone);
            console.log('checkIfStateLoaded');
        }
    }

    function myStopFunction() {
        clearInterval(checkifdone);
    }

    function plotMarkers() {
        //uncomment to clear all markers after selection of another region
        //markers.clearLayers();
        //bounds = [];
        console.log(citites);

        for (var city in citites) {
            if (citites.hasOwnProperty(city)) {
            //     $.getJSON("http://api.openweathermap.org/data/2.5/weather?q="+citites[city]+", "+countryCode+"&APPID=" + appId,
            //         function(data) {
            //             //console.log(data);
            //             markers.addLayer(
            //                 L.marker(
            //                     [data.coord.lat, data.coord.lon],
            //                     {icon: new LeafIcon({iconUrl: '../img/forcasticon/'+data.weather[0].icon+'.svg'})
            //                 })
            //                 .bindTooltip(""+Math.round((data.main.temp - (273.15)) * 10) / 10+"&deg;C", 
            //                 {
            //                     permanent: true, 
            //                     direction: 'center'
            //                 })
            //             );
            //             mymap.addLayer(markers);
            //             bounds.push([data.coord.lat, data.coord.lon]);
            //             mymap.fitBounds(bounds);
            //         }
            //     ).done(function(data){
            //         if(data.cod == 200) {
            //             console.log(data.name);
            //         }
            //     })
            //     .fail(function(error){
            //         console.log('error');
            //     });
            }
        }
    }

    var checkifCitiesdone = "";
    $( "#stateId" ).change(function() {
        console.log(selectedRegion.indexOf(this.value));
        //check if the item has not already been selected before
        if(selectedRegion.indexOf(this.value) == -1){
            checkifCitiesdone = setInterval(checkIfCitiesLoaded, 1000);
        }
        selectedRegion.push(this.value);
        console.log('checkIfCitiesLoaded');
    });

    function checkIfCitiesLoaded() {
        if($('#cityId option').length > 1){
            citites = [];
            $('#cityId option').each(function(index) {
                citites.push($(this).val());
            });
            citites.shift();
            plotMarkers();
            clearInterval(checkifCitiesdone);
        }
    }

    function myStopCitiesFunction() {
        clearInterval(checkifCitiesdone);
    }
});

//Local Data by pass the Daily geodata.solutions request count limits for local projects
var localData = {
    "country" : "MU",
    "districts": [
        "Agalega Islands",
        "Black River",
        "Cargados Carajos",
        "Flacq", "Grand Port",
        "Moka", "Pamplemousses",
        "Plaines Wilhems",
        "Port Louis",
        "Riviere du Rempart",
        "Rodrigues",
        "Savanne"
    ],
    "regions": {
        "Agalega Islands": ["Agalega Islands"],
        "Black River": ["Albion", "Cascavelle", "Flic en Flac", "Grande Riviere Noire", "Gros Cailloux", "Petite Case Noyale", "Petite Riviere", "Tamarin"],
        "Cargados Carajos": ["Cargados Carajos"],
        "Flacq": ["Bel Air Riviere Seche", "Bon Accueil", "Brisee Verdiere", "Camp Ithier", "Camp de Masque", "Centre de Flacq", "Clemencia", "Ecroignard", "Grande Riviere Sud Est", "Lalmatie", "Laventure", "Mare La Chaux", "Olivia", "Poste de Flacq", "Quatre Cocos", "Quatre Soeurs", "Queen Victoria", "Saint Julien", "Sebastopol"],
        "Grand Port" : ["Bambous Virieux", "Beau Vallon", "Bois des Amourettes", "Cluny", "Grand Sable", "Mahebourg", "New Grove", "Nouvelle France", "Plaine Magnien", "Rose Belle", "Saint Hubert"],
        "Moka" : ["Camp Thorel", "Dagotiere", "Dubreuil", "Melrose", "Moka", "Pailles", "Providence", "Quartier Militaire", "Saint Pierre", "Verdun"],
        "Pamplemousses" : ["Arsenal", "Calebasses", "Congomah", "Creve Coeur", "Fond du Sac", "Grande Pointe aux Piments", "Le Hochet", "Long Mountain", "Morcellemont Saint Andre", "Notre Dame", "Pamplemousses", "Plaine des Papayes", "Terre Rouge", "Triolet"],
        "Plaines Wilhems" : ["Beau Bassin", "Curepipe", "Ebene", "Midlands", "Quatre Bornes", "Vacoas"],
        "Port Louis" : ["Port Louis"],
        "Riviere du Rempart" : ["Amaury", "Cap Malheureux", "Cottage", "Esperance Trebuchet", "Goodlands", "Grand Baie", "Grand Gaube", "Mapou", "Petit Raffray", "Piton", "Plaines des Roches", "Riviere du Rempart", "Roche Terre", "Roches Noire", "The Vale"],
        "Rodrigues" : ["Baie aux Huitres", "Port Mathurin"],
        "Savanne" : ["Camp Diable", "Chamouny", "Chemin Grenier", "Grand Bois", "Riviere des Anguilles", "Saint Aubin", "Souillac", "Surinam"]
    }
}
console.log(localData);