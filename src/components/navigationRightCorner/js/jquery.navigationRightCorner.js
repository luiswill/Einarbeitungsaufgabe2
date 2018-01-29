/**
 * @name          jQuery navigationRightCorner
 * @version       1.0
 * @package       html-css-js
 * @subpackage    jQuery plugin
 * @author        JR, VI, LW
 *
 * based on: http://jqueryboilerplate.com/
 */

(function($, window, document, undefined) {
	'use strict';

	var pluginName = 'navigationRightCorner',
		defaults = {
			animationSpeed: 500
		};

	// The actual plugin constructor
	function Plugin(element, options) {
		this.$element = $(element);
		this.options = $.extend({}, defaults, options);
		this.init();
	}

	// methods
	var methods = {
		init: function() {
			// your init is goes here
			this.myFunction();
		},

		myFunction: function() {

			var SPEED_ANIMATION = 500;

			// var self = this;
            //

            //
            //
			// console.log('nav : ' + $navigation);
            //
			// var positionDiv = $navigation.offset().top;
			// console.log('position:  ' + positionDiv);
			// var offsetRight = $navigation.offset().left;
			// console.log('offsetRight:  ' + offsetRight);
            //
			// var movedNav = false;
			// var positionToShift = 0;
            //
			// var $closestNextSection = $navigation.closest('.section').next('.section');
			// var h = $navigation.closest('.section').height();
			// positionToShift =  (positionDiv + h / 2);
            //
            //
            //
            // var mPosition = $navigation.offset().top;
            // console.log('My position:  ' + mPosition);
            //
            //
            //
            // console.log('position to shift' + positionToShift);
            //
            //
            //
            // if ($(this).scrollTop() > positionDiv) {
            //
				// $navigation.css({
				// 	'position':'fixed',
				// 	'top': '0'
				// });
            //
            //
				// if(mPosition > positionToShift){
				// 	console.log('Shift !`!');
				// 	$navigation.prependTo($closestNextSection).addClass('navigationRightCorner');
				// 	$navigation.css({
				// 		'position': 'absolute',
				// 		'top': '0'
				// 	});
				// 	positionDiv = $navigation.offset().top;
            //
				// 	$closestNextSection = $navigation.closest('.section').next('.section');
				// 	h = $navigation.closest('.section').height();
				// 	positionToShift = (positionDiv + h / 2);
				// }


			var heightsOfSections = [];
			var heightsToShift = [];
			$('.section').each(function(){
				var height = $(this).outerHeight();
				var offset =   $(this).offset().top;

				console.log('height: ' + $(this).outerHeight(true));
				console.log('OFFSET : ' + $(this).offset().top);

				heightsOfSections.push(offset);
				heightsToShift.push(offset + (height / 2));
			});

			heightsToShift.forEach(function (value) {
				console.log('VAlue : ' + value);
			});


			var index = 0;
			var self = this;
			var $navigation = self.$element;

			var headerSize = $('.header').outerHeight();

			$navigation.css({
				'top': headerSize + 'px'
			});

			$(window).scroll(function(event) {
				var top = $(this).scrollTop();
				console.log('TOP : ' + $(this).scrollTop());

				if(top > heightsToShift[index]){
					console.log('SHIFT ** to ' + heightsOfSections[index]);
					var actualHeight = $navigation.css('top');
					console.log('actual height: ' + actualHeight);
					$navigation.animate({
						'top': heightsOfSections[index + 1] + 'px'
					}, SPEED_ANIMATION);
					index++;
				}

			});
			// 	if ($(this).scrollTop() <= positionDiv) {
			// 		$navigation.css({
			// 			'position': 'absolute',
			// 			'top': '0'
			// 		});
			// 	}
            //
            // });




			// $sections[0].fadeOut();

			// $sections.forEach(function($section){
			// 	console.log('section' + $section.height());
            //
			// });

			// Navigation menu
			var $navElement = $('.navigation__element');

			$navElement.on('mouseenter', function() {
				$(this).addClass('activeMenuItem active');
				$(this).append('<span class="arrowDownNavigation"></span>');
			});


			$navElement.on('mouseleave', function() {
				$(this).removeClass('activeMenuItem active');
				$(this).children('span').remove();
			});
		}
	};

	// build
	$.extend(Plugin.prototype, methods);

	// A really lightweight plugin wrapper around the constructor,
	// preventing against multiple instantiations
	$.fn[pluginName] = function(options) {
		this.each(function() {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName, new Plugin(this, options));

				// trigger ready event on element
				$.triggerFailsafeEvent($(this), 'plugin_' + pluginName + '.ready');
			}
		});

		// trigger ready event globally
		if (this.length > 0) {
			$.triggerFailsafeEvent($(window), 'plugin_' + pluginName + '.ready_all');
		}

		return this;
	};

})(jQuery, window, document);
