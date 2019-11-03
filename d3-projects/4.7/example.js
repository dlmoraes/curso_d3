// d3.scaleLinear().nice()
d3.scaleLinear()
    .domain([0.4344, 0.0912])
    .range([0, 100])
    .nice() // Domain turns into 0.4, 0.1
;

// d3.scaleLinear().rangeRound()
var scale = d3.scaleLinear()
    .domain([0, 10])
    // Use this instead of range
    .rangeRound([0, 100])
;

scale(5); // Retorna 50
scale(4.55); // Retorna 45

// d3.scaleLinear().clamp()
var scale = d3.scaleLinear()
    .domain([5, 10])
    .range([50, 100])
    .clamp(true)
;

scale(6); // Retorna 60
scale(3); // Retorna 50