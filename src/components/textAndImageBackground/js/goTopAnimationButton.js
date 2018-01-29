$(document).ready(function(){
	'use strict';

	$('.textAndImageBackground__goTopButton').on('click', function(){
		$('html, body').animate({ scrollTop: 0 }, 'slow');
	});
});
