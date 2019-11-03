var data = [
    [400, 200],
    [210, 140],
    [722, 300],
    [70, 160],
    [250, 50],
    [110, 280],
    [699, 225],
    [90, 220]
];
var chart_width = 800;
var chart_height = 400;
var padding = 50;

// Criar SVG
var svg = d3.select('#chart')
    .append('svg')
    .attr('width', chart_width)
    .attr('height', chart_height);

// Criar Escalas
var x_scale = d3.scaleLinear()
    .domain([0, d3.max(data, function (d) {
        return d[0];
    })])
    .range([padding, chart_width - padding * 2])
;

var y_scale = d3.scaleLinear()
    .domain([0, d3.max(data, function (d) {
        return d[1];
    })])
    // .range([padding, chart_height - padding])
    .range([chart_height - padding, padding])
;

var r_scale = d3.scaleLinear()
    .domain([0, d3.max(data, function (d) {
        return d[1];
    })])
    .range([5, 30])
;

var a_scale = d3.scaleSqrt()
    .domain([0, d3.max(data, function (d) {
        return d[1];
    })])
    .range([0, 25])
;

// Criar eixos
var x_axis = d3.axisBottom(x_scale);
svg.append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(0, ${chart_height-padding})`)
    .call(x_axis);

var y_axis = d3.axisLeft(y_scale);
svg.append('g')
    .attr('class', 'y-axis')
    .attr('transform', `translate(${padding}, 0)`)
    .call(y_axis)
;

// Criar circulos
svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', function (d) {
        //return d[0];
        return x_scale(d[0]);
    })
    .attr('cy', function (d) {
        // return d[1];
        return y_scale(d[1]);
    })
    .attr('r', function (d) {
        // raio
        // return d[1] / 10;
        return a_scale(d[1]);
    })
    .attr('fill', '#D1AB0E');

// Criar rotulos
svg.append('g')
    .selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .text(function (d) {
        return d.join(',')
    })
    .attr('x', function (d) {
        // return d[0];
        return x_scale(d[0]);
    })
    .attr('y', function (d) {
        // return d[1];
        return y_scale(d[1]);
    })
;