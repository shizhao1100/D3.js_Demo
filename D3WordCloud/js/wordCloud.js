function Go() {

    var text = document.getElementById("text").value.toString();

    $.ajax({
        url: 'phpServer/GetPartResult.php',//ajax提交路径
        dataType: "json",
        type: 'post',//提交方式
        //传参不可以直接传对象
        data: { str: text },//提交参数
        //data:par,
        success: function (result) {//ajax请求完成时执行，result为返回的结果
            console.log(result);
            ShowWordGragh(result);
        },
        error: function () {
            alert("ajax请求处理错误");
        }
    });
}

var fill = d3.scale.category20();

var color = d3.scale.linear()
    .domain([0, 1, 2, 3, 4, 5, 6, 10, 15, 20, 100])
    .range(["#ddd", "#ccc", "#bbb", "#aaa", "#999", "#888", "#777", "#666", "#555", "#444", "#333", "#222"]);

function ShowWordGragh(data){
d3.layout.cloud().size([1920, 1080])
    .words(data)
    .padding(5)
    .rotate(function () { return ~~(Math.random() * 2) * 90; })
    .fontSize(function(d) { return d.size * 10; })
    .on("end", draw)
    .start();
}
function draw(words) {
    d3.select("#wordCloud").append("svg")
        .attr("width", 1920).attr("height", 1080)
        .attr("class", "wordcloud")
        .append("g")
        .attr("transform", "translate(320,200)")
        .selectAll("text")
        .data(words)
        .enter().append("text")
        .style("font-size", function (d) {
             return d.size + "px"; 
            })
        .style("fill", function (d, i) { return fill(i); })
        .style("font-family", "黑体")
        .attr("transform", function (d) {
            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function (d) { return d.text; });
}
