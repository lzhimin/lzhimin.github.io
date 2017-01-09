var SAMPLESIZE = 500;

$('#minkowski_l').change(minkowski_l_change_event);


//start
inital();



function draw_2D_scatter_plot(data){
    var margin  = {top: 20, right: 20, bottom: 20, left: 20},
        width   = 600 - margin.left - margin.right,
        height  = 600 - margin.top  - margin.bottom,
        xscale  = d3.scale.linear().domain(d3.extent(data,function(d){
            return d[0];
        })).range([10, width-10]),
        yscale  = d3.scale.linear().domain(d3.extent(data,function(d){
            return d[1];
        })).range([height - 10, 10]);

    var svg     = d3.select('#canvas').append('svg').attr('width', width).attr('height', height),
        xAxis   = d3.svg.axis().scale(xscale).orient('bottom');  
        yAxis   = d3.svg.axis().scale(yscale).orient('left');

    svg.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(0,' + (height)/2 + ')')
        .call(xAxis);
    svg.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate('+ (width/2) +',0)')
        .call(yAxis);

    
    svg.selectAll('.point').data(data).enter().append('circle')
        .attr('cx', function(d){
            return xscale(d[0]);
        })
        .attr('cy', function(d){
            return yscale(d[1]);
        })
        .attr('r',1);
}



///////////////////////// data generator //////////////////////////////
function minkowski_2D_Point(l){
    var points  = [],
        x       = 0,
        y       = 0,
        gap     = 1/SAMPLESIZE;
        
    
    if(l < 0)
        l = 1/Math.abs(l);

    for(var i= 0; i <= SAMPLESIZE; i++){
            x       = i * gap;
            temp    = Math.abs(Math.pow(x, l));
            y       = Math.pow(1 - temp, 1.0/l);
            //y = 1 - temp
            points.push([ x,  y]);
            points.push([-x,  y]);
            points.push([ x, -y]);
            points.push([-x, -y]);
    }
    
    for(var i= 0; i <= SAMPLESIZE; i++){
            y       = i * gap;
            temp    = Math.abs(Math.pow(y, l));
            x       = Math.pow(1 - temp, 1.0/l);
            //x = 1 - temp
            points.push([ x,  y]);
            points.push([-x,  y]);
            points.push([ x, -y]);
            points.push([-x, -y]);
    }
    return points;
}

function minkowski_l_change_event(){
	
	console.log($('#distance_option').val());
	
    	$('#canvas').empty();
    	var data = minkowski_2D_Point($('#minkowski_l').val());
    	draw_2D_scatter_plot(data);
}

function inital(){
    minkowski_l_change_event();
}
