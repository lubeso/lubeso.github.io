
var map = new L.Map("map")
.setView(new L.LatLng(40.758700379161006, -73.95652770996094), 12)

L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
{
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
  maxZoom: 17,
  minZoom: 4
}).addTo(map);

L.svg().addTo(map);


d3.csv("data/nycha-developments/nycha-scores-joined.csv")
.then(function(data) {

var points = []
data.forEach(function(d) {
points.push({
  Lat: d.Latitude,
  Long: d.Longitude,
  score: d.scores_SCORE,
  population: d.NYCHA_data_TOTALPOPULATION,
  development: d.developmen
});
});

color = ""
for (i = 0; i < points.length; i++) {
if (points[i].score <0.33 ) {
	color = "#028295";}
if (points[i].score >0.33 && points[i].score < 0.66) {
	color =  "#5AB1BB";}
if (points[i].score > 0.66 ) {
	color = "#BAF2E9";}
var circle = L.circle([points[i].Lat, points[i].Long], {
	fillColor: color,
	fillOpacity: 1,  
	radius: 200,
	weight: 1,
	color: "white",
}).bindPopup(points[i].development + "<br>Score: " + Math.round(points[i].score * 100) / 100).addTo(map)
}
})

d3.select("#container").style("visibility", "hidden")

d3.select("#mapbutton").on("click", function() { 
d3.select(this).attr("class", "active")
d3.select("#map").style("visibility", "visible")
d3.select("#container").style("visibility", "hidden")
d3.select("#methodbutton").attr("class", "inactive")
})

d3.select("#methodbutton").on("click", function() { 
d3.select(this).attr("class", "active")
d3.select("#map").style("visibility", "hidden")
d3.select("#container").style("visibility", "visible")
d3.select("#mapbutton").attr("class", "inactive")
})