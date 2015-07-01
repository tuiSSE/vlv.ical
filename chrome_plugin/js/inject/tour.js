$(function(){
  var tourCompleted = localStorage.getItem('tourCompleted') || false;
  var introguide = introJs();
  // var startbtn   = $('#startdemotour');
  introguide.setOptions({
    steps: [
        {
          element: '#pluginLogo',
          intro: 'Willkommen zu VLV.ical!<br<br> Diese Tour wird dich durch das Plugin führen.<br><br>Benutze die "Pfeiltasten" um durch die Führung zu navigieren. <br><br> Mit der "ESC-Taste" kannst du die Führung vorzeitig beenden.',
          position: 'right'
        },
        {
          element: '#emptyBox',
          intro: 'Das ist die Menüleiste <br><br> Hier kannst du diverse Einstellungen für deine Veranstaltungen übernehmen, auf VLV.ical klicken um die Webseite zu besuchen oder aber auch bei Hilfe den support kontaktieren',
          position: 'bottom'
        },
        {
          element: '#emptyBox',
          intro: 'Das ist dein Warenkorb<br><br> Wenn du darauf klickst, öffnet sich dein Warenkorb und du kannst deine Ausgewählten Veranstaltungen sehen. <br> Mit einem erneutem Klick auf die gewünschte Vernstaltung gelangst du zum bearbeitungsfenster <br><br> Danke das du VLV.ical benutzt und viel Spaß damit',
          position: 'bottom-right-aligned'
        },
        {
          element: '#selectionBox',
          intro: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis, consectetur at amet mollitia repudiandae animi eveniet, quasi hic incidunt quidem praesentium ad aperiam accusamus delectus et quod doloremque consequatur quo!',
          position: 'left'
        },
        {
          element: '#selectAll',
          intro: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste sapiente enim voluptatum repellat sequi. Eius ad provident deleniti, aliquam. Id, ex quo architecto tempore quibusdam voluptatem dolorem ipsum fuga sapiente.",
          position: 'bottom'
        },
        {
          element: '.addButton',
          intro: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste sapiente enim voluptatum repellat sequi. Eius ad provident deleniti, aliquam. Id, ex quo architecto tempore quibusdam voluptatem dolorem ipsum fuga sapiente.",
          position: 'top'
        },
        {
          element: '.moreInfoButton',
          intro: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste sapiente enim voluptatum repellat sequi. Eius ad provident deleniti, aliquam. Id, ex quo architecto tempore quibusdam voluptatem dolorem ipsum fuga sapiente.",
          position: 'floating'
        },
        {
          element: '.selectionBoxItem',
          intro: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste sapiente enim voluptatum repellat sequi. Eius ad provident deleniti, aliquam. Id, ex quo architecto tempore quibusdam voluptatem dolorem ipsum fuga sapiente.",
          position: 'left'
        },
        {
          element: '.cd-item-remove',
          intro: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste sapiente enim voluptatum repellat sequi. Eius ad provident deleniti, aliquam. Id, ex quo architecto tempore quibusdam voluptatem dolorem ipsum fuga sapiente.",
          position: 'left'
        },
        {
          element: '#downloadSelected',
          intro: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste sapiente enim voluptatum repellat sequi. Eius ad provident deleniti, aliquam. Id, ex quo architecto tempore quibusdam voluptatem dolorem ipsum fuga sapiente.",
          position: 'top'
        },
        {
          element: '#deleteCart',
          intro: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste sapiente enim voluptatum repellat sequi. Eius ad provident deleniti, aliquam. Id, ex quo architecto tempore quibusdam voluptatem dolorem ipsum fuga sapiente.",
          position: 'left'
        },
        {
          element: '#backButton',
          intro: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste sapiente enim voluptatum repellat sequi. Eius ad provident deleniti, aliquam. Id, ex quo architecto tempore quibusdam voluptatem dolorem ipsum fuga sapiente.",
          position: 'bottom'
        },
        {
          element: '#settings-button',
          intro: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste sapiente enim voluptatum repellat sequi. Eius ad provident deleniti, aliquam. Id, ex quo architecto tempore quibusdam voluptatem dolorem ipsum fuga sapiente.",
          position: 'bottom'
        }
    ]
  });
  /*
   * Check if there was already a tour and check if the current url matches the pattern
   *
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