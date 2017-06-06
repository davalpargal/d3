//margin conventions
var margin = {
  left: 40,
  right: 20,
  top: 20,
  bottom: 100
}

var width = 800 - margin.left - margin.right;
var height= 600 - margin.top - margin.bottom;

var svg= d3.select("body")
	.append("svg")
    .attr("width", 800)
    .attr("height", 600)
    .append("g")
	.attr("transform", "translate(" +margin.left+ "," +margin.top+ ")");

var xScale = d3.scale.ordinal()
    .rangeRoundBands([0,width],0.2,0.2);
var yScale = d3.scale.linear()
    .range([height,0]);

var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left");

d3.csv("gdp.csv",function(error,data){
  if(error) 
  	console.log("error loading file");
  data.forEach(function(d){
  	d.gdp = +d.gdp;
   
  });
  
  data.sort(function(a,b){
  	return b.gdp - a.gdp;
  });
  console.log(data);
  xScale.domain(data.map(function(d) { return d.country; }) );
  yScale.domain([0,d3.max(data, function(d){ return d.gdp; })] );

  svg.selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
  .attr("height",0)
  .attr("y", height)
  .transition().duration(3000)
  .delay(function(d,i){ return i*200;})
  .attr("x", function(d){ return xScale(d.country); })
  .attr("y", function(d){ return yScale(d.gdp); })
  .attr("width", xScale.rangeBand())
  .attr("height", function(d){ return height - yScale(d.gdp); })
  .style("fill",function(d,i){ return "rgb(20,20,"+ (i*30+100) +")"});
  
  svg.selectAll("text")
  .data(data)
  .enter()
  .append("text")
  .text(function(d){ return d.gdp; })
  .attr("x", function(d){ return xScale(d.country)+ 5;})
  .attr("y", function(d){ return yScale(d.gdp)+15; })
  .attr("fill","#FFF");

  svg.append("g")
  .attr("class","x axis")
  .attr("transform","translate(0,"+ height + ")")
  .call(xAxis)
  .selectAll("text")
  .attr("dx","-45")
  .style("font-size","13")
  .attr("transform","rotate(-60)");

  svg.append("g")
  .attr("class","y axis")
  .call(yAxis)
  .style("font-size","12px");

});