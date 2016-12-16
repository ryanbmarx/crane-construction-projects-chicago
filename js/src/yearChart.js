import * as d3 from "d3";
var getTribColor = require("./getTribColors.js");

function yearAxisFormatter(year){
	return `'${d3.format("02")(year - 2000)}`;
}

function drawChart(container, data){
    d3.select(container).selectAll('*').remove();

    // Get our dimensions squared away. Ultimately the size of the chart is 
    // governed by the size of the container, which is set with CSS. 
    const   bbox = d3.select(container).node().getBoundingClientRect();
    const   height = bbox.height,
            width = bbox.width,
            margin = {top:0, right:0, bottom:20, left:0},
            innerHeight = height - margin.top - margin.bottom,
            innerWidth = width - margin.left - margin.right;

        // Get our basic chart container in order.
    const viz = d3.select(container)
        .append('svg')
            .attr('height', height)
            .attr('width', width)
        .append('g')
            .classed('chart-inner', true)
            .attr('height', innerHeight)
            .attr('width', innerWidth)
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.addresses)])
        .range([0, innerHeight]);

    const x = d3.scaleBand()
        .domain(data.map(d => d.year))
        .range([0, innerWidth])
        .padding(.1);

     const xScale = d3.axisBottom(x)
     	.ticks(10)
        .tickFormat(yearAxisFormatter);


    viz.append("g")
        .classed('x', true)
        .classed('axis', true)
        .attr('transform', `translate(${0},${innerHeight})`)
        .call(xScale);

    const bars = viz.append('g').classed('bars', true)
	
	bars.selectAll('rect')
    	.data(data)
	    	.enter().append('rect')
	    	.classed('bar', true)
			.attr('data-year', d => d.year)
	    	.style('fill', getTribColor("trib_blue2"))
	    	.attr('width', x.bandwidth())
	    	.attr('height', d => y(d.addresses))
	    	.attr('x', d => x(d.year))
	    	.attr('y', d => innerHeight - y(d.addresses))
	
	bars.selectAll('text')
		.data(data)
		.enter()
		.append('text')
		.classed('bar-label', true)
    	.attr('y', d => innerHeight - y(d.addresses))
    	.attr('x', d => x(d.year) + x.bandwidth()/2 )
		.attr("dy", "1em")
		.attr('text-anchor', 'middle')
    	.text(d => d.addresses);
	    	
           
}

module.exports = drawChart;