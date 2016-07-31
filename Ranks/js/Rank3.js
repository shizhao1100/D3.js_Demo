
	//画布大小
	var width = 800;
	var height = 500;

	//在 body 里添加一个 SVG 画布	
	var svg = d3.select("#Rank3")
		.append("svg")
		.attr("width", width)
		.attr("height", height);

	//画布周边的空白
	var padding = {left:30, right:30, top:50, bottom:50};

	//定义一个数组
	var dataset = [13,10, 9,6, 4];
	var dataname = ["北京","香港","台北","巴厘岛","普吉岛"];	
	
    //y轴的比例尺
	var yScale = d3.scale.ordinal()
		.domain(d3.range(dataset.length))
		.rangeRoundBands([padding.top, height]);

	//x轴的比例尺
	var xScale = d3.scale.linear()
		.domain([0,d3.max(dataset)])
		.range([width , 0]);

	//矩形之间的空白
	var rectPadding = 3;

	//添加矩形元素
	var rects = svg.selectAll(".MyRect")
		.data(dataset)
		.enter()
		.append("rect")
		.attr("x", function(d){
			return  xScale(d);
		} )
		.attr("y",function(d,i){
			return yScale(i) + rectPadding/2;
		})
		.attr("width",  function(d){
			return width - padding.top - padding.bottom - xScale(d);
		})
		.attr("height", yScale.rangeBand() - rectPadding-10)
// -(width - padding.top - padding.bottom - xScale(d))/2
        .attr("transform",function(d){
            return "translate("+((width/2)-xScale(d)-(width - padding.top - padding.bottom - xScale(d))/2)+",0)";
        })
		.attr("fill","#FF7F0E")		//填充颜色不要写在CSS里
		.on("mouseover",function(d,i){
			d3.select(this)
				.attr("fill","yellow");
		})
		.on("mouseout",function(d,i){
			d3.select(this)
				.transition()
		        .duration(500)
				.attr("fill","#FF7F0E");
		});

    var textxchange = 30;
	
    //添加文字元素
	var texts = svg.selectAll(".MyText")
		.data(dataname)
		.enter()
		.append("text")
		.attr("class","MyText")
		.attr("transform","translate(" + padding.left + "," + padding.top + ")")
		.attr("x", function(d,i){
			return width/2-textxchange;
		} )
		.attr("y",function(d,i){
			return yScale(i)+rectPadding/2;
		})
        .attr("text-anchor","middle")
		.text(function(d){
			return d;
		});