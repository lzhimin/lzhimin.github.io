draw_2D_scatter_plot([]);

function draw_2D_scatter_plot(data){

    data = [[1,2],[2,3],[4,2],[5,4],[1,3],[1,43]];


    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom,
        xscale  = d3.scale.linear().domain(d3.extent(data, function(d){
            return d[0];
        })).range([0, width]),
        yscale  = d3.scale.linear().domain(d3.extent(data, function(d){
            return d[1];
        })).range([0, height]);

    var svg     = d3.select('#canvas').append('svg').attr('width', width).attr('height', height);
        

    svg.selectAll('.point').data(data).enter().append('circle')
        .attr('cx', function(d){
            return xscale(d[0]);
        })
        .attr('cy', function(d){
            return yscale(d[1]);
        })
        .attr('r',5);
}