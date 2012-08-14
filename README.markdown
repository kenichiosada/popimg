##PopImg
by Kenichi Osada

###Summary

A simple jQuery Plugin to add lighbox effect on your website. 

###Usage

Include code below in ``<head></head>``

	<script type="text/javascript">
		$(document).ready(function() {
			$('.popup').click(function(e) {
				e.preventDefault();
				$(this).popimg();		
			});
		});
	</script>

- Add 'popup' class to a tag. 

``<a href="image.jpg" class="popup">img or text</a>``

- You need to have [spin.js](http://fgnass.github.com/spin.js/) in addition to jQuery library. 

###License

Licensed under the Creative Commons Attribution 3.0 License - [http://creativecommons.org/licenses/by/3.0/
](http://creativecommons.org/licenses/by/3.0/)

You must attribute the work in the manner specified by the author or licensor (but not in any way that suggests that they endorse you or your use of the work).
