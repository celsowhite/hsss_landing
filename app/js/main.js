$(document).ready(function() {

	/*=== Fullpage ===*/

	$('#main_content').fullpage({
		navigation: false,
		anchors:['about', 'meeting', 'her_recollection', 'act1', 'his_recollection', 'cuddleroom', 'cuddleaudio', 'question', 'herstory', 'hisstory', 'slider', 'finalaudio'],
		onLeave: function(index, nextIndex, direction){
			var leavingSection = $(this);

			var sectionTotal = $sectionTotal - 1;

			var calculate_index = index;

			if (direction == 'up') {
				calculate_index = nextIndex;
			}

			var percentage;
			if (direction == 'up' && calculate_index == 1) {calculate_index = 0}
			if (direction == 'down') {
				percentage = Math.ceil(calculate_index/sectionTotal * 100);
			} else {
				percentage = Math.floor(calculate_index/sectionTotal * 100);
			}
			$('.progressbar-cover').css('top' , (percentage) + '%');
		}
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

	$('#trailer_video').mediaelementplayer();

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

	$('.play_button').click(function(e){

		$('#trailer').toggleClass('visible');

		$('#trailer_video')[0].player.play();

		e.preventDefault();

	});

	$('#trailer a.back_to_story').click(function(e){

		$('#trailer_video')[0].player.pause();

	});

	$('a.back_to_story').click(function(e){

		$(this).parent('.page_overlay').removeClass('visible');

		console.log('yes');

	});
	$sectionTotal = $('.section').length;
});