var data            =   [6,20,21,14,2,30,7,16,25,5,11,28,10,26,9];

// Criar SVG
var chart_width     =   800;
var chart_height    =   400;
var bar_padding     =   5;
var svg             =   d3.select( '#chart' )
    .append( 'svg' )
    .attr( 'width', chart_width )
    .attr( 'height', chart_height );

var direcao = 1;

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

// Eventos
d3.select('button').on('click', function () {
    //data.reverse();
    data[0] = 50;
    y_scale.domain([0, d3.max(data)]);

    svg.selectAll('rect')
        .data(data)
        .transition()
        // .delay(1000) // Geral
        .delay(function (d, i) {
            // Delay diferente para cada barra
            // return i * 100;
            // return direcao == 1 ? i * 100 : (data.length - i) * 100
            return i / data.length * 1000
        })
        .duration(1000) // 1000 = 1 segundo
        .ease(d3.easeElasticOut)
        .attr( 'y', function(d ){
            //return chart_height - d * 5;
            return chart_height - y_scale(d);
        })
        .attr( 'height', function( d ){
            //return d * 5;
            return y_scale(d)
        })

    svg.selectAll( 'text' )
        .data(data)
        .transition()
        //.delay(1000) // Geral
        .delay(function (d, i) {
            // Delay diferente para cada barra
            // return i * 100;
            // return direcao == 1 ? i * 100 : (data.length - i) * 100
            return i / data.length * 1000
        })
        .duration(1000) // 1000 = 1 segundo
        .ease(d3.easeElasticOut)
        .text(function( d ){
            return d;
        })
        .attr( 'x', function( d, i ){
            return x_scale(i) + x_scale.bandwidth() / 2
        })
        .attr( 'y', function(d ){
            return chart_height - y_scale(d) + 15
        })

    direcao = direcao == 1 ? 2 : 1;
});