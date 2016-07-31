		var width = 800;
		var height = 500;
		var dataset = [ 27 , 39 ];
		
		var svg = d3.select("#Rank2")
					.append("svg")
					.attr("width", width)
					.attr("height", height);
		
		var pie = d3.layout.pie();

		var piedata = pie(dataset);
		
		var outerRadius = 150;	//外半径
		var innerRadius = 0;	//内半径，为0则中间没有空白

		var arc = d3.svg.arc()	//弧生成器
					.innerRadius(innerRadius)	//设置内半径
					.outerRadius(outerRadius);	//设置外半径
		
		var color = d3.scale.category10();
		
		var arcs = svg.selectAll("g")
					  .data(piedata)
					  .enter()
					  .append("g")
					  .attr("transform","translate("+ (width/2) +","+ (height/2) +")");
					  
		arcs.append("path")
			.attr("fill",function(d,i){
				return color(i);
			})
			.attr("d",function(d){
				return arc(d);
			});
		
		arcs.append("text")
			.attr("transform",function(d){
				return "translate(" + arc.centroid(d) + ")";
			})
			.attr("text-anchor","middle")
			.text(function(d){
				if(d.data=='39')
                return "国内：约59%";
                else
                return "国外：约41%";
			});