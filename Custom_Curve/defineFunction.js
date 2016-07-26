
function ShowDefineFunctionGraph(p_svg,p_MaxX,p_MaxY,p_fun) {

    var x = d3.scale.linear()
        .domain([0, p_MaxX])
        .range([0, width]);

    var y = d3.scale.linear()
        .domain([0, p_MaxY])
        .range([height, 0]);
    var continuousLine = (function () {
        
        var samples = d3.range(0, p_MaxX, 10 / width);

        var discreteLine = d3.svg.line()
            .x(function (d, i) {
                 return x(samples[i]); })
            .y(function (d) {
                return y(d); });

        return function (f) {
            return discreteLine(samples.map(f));
        };
    })();

    p_svg.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.svg.axis()
        .scale(x)
        .orient("bottom"));

    p_svg.append("g")
        .attr("class", "axis axis--y")
        .call(d3.svg.axis()
        .scale(y)
        .orient("left"));

    var lineAccelerate = p_svg.append("path")
        .attr("class", "line")
        .style("stroke", "brown")
        .style("stroke-width", "2px")
        .style("stroke-dasharray", "2,5");

    var timeReference = p_svg.append("line").attr("y1", height),
        easeReference = p_svg.append("line");

       lineAccelerate.attr("d", continuousLine(p_fun));

}