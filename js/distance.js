var SAMPLESIZE = 500;
var METRICS = ['l1', 'l2', 'dice', 'jaccard', 'l1/5', 'cosine', 'kl','kd', 'Hellinger', 'Bhattacharyya'];

$('#minkowski_l').change(minkowski_l_change_event);
$('#dimension_n').change(dimension_n_change_event);
//start
inital();
function scatter_plot_matrix(n){
    $('#canvas').empty();
    var n_data = n_dimension_data_generator(n),
        matrix = metrics_distance_matrix_generator(n_data, METRICS),
        width  = 40,
        height = 40;

    var svg    = d3.select('#canvas').append('svg').attr('width', 900).attr('height', 600);

    for(var i = 0; i < matrix.length; i++)
        for(var j = i + 1; j < matrix.length; j++)
            scatter_plot_matrix_element(matrix, i, j, i * width + 50 * (i+1), (j-1) *(height + 10) + height/3, width, height,correlation(matrix[i], matrix[j])>0.8);
    
    for(var i = 0; i < matrix.length-1; i++){
        var svg     = d3.select('#canvas svg');
        svg.append('text').text(METRICS[i]).attr('x', i * width + 60 * i + width).attr('y', 20);
        svg.append('text').text(METRICS[i+1]).attr('x', 10).attr('y', i * height*1.25 + height);
    }
}

function scatter_plot_matrix_element(data, i, j, x, y, width, height, highlight=false){
    var xscale  = d3.scale.linear().domain(d3.extent(data[i],function(d){
            return d;
        })).range([x, x + width  - 10]),
        yscale  = d3.scale.linear().domain(d3.extent(data[j],function(d){
            return d;
        })).range([y + height - 10, y]);

    var svg     = d3.select('#canvas svg'),
        xAxis   = d3.svg.axis().scale(xscale).orient('bottom').ticks(3), 
        yAxis   = d3.svg.axis().scale(yscale).orient('left').ticks(3);

    //svg.append('g')
    //    .attr('class', 'axis')
    //    .attr('transform', 'translate(' + x + ',' + y + ')')
    //    .call(xAxis);
    //svg.append('g')
    //    .attr('class', 'axis')
    //    .attr('transform', 'translate(' + x + ','+y+')')
    //   .call(yAxis);

    svg.selectAll('.point').data(data[i]).enter().append('circle')
        .attr('cx', function(d, index){
            return xscale(data[i][index]);
        })
        .attr('cy', function(d, index){
            return yscale(data[j][index]);
        })
        .attr('r',1)
        .attr('fill', function(d){
            if(highlight)
                return 'red';
            else
                return 'steelblue';
        });
}

function draw_2D_scatter_plot(data){
    
    var margin  = {top: 20, right: 20, bottom: 20, left: 20},
        width   = 600 - margin.left - margin.right,
        height  = 600 - margin.top  - margin.bottom,
        xscale  = d3.scale.linear().domain(d3.extent(data,function(d){
            return d[0];
        })).range([10, width - 10]),
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
    //scatter_plot_matrix_element(data, 0, 10, 100, 100, margin);
    //scatter_plot_matrix_element(data, 110, 120, 100, 100, margin);
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

//data: a high dimensional data matrix
//d-metrics: contain all metrics used to calculate pairwise distance
function metrics_distance_matrix_generator(data, metrics){
    var metrics_matrix = [];

    metrics.forEach(function(d){
        var m_distance = [];
        for(var i = 0; i < data.length; i++){
            for(var j = i + 1; j < data.length; j++){
                if(d == 'l1')
                    m_distance.push(Minkowski(data[i], data[j], 1));
                else if (d == 'l2')
                    m_distance.push(Minkowski(data[i], data[j], 2));
                else if (d == 'dice')
                    m_distance.push(Dice(data[i], data[j]));
                else if (d == 'jaccard')
                    m_distance.push(Jaccard(data[i], data[j]));
                else if (d == 'l1/5')
                    m_distance.push(Minkowski(data[i], data[j], 1.0/5));
                else if (d == 'cosine')
                    m_distance.push(Cosine(data[i]   , data[j]));
                else if (d == 'kl')
                    m_distance.push(Kullback_Leibler(data[i], data[j]));
                else if (d == 'kd')
                    m_distance.push(K_Divergence(data[i], data[j]));
                else if (d == 'Bhattacharyya')
                    m_distance.push(Bhattacharyya(data[i], data[j]));
                else if (d == 'Hellinger')
                    m_distance.push(Hellinger(data[i], data[j]));
            }
        }
        metrics_matrix.push(m_distance);
    });
    return metrics_matrix;
}

//N:    The number of dimension
//Size: The size of the data set
function n_dimension_data_generator(N, Size=20){
    var datamatrix = [];
    for(var s = 0; s < Size; s++){
        var data = [];
        for(var i = 0; i < N; i++)
            data.push(Math.floor(Math.random()*100));
        datamatrix.push(data);
    }
    return datamatrix;
}

/*
    Some thought about correlation  
    
        The correlation here means how the distance metric performance differetly as 
        the number of dimension increase.
 */
function correlation(d1, d2){

    var mean_d1 = 0,
        mean_d2 = 0,
        x       = 0,
        y       = 0,
        top     = 0,
        bottom  = 0;

    for(var i = 0, l = d1.length; i < l; i++){
        mean_d1 += d1[i];
        mean_d2 += d2[i];
    }

    mean_d1 = mean_d1/d1.length;
    mean_d2 = mean_d2/d2.length;

    for(var i = 0, l = d1.length; i < l; i++){
        top     += ((d1[i] - mean_d1) * (d2[i] - mean_d2));
        x       += ((d1[i] - mean_d1) * (d1[i] - mean_d1));
        y       += ((d2[i] - mean_d2) * (d2[i] - mean_d2));
    }
    return Math.abs(top/Math.sqrt(x*y));

}


function inital(){
    var n = $('#dimension_n').val();
    scatter_plot_matrix(n);
    //minkowski_l_change_event();
}
