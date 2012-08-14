/*
PopImg v.1.0
by Kenichi Osada

Licensed under the Creative Commons Attribution 3.0 License - http://creativecommons.org/licenses/by/3.0/

You must attribute the work in the manner specified by the author or licensor (but not in any way that suggests that they endorse you or your use of the work).
*/

(function( $ ) {
	
	var methods = {
		measure  :  
			function(width, height) {
				var ratio = height / width;
				if ( height >= ( $(window).height() - 50 ) ) {
					// calculate width in proportion to resized height
					height = $(window).height() - 50;
					width = height / ratio;
			
					// if width is still wider than a screen, shrink width and recalculate height
					if ( width >= ( $(window).width() - 50 ) ) {
						width = $(window).width() - 50;
						height = width * ratio;
					}	
				}
				var left = ( ( $(window).width() - width ) / 2 ) - 10;
				var top = ( ( $(window).height() - height ) / 2 ) - 10;
				return [left, top, width, height];
			},
		appendCss  :  
			function(measureResult) {
				var dimension = {
					'width' : measureResult[2],
					'height' : measureResult[3]
				}
				$('#popup').css(dimension);
				var position = {
					'left' : measureResult[0],
					'top' : measureResult[1]
				}
				$('#popup_content').css(position);		
			}
	}; // end methods	
		
		
	$.fn.popimg = function() {
		
		// set spin.js option

		var opts = {
			lines: 13, // The number of lines to draw
			length: 7, // The length of each line
			width: 4, // The line thickness
			radius: 10, // The radius of the inner circle
			rotate: 0, // The rotation offset
			color: '#FFF', // #rgb or #rrggbb
			speed: 1, // Rounds per second
			trail: 60, // Afterglow percentage
			shadow: false, // Whether to render a shadow
			hwaccel: false, // Whether to use hardware acceleration
			className: 'spinner', // The CSS class to assign to the spinner
			zIndex: 2e9, // The z-index (defaults to 2000000000)
			top: 'auto', // Top position relative to parent in px
			left: 'auto' // Left position relative to parent in px
		};
			
		// grab image url
		var image_href = this.attr("href");

		// create image object
		var img = new Image();

		if ($('#lightbox').length > 0) {
			$('#popup').remove();
			$('#lightbox').show();
			$('#popup_content').show();
		}else{
			// load background
			var lightbox = 
				'<div id="lightbox"><p id="close">Click to close</p></div>' + 
				'<div id="popup_content"></div>';	
			$('body').append(lightbox);	
		}

		var target = document.getElementById('lightbox');
		var spinner = new Spinner(opts);
		spinner.spin(target);
		
		img.onload = function() {
			var content = $(
				'<img src="' + image_href + '" id="popup" />'
			).hide();
			$('#popup_content').append(content);
			var measureResult = methods.measure(img.width, img.height);

			methods.appendCss(measureResult);	
			content.fadeIn(400);
			spinner.stop();				
		}
		
		// if image is not loaded. 
		img.onerror = function() {
			var content = $(
				'<p id="popup" class="error">'+
				'Image not found.'+
				'</p>'
			); 
			$('#popup_content').append(content);
			var measureResult = methods.measure(200, 30);
			methods.appendCss(measureResult);
			spinner.stop();
		}

		// this should be placed at the end
    	img.src = image_href;

		//close lightbox
		$('#lightbox').live('click', function() { 
			$('#lightbox').hide();
			$('#popup_content').hide();
		});

	};

})( jQuery );

