function minkowski_l_change_event(){
	console.log($('#distance_option').val());
    $('#canvas').empty();
	var data = minkowski_2D_Point($('#minkowski_l').val());
	draw_2D_scatter_plot(data);
}

function dimension_n_change_event(){
    var n = $('#dimension_n').val();
    scatter_plot_matrix(n);
}