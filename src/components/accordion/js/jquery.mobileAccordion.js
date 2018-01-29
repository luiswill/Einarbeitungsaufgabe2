/**
 * @name          jQuery mobileAccordion
 * @version       1.0
 * @lastmodified  2017-01-26
 * @package       html-css-js
 * @subpackage    jQuery plugin
 * @author        JR, VI, LW
 *
 * based on: http://jqueryboilerplate.com/
 */

(function($, window, document, undefined) {
	'use strict';

	var pluginName = 'accordion',
		defaults = {
			foo: 'bar',
			foo2: 'bar'
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
			this.$element.removeClass('hiddenOnLoad');

			if ($(window).width() < 768) {
				this.addEventListeners(this.$element);
			}
		},

		addEventListeners: function($accordion) {
			var self = this;

			var $accordionBlock = self.$element.find('.accordion__block');


			$accordionBlock.on('click', function() {
				var $mAccordionBlock = $(this);

				var $paragraph = $mAccordionBlock.find('.accordion__text');
				var $arrowTopLeft = $mAccordionBlock.find('.accordion__arrowTopLeft');
				var $arrow = $mAccordionBlock.find('.accordion__arrowGoExternalPage');

				if ($paragraph.css('opacity') === '1') { // if p is displayed
					self.hideParagraph($paragraph, $arrowTopLeft, $arrow);
				} else {
					self.showParagraph($paragraph, $arrowTopLeft, $arrow);
				}
			});


		},
		showParagraph: function($paragraph, $arrowTopLeft, $arrow) {

			$paragraph.css({
				'opacity': '1',
				'max-height': '100%',
				'display': 'block'
			});

			// Show arrow go external page
			$($arrow).css('display', 'inline');

			// Hide arrow Top left
			$arrowTopLeft.css('display', 'none');
		},

		hideParagraph: function($paragraph, $arrowTopLeft, $arrow) {
			$paragraph.css({
				'opacity': '0',
				'max-height': '0px',
				'display': 'none'
			});

			// Hide arrow go external page
			$($arrow).css('display', 'none');

			// Show arrow top left
			$arrowTopLeft.css('display', 'block');
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
