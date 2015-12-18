$(document).ready(function() {

	var main =  $('#main_content');
	//set Fader blur
	Fader.setBlurBackground(main);

	/*=== Fullpage ===*/

	main.fullpage({
		navigation: false,
		anchors:['home', 'meeting', 'her_recollection', 'act1', 'his_recollection', 'cuddleroom', 'cuddleaudio', 'question', 'herstory', 'hisstory', 'slider', 'whatsnext', 'about'],
		onLeave: function(index, nextIndex, direction){
			console.log(index, nextIndex, direction);
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
			$('.progressbar-cover').css('top' , (percentage/3) + '%');
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

		var about = $('#about');
		Fader.changeOverlay(about);

		e.preventDefault();

	});

	$('.team_link').click(function(e){

		var team = $('#team');
		Fader.changeOverlay(team);
		e.preventDefault();


	});

	$('.newsletter_link').click(function(e){

		var newsletter = $('#newsletter');
		Fader.changeOverlay(newsletter);

		e.preventDefault();

	});

	$('.play_button').click(function(e){

		var trailer = $('#trailer');
		Fader.toggleElemOn(trailer);

		$('#trailer_video')[0].player.play();

		e.preventDefault();

	});

	$('#trailer a.back_to_story').click(function(e){

		$('#trailer_video')[0].player.pause();
		Fader.toggleElemOff($('#trailer'));

	});

	$('.main_panel').click(function(e) {
		$('#trailer_video')[0].player.pause();
		//GRAB ELEMENTS THAT ARE ACTIVE BUT AREN'T IN THE PROCESS OF FADING
		var activeElements = $('.fader__active').not('.transit');
		if (activeElements) {Fader.toggleElemOff(activeElements);}
	});

	$('.trailer_underlay').click(function(e){
		//CLOSE THE TRAILER IF WE CLICK OUTSIDE IT
		$('#trailer_video')[0].player.pause();
		Fader.toggleElemOff($('#trailer'));
	});

	$('a.back_to_story').click(function(e){
		var overlay = $(this).parent('.page_overlay');
		Fader.changeOverlay(overlay);

	});

	$('.whatsnext_link').click(function(e) {
		$('.progressbar-cover').css('top' , (90) + '%');
		$.fn.fullpage.moveTo(12);
	});
	var she_clicked = new Tracker('cuddle_believe', 'she');
	var he_clicked = new Tracker('cuddle_believe', 'he');

	$('.she').click(function(e) {
		she_clicked.sendData();
	});

	$('.he').click(function(e) {
		he_clicked.sendData();
	});

	$sectionTotal = $('.section').length;
});