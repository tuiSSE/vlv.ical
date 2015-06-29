$(function(){
  var tourCompleted = localStorage.getItem('tourCompleted') || false;
  var introguide = introJs();
  // var startbtn   = $('#startdemotour');
  introguide.setOptions({
    steps: [
        {
          element: '#pluginLogo',
          intro: 'This guided tour will explain how to use this plugin for a splendid experience.<br><br>Use the arrow keys for navigation or hit ESC to exit the tour immediately.',
          position: 'bottom'
        },
        {
          element: '#emptyBox',
          intro: 'Here you can deactivate the plugin, go to settings and open the cart.',
          position: 'bottom'
        },
        {
          element: '#emptyBox',
          disableInteraction: false,
          intro: 'Click the "Öffnen" Button to show the cart.',
          position: 'bottom-right-aligned'
        },
        {
          element: '#selectionBox',
          intro: 'This is your cart. Here you will find your chosen events',
          position: 'left'
        },
        {
          element: '#backButton',
          intro: "Let's close the cart. Click on 'Schliessen' to close",
          position: 'bottom'
        }
    ]
  });
  /*
   * Check if there was already a tour and check if the current url matches the pattern
   */
  if(!tourCompleted && window.location.href.includes('www.tu-ilmenau.de/vlv/index.php') && window.location.href.includes('vers=text')) {
    introguide.start();
  }

  introguide.oncomplete(function() {
    localStorage.setItem('tourCompleted', true);
  });
  introguide.onexit(function() {
    localStorage.setItem('tourCompleted', true);
  }); 
	/**
	  * Example for extended properties of a tour 
      startbtn.on('click', function(e){
	      e.preventDefault();
	      introguide.start();
	      $(this).hide();
	    });
	     
	     * oncomplete re-display the button
	     * hide by default since we don't need this functionality.
	    introguide.oncomplete(function() {
	      if(startbtn.css('display') == 'none') {
	        startbtn.show();
	      }
	    });
	    introguide.onexit(function() {
	      if(startbtn.css('display') == 'none') {
	        startbtn.show();
	      }
	    }); 
	**/
});