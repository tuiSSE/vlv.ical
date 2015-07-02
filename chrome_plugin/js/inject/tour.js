$(function(){
  var tourCompleted = localStorage.getItem('tourCompleted') || false;
  var introguide = introJs();
  // var startbtn   = $('#startdemotour');
  introguide.setOptions({
    steps: [
        {
          element: '#pluginLogo',
          intro: 'Willkommen zu VLV.ical!<br><br> Dieses Tutorial wird dich durch das Plugin führen. <br><br> Benutze die "Pfeiltasten" um durch die Führung zu navigieren. <br><br> Mit der "ESC-Taste" kannst du das Tutorial vorzeitig beenden.<br><br> Bei "Hilfe" kannst du zur einer späteren Zeit das Tutorial wieder starten',
          position: 'right'
        },
        {
          element: '#emptyBox',
          intro: 'Das ist die Menüleiste <br><br> Hier kannst du diverse Einstellungen für deine Veranstaltungen übernehmen <br><br> Du kannst auf  VLV.ical klicken um die Webseite zu besuchen.',
          position: 'bottom'
        },
        {
          element: '#emptyBox',
          intro: 'Mit einem Klick auf "Öffnen" öffnest du dein Warenkorb <br><br> Teste es gleich! <br><br> Um mit der Führung fortzufahren, öffne bitte zuerst den Warenkorb und fahre anschließen mit "Weiter" fort.',
          position: 'bottom-right-aligned'
        },
        {
          element: '#selectionBox',
          intro: 'Super! <br><br> Das ist dein Warenkorb. <br><br> Hier (siehst/sammelst/stapelst) du deine ausgewählten Veranstaltungen.',
          position: 'left'
        },
        {
          element: '#selectAll',
          intro: 'Der "Alles auswählen" Button fügt alle auf der Seite ersichtlichen Veranstaltungen in deinen Warenkorb.',
          position: 'bottom'
        },
        {
          element: '.addButton',
          intro: 'Die Blauen Schaltflächen sind vom Plugin erkannte Veranstaltungen, die du separat (einzeln) in den Warenkorb hinzufügen, oder entfernen kannst.',
          position: 'top'
        },
        {
          element: '.moreInfoButton',
          intro: 'Die "Weitere Informationen" Schaltfläche leitet dich zur Detailansicht weiter. <br><br>  In der Detailansicht kannst du einzelne Termine herunterladen. <br><br><br><br><br> Das ist sehr hilfreich, wenn z.B eine Veranstaltung mehrere Übungstermine hat.',
          position: 'floating'
        },
        {
          element: '.selectionBoxItem',
          intro: 'kp was das darstellen soll.',
          position: 'left'
        },
        {
          element: '.cd-item-remove',
          intro: 'kp was das darstellen soll.',
          position: 'left'
        },
        {
          element: '#downloadSelected',
          intro: 'Mit einem Klick auf den  "Download" Button wird der inhalt des Warenkorbs heruntergeladen.',
          position: 'top'
        },
        {
          element: '#deleteCart',
          intro: 'Die rote Schaltfläche mit dem Papierkorb Symbol, löscht den Warenkorb unwiederruflich.',
          position: 'left'
        },
        {
          element: '#backButton',
          intro: 'Wenn du dein Warenkorb ausblenden willst, dann reicht ein Klick auf den "Schließen" Button.',
          position: 'bottom'
        },
        {
          element: '#settings-button',
          intro: 'Unter "Einstellungen" kannst du dein Warenkorb einstellen. <br><br> Viel Spaß mit wenigen Klicks dein Stundenplan zusammenzustellen! <br><br> Nicht vergessen deinen Kommmilitonen von dem Plugin zu erzählen ;-)',
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