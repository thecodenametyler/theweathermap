**API used:**

* weather: https://openweathermap.org
* Map: https://leafletjs.com
* Cities: http://geodata.solutions


Get started
1. npm install
2. gulp watch

To change location
1. ./index.html change in "<input type="hidden" name="country" id="countryId" value="MU"/>" "MU" to the ISO country code
2. ./js/main.js change in "$.getJSON("http://api.openweathermap.org/data/2.5/weather?q="+citites[city]+", MU&APPID=" + appId," "MU" to the ISO country code
