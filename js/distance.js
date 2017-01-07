var SAMPLESIZE = 500;

$('#minkowski_l').change(minkowski_l_change_event);

function draw_2D_scatter_plot(data){
    var margin  = {top: 20, right: 20, bottom: 20, left: 20},
        width   = 600 - margin.left - margin.right,
        height  = 600 - margin.top - margin.bottom,
        xscale  = d3.scale.linear().domain(d3.extent(data, function(d){
            return d[0];
        })).range([10, width-10]),
        yscale  = d3.scale.linear().domain(d3.extent(data, function(d){
            return d[1];
        })).range([10, height-10]);

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



///////////////////////// data generator //////////////////////////////
function minkowski_2D_Point(l){
    var points  = [],
        x       = 0,
        y       = 0,
        gap     = 2/SAMPLESIZE;
        

    for(var i= 0; i <= SAMPLESIZE; i++){
            x   = -1 + i * gap;
            temp = Math.abs(Math.pow(x, l));
            y   = Math.pow(1 - temp, 1.0/l);
            //y = 1 - temp
            points.push([x, y]);
            points.push([x, -y]);
    }
    
    for(var i= 0; i <= SAMPLESIZE; i++){
            y   = -1 + i * gap;
            temp = Math.abs(Math.pow(y, l));
            x   = Math.pow(1 - temp, 1.0/l);
            //x = 1 - temp
            console.log(Math.abs(Math.pow(x, l)) + Math.abs(Math.pow(y, l)));
            points.push([x, y]);
            points.push([-x, y]);
    }
    return points;
}

function minkowski_l_change_event(){
    $('#canvas').empty();
    var data = minkowski_2D_Point($('#minkowski_l').val());
    draw_2D_scatter_plot(data);
}