
	//画布大小
	var width = 800;
	var height = 500;

	//在 body 里添加一个 SVG 画布	
	var svg = d3.select("#Rank1")
		.append("svg")
		.attr("width", width)
		.attr("height", height);

	//画布周边的空白
	var padding = {left:30, right:30, top:20, bottom:100};

	//定义一个数组
	var dataset = [11, 8, 7, 7, 7, 6, 5, 4,4,4,3,2];
	var dataname = ["十一月","八月","十月","七月","六月","三月","十二月","九月","一月","五月","四月","二月"];	
	
	//x轴的比例尺
	var xScale = d3.scale.ordinal()
		.domain(d3.range(dataset.length))
		.rangeRoundBands([0, width - padding.left - padding.right]);

	//y轴的比例尺
	var yScale = d3.scale.linear()
		.domain([0,d3.max(dataset)])
		.range([height - padding.bottom, padding.top ]);

	//定义x轴
	var xAxis = d3.svg.axis()
		.scale(xScale)
		.orient("bottom");
		
	//定义y轴
	var yAxis = d3.svg.axis()
		.scale(yScale)
		.orient("left");

	//矩形之间的空白
	var rectPadding = 15;

	//添加矩形元素
	var rects = svg.selectAll(".MyRect")
		.data(dataset)
		.enter()
		.append("rect")
		.attr("class","MyRect")
		.attr("transform","translate(" + padding.left + "," + padding.top + ")")
		.attr("x", function(d,i){
			return xScale(i) + rectPadding/2;
		} )
		.attr("y",function(d){
			return yScale(d);
		})
		.attr("width", xScale.rangeBand() - rectPadding )
		.attr("height", function(d){
			return height - padding.bottom - yScale(d);
		})
		.attr("fill","#FB319D")		//填充颜色不要写在CSS里
		.on("mouseover",function(d,i){
			d3.select(this)
				.attr("fill","yellow");
		})
		.on("mouseout",function(d,i){
			d3.select(this)
				.transition()
		        .duration(500)
				.attr("fill","#FB319D");
		});

	//添加文字元素
	// var texts = svg.selectAll(".MyText")
	// 	.data(dataset)
	// 	.enter()
	// 	.append("text")
	// 	.attr("class","MyText")
	// 	.attr("transform","translate(" + padding.left + "," + padding.top + ")")
	// 	.attr("x", function(d,i){
	// 		return xScale(i) + rectPadding/2;
	// 	} )
	// 	.attr("y",function(d){
	// 		return yScale(d);
	// 	})
	// 	.attr("dx",function(){
	// 		return (xScale.rangeBand() - rectPadding)/2;
	// 	})
	// 	.attr("dy",function(d){
	// 		return 20;
	// 	})
	// 	.text(function(d){
	// 		return d;
	// 	});

    var texts = svg.selectAll(".bottomText")
		.data(dataname)
		.enter()
		.append("text")
		.attr("class","bottomText")
		.attr("transform","translate(" + padding.left + "," + padding.top + ")")
		.attr("x", function(d,i){
			return xScale(i) + rectPadding/2;
		} )
		.attr("y",function(d){
			return 400;
		})
		.attr("dx",function(){
			return (xScale.rangeBand() - rectPadding)/10;
		})
		.attr("dy",function(d){
			return 20;
		})
		.text(function(d){
			return d;
		});