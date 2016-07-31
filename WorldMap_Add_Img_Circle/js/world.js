
var width = 1800;
var height = 960;

document.body.style.backgroundColor="skyblue";
var svg = d3.select("#world").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(0,0)");

var projection = d3.geo.mercator()
    .center([20, 20])
    .scale(300)
    .translate([width / 2, height / 2]);

var path = d3.geo.path()
    .projection(projection);


var color = d3.scale.category20();

var appendcircle = function (data) {
    var circles = svg.append("g").selectAll("circle").data(data).enter().append("circle");

    circles.attr({
        cx: function (d, i) { return projection([data[i].long, data[i].lat])[0] },
        cy: function (d, i) { return projection([data[i].long, data[i].lat])[1] },
    })
        .style("fill", function () {
            return "#ff0000";
        })
        .style("opacity", 0.6)
        .attr("r", 5);
}
var appendimg = function (data) {
     var img = svg.append("g").selectAll("image").data(data).enter().append("image");

     img.attr("x",function (d, i) { return projection([data[i].long, data[i].lat])[0]})  
     img.attr("y",function (d, i) { return projection([data[i].long, data[i].lat])[1]})

    .attr("width",50)  
    .attr("height",40)
    .attr("xlink:href",function (d,i) {
        return d.imgURL;
    }).attr("transform", "translate(-25,-25)");  
}

var ShowGPSLocation = function () {
    d3.csv("data/gpsLocation.csv", function (error, root) {
        //appendcircle(root);
        appendimg(root);
    });
}
var ShowNameLocation = function () {


    Papa.parse('data/nameLocation.csv', {
        download: true,
        complete: function (results) {
            var data = results.data;
            var NewData = new Array();
            for (var i = 0; i < data.length; i++) {
                var url = "http://api.map.baidu.com/geocoder/v2/?address=" + data[i][0] + "&output=json&ak=KF1ere1j8Y439K2hhHrtG9TF&callback=showLocation";
                $.ajax({
                    url: url,
                    dataType: 'jsonp',
                    success: function (result) {
                        var r = {
                            lat: result.result.location.lat,
                            long: result.result.location.lng,
                            imgURL: data[i][1]
                        }
                        NewData.push(r);
                    }
                });
            }
            console.log(NewData);
            //appendcircle(NewData);
            appendimg(NewData);
        }
    });



}
var ShowLocation = function () {
    //ShowGPSLocation();
    ShowNameLocation();
}
	
d3.json("data/world.json", function (error, root) {

    if (error)
        return console.error(error);
   // console.log(root.features);

    svg.selectAll("path")
        .data(root.features)
        .enter()
        .append("path")
        .attr("stroke", "RGB(106,106,97)")
        .attr("stroke-width", 1)
        .attr("fill", function (d, i) {
            return "RGB(255,212,161)";
        })
        .attr("d", path);
    ShowLocation();
});