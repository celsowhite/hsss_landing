$(document).ready(function() {

	/*=== Fullpage ===*/

	$('#main_content').fullpage({
		navigation: false,
	});

	/*=== Section Navigation ===*/

	$('#move_down').click(function() {

		$.fn.fullpage.moveSectionDown();

	});

	$('#move_up').click(function () {

		$.fn.fullpage.moveSectionUp();

	});

	/*=== Page Links ===*/

	$('.about_link').click(function(e){

		$('#about').toggleClass('visible');

		e.preventDefault();

	});

	$('.team_link').click(function(e){

		$('#team').toggleClass('visible');

		e.preventDefault();

	});

	$('.newsletter_link').click(function(e){

		$('#newsletter').toggleClass('visible');

		e.preventDefault();

	});

	$('a.back_to_story').click(function(e){

		$(this).parent('.page_overlay').removeClass('visible');

		console.log('yes');

	});
});