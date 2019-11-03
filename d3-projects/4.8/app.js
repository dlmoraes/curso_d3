/*var data = [
    [400, 200],
    [210, 140],
    [722, 300],
    [70, 160],
    [250, 50],
    [110, 280],
    [699, 225],
    [90, 220]
];*/
var data = [
    { date: '07/01/2019', num: 20 },
    { date: '07/02/2019', num: 37 },
    { date: '07/03/2019', num: 25 },
    { date: '07/04/2019', num: 45 },
    { date: '07/05/2019', num: 23 },
    { date: '07/06/2019', num: 33 },
    { date: '07/07/2019', num: 49 },
    { date: '07/08/2019', num: 40 },
    { date: '07/09/2019', num: 36 },
    { date: '07/10/2019', num: 27 }
];
var chart_width = 1000;
var chart_height = 400;
var padding = 50;

var time_parse = d3.timeParse('%m/%d/%Y');
var time_format = d3.timeFormat('%e/%b');

data.forEach(function (e, i) {
   data[i].date = time_parse(e.date);
});

// Criar SVG
var svg = d3.select('#chart')
    .append('svg')
    .attr('width', chart_width)
    .attr('height', chart_height);

// Criar Escalas
/*var x_scale = d3.scaleLinear()
    .domain([0, d3.max(data, function (d) {
        return d[0];
    })])
    .range([padding, chart_width - padding * 2])
;
*/

var x_scale = d3.scaleTime()
    .domain([
        d3.min(data, function (d) {
            return d.date
        }),
        d3.max(data, function (d) {
          return d.date
        })
    ])
    .range([padding, chart_width - padding * 2])

var y_scale = d3.scaleLinear()
    .domain([0, d3.max(data, function (d) {
        return d.num;
    })])
    // .range([padding, chart_height - padding])
    .range([chart_height - padding, padding])
;

var r_scale = d3.scaleLinear()
    .domain([0, d3.max(data, function (d) {
        return d.num;
    })])
    .range([5, 30])
;

var a_scale = d3.scaleSqrt()
    .domain([0, d3.max(data, function (d) {
        return d.num;
    })])
    .range([0, 25])
;

// Criar circulos
svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', function (d) {
        //return d[0];
        return x_scale(d.date);
    })
    .attr('cy', function (d) {
        // return d[1];
        return y_scale(d.num);
    })
    .attr('r', function (d) {
        // raio
        // return d[1] / 10;
        return a_scale(d.num);
    })
    .attr('fill', '#D1AB0E');

// Criar rotulos
svg.selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .text(function (d) {
        return time_format(d.date);
    })
    .attr('x', function (d) {
        // return d[0];
        return x_scale(d.date);
    })
    .attr('y', function (d) {
        // return d[1];
        return y_scale(d.num);
    })
;