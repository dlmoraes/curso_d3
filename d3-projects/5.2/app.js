var data            =   [6,20,21,14,2,30,7,16,25,5,11,28,10,26,9];

// Criar SVG
var chart_width     =   800;
var chart_height    =   400;
var bar_padding     =   5;
var svg             =   d3.select( '#chart' )
    .append( 'svg' )
    .attr( 'width', chart_width )
    .attr( 'height', chart_height );

// Criar escalas
/*
 800 / 15 = 53.33
 0, 53.33, 106.66
*/
var x_scale = d3.scaleBand()
    .domain(d3.range(data.length))
    .rangeRound([0, chart_width])
    .paddingInner(0.05);

var y_scale = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([0, chart_height]);

// Vincular dados e criar barras
svg.selectAll( 'rect' )
    .data( data )
    .enter()
    .append( 'rect' )
    .attr( 'x', function( d, i ){
        // return i * ( chart_width / data.length );
        return x_scale(i)
    })
    .attr( 'y', function(d ){
        //return chart_height - d * 5;
        return chart_height - y_scale(d);
    })
    //.attr( 'width', chart_width / data.length - bar_padding )
     .attr( 'width', x_scale.bandwidth() )
    .attr( 'height', function( d ){
        //return d * 5;
        return y_scale(d)
    })
    .attr( 'fill', '#7ED26D' );

// Criar rotulos
svg.selectAll( 'text' )
    .data(data)
    .enter()
    .append( 'text' )
    .text(function( d ){
        return d;
    })
    .attr( 'x', function( d, i ){
        return x_scale(i) + x_scale.bandwidth() / 2
    })
    .attr( 'y', function(d ){
        return chart_height - y_scale(d) + 15
    })
    .attr( 'font-size', 14 )
    .attr( 'fill', '#fff' )
    .attr( 'text-anchor', 'middle' );