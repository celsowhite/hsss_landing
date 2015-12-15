$(document).ready(function() {

	/*=== Fullpage ===*/

	$('#main_content').fullpage({
		navigation: false,
		anchors:['intro', 'meeting', 'her_recollection', 'act1', 'his_recollection', 'cuddleroom', 'cuddleaudio', 'question', 'herstory', 'hisstory', 'slider', 'finalaudio'],
	});

	/*=== Section Navigation ===*/

	$('#move_down').click(function() {

		$.fn.fullpage.moveSectionDown();

	});

	$('#move_up').click(function () {

		$.fn.fullpage.moveSectionUp();

	});

	/*=== Media Element HTML5 player ===*/

	$('audio').mediaelementplayer();

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