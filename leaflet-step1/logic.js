// define earthquake url
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// A function to determine the marker size based on the earquake magnitude
function markerSize(magnitude) {
    var magnitude_scale = 20000;
    return magnitude * magnitude_scale;
  }
// Create a map object.
var myMap = L.map("map1").setView([40.7, -94.5], 4);

// Add a tile layer (the background map image) to our map.
// Use the addTo() method to add objects to our map.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);



  // Loop through the earthquakes json objects with a promise function.
  d3.json(url).then(function(response) {

    var features = response.features
    for (var i = 0; i < features.length; i++) {
        var location = [features[i].geometry.coordinates[1],features[i].geometry.coordinates[0]];
        var depth = features[i].geometry.coordinates[2]
        var magnitude = features[i].properties.mag;


        
        // Conditionals for earthquake color by depth
        var color = "";
        if (depth > 90) {
        color = "red";
        }
        else if (depth > 70) {
        color = "orange";
        }
        else if (depth > 50) {
        color = "orange";
        }
        else if (depth > 30) {
        color = "yellow";
        }
        else if (depth > 10) {
            color = "green";
            }
        else {
        color = "green";
        }
  
        // Add circles to the map.
        L.circle(location, {
            fillOpacity: 0.5,
            color: "white",
            fillColor: color,
            // Adjust the radius.
            radius: markerSize(magnitude)
        }).bindPopup("<h1>" + features[i].properties.place + "</h2> <hr> <h3>Points: " + features[i].properties.mag + "</h3>").addTo(myMap);
    }
// worked on legend with tutor
    var legend = L.control({
        position: "bottomright"
    });

    legend.onAdd = function () {
        var div = L.DomUtil.create("div", "info legend");

        var grades = [-10, 10, 30, 50, 70, 90];
        var colors = [
            "#98ee00",
            "#d4ee00",
            "#eecc00",
            "#ee9c00",
            "#ea822c",
            "#ea2c2c"
        ];

        // Looping through our intervals to generate a label with a colored square for each interval.
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML += "<i style='background: " + colors[i] + "'></i> "
                + grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
        }
        return div;
    };

    // Finally, we our legend to the map.
    legend.addTo(myMap);


});

