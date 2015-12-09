$(document).ready(function(){

	$('#main_content').fullpage({
		navigation: false,
	});

	$('#move_down').click(function() {

		$.fn.fullpage.moveSectionDown();

	});

	$('#move_up').click(function() {

		$.fn.fullpage.moveSectionUp();

	});

});