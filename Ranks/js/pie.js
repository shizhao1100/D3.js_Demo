   function pie(divid,csv_data) {
        var width = 800,
        height = 400,
        radius = Math.min(width, height) / 2;

    var color = d3.scale.category20();   //有十种颜色的颜色比例尺

    var arc = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(radius - 70);

    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.count; });

    var svg = d3.select(divid).append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    d3.csv(csv_data, type, function(error, data) {
      if (error) throw error;

      var g = svg.selectAll(".arc")
          .data(pie(data))
          .enter().append("g")
          .attr("class", "arc");

      g.append("path")
          .attr("d", arc)
          .style("fill", function(d) { return color(d.data.count); });

      g.append("text")
          .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
          .attr("dy", ".35em")
          .attr("text-anchor","middle")
          .text(function(d) { return d.data.type; });
    });

    function type(d) {
      d.data = +d.data;
      return d;
    }
}

  	