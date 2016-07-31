function rect2(divid,csv_data){
    var margin = {top:20, bottom: 25, left:200, right:50};
    var width = 800 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;
    var xScale = d3.scale.linear().range([0, width]);
    var yScale = d3.scale.ordinal().rangeRoundBands([0, height], 1.8,0);
    var color = d3.scale.category20();   //有十种颜色的颜色比例尺
    
    var svg = d3.select(divid)
                .append("svg")
                .attr("width", width+margin.left+margin.right)
                .attr("height", height+margin.top+margin.bottom)
                .attr("class", "base-svg");

    var barSvg = svg.append("g")
                .attr("transform", "translate("+margin.left+","+margin.top+")")
                .attr("class", "bar-svg");
    var x = barSvg.append("g")
            .attr("class", "x-axis");

    d3.csv(csv_data, function(data) {
        var xMax = d3.max(data,function(d){return Number(d.value)});
        var xMin = 0;
        xScale.domain([xMin, xMax]);
        yScale.domain(data.map(function(d) { return d.manName+"-o-"+d.womanName; }));

        var groups = barSvg.append("g").attr("class", "labels")
                    .selectAll("text")
                    .data(data)
                    .enter()
                    .append("g");
        groups.append("text")
                .attr("x", "-10")
                .attr("y", function(d) { return yScale(d.manName+"-o-"+d.womanName); })
                .text(function(d) { return d.manName+"-o-"+d.womanName; })
                .attr("text-anchor", "end")
                .attr("dy", "1.3em")
                .attr("dx", "-.32em")
                .attr("id", function(d,i) { return "label"+i; });

        var bars = groups.attr("class", "bars")
                    .append("rect")
                    .attr("width", function(d) { return xScale(d.value); })
                    .attr("height", height/15)
                    .attr("x", xScale(xMin))
                    .attr("y", function(d) { return yScale(d.manName+"-o-"+d.womanName); })
                    .attr("id", function(d,i) { return "bar"+i; })
                    .style("fill","#FF7F0E");
        groups.append("text")
                .attr("x", function(d) { return xScale(d.value); })
                .attr("y", function(d) { return yScale(d.manName+"-o-"+d.womanName); })
                .text(function(d) { return d.value+"万"; })
                .attr("text-anchor", "end")
                .attr("dy", "2em")
                .attr("dx", "4em")
                .style("fill","black")
                .attr("id", "precise-value");

        bars.on("mouseover", function() {
                var currentGroup = d3.select(this.parentNode);
                currentGroup.select("rect").style("fill", "steelblue");
                currentGroup.select("text").style("font-weight", "bold");
            })
            .on("mouseout", function() {
                var currentGroup = d3.select(this.parentNode);
                currentGroup.select("rect").style("fill", "#FF7F0E");
                currentGroup.select("text").style("font-weight", "normal");
            });



    });
}