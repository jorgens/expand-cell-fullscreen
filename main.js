define([
    'base/js/namespace'
], function(
    Jupyter //include Jupyter to add button
) {

    function toggleFullscreen(elem) { //function to make element (cell) fullscreen on most browsers
	  elem = elem || document.documentElement;
	  if (!document.fullscreenElement && !document.mozFullScreenElement &&
	    !document.webkitFullscreenElement && !document.msFullscreenElement) {

	    if (elem.requestFullscreen) {
	      elem.requestFullscreen();
	    } else if (elem.msRequestFullscreen) {
	      elem.msRequestFullscreen();
	    } else if (elem.mozRequestFullScreen) {
	      elem.mozRequestFullScreen();
	    } else if (elem.webkitRequestFullscreen) {
	      elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
	    }
		height = window.innerHeight
	  	width = window.innerWidth - 300

		$('.cell.code_cell.selected div.output_wrapper div.output_subarea').css({'background-color' : 'white'})
		c = $( ".cell.code_cell.selected div.output_wrapper canvas" )
		c[0].style.width = width+"px"
		c[0].style.height = height+"px"
		c[0].height = 2*height
		c[0].width = 2*width

	  } else {
	    if (document.exitFullscreen) {
	      document.exitFullscreen();
	    } else if (document.msExitFullscreen) {
	      document.msExitFullscreen();
	    } else if (document.mozCancelFullScreen) {
	      document.mozCancelFullScreen();
	    } else if (document.webkitExitFullscreen) {
	      document.webkitExitFullscreen();
	    }
		c = $( ".cell.code_cell.selected div.output_wrapper canvas" )
		c[0].style.width = '640px'
		c[0].style.height = '640px'
		c[0].height = 1280
		c[0].width = 1280
	  }
	}

    function load_ipython_extension() {

        var handler = function () {
			$('.cell.code_cell.selected div.output_wrapper div.output_subarea').each( function() { toggleFullscreen(this) } ).css({'background-color' : 'white'}); //expand selected cell
        };

        var action = {
            icon: 'fa-arrows-alt', // cross of arrows to indicated expand to fullscreen
            help    : 'expand cell to fullscreen', //mouseover text
            help_index : 'zz',
            handler : handler
        };
        var prefix = 'expand-cell-fullscreen';
        var action_name = 'expand-cell-fullscreen';

        var full_action_name = Jupyter.actions.register(action, action_name, prefix);
        Jupyter.toolbar.add_buttons_group([full_action_name]); //add button to toolbar

    }

    return {
        load_ipython_extension: load_ipython_extension
    };
});
