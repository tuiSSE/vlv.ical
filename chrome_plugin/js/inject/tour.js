$(function(){
  var introguide = new Tour({
    steps: [
    {
      element: '#pluginLogo',
      title: 'Willkommen zu VLV.ical!',
      content: 'Dieses Tutorial wird dich durch das Plugin führen. <br><br> Benutze <kbd class="whitebutton"><b>←</b></kbd> <kbd class="whitebutton"><b>→</b></kbd> um durch die Führung zu navigieren. <br><br> Mit der <kbd class="whitebutton">ESC</kbd> Taste kannst du das Tutorial vorzeitig beenden.<br><br> Über <span style="color:rgb(116, 147, 179);background:rgb(44, 62, 80);;padding:0.2em 0.8em;"><span class="cart-icon glyphicon glyphicon-question-sign" aria-hidden="true"></span> Hilfe <span class="caret"></span></span> kannst du zur einer späteren Zeit das Tutorial wieder starten.',
      placement: 'right'
    },
    {
      element: '#emptyBox',
      content: '<b>Das ist die Menüleiste</b> <br><br> Hier kannst du durch das Plugin navigieren <br><br> Du kannst auf <span style="color:white;background:#45617D;padding:0.2em 0.8em;">VLV.ical</span> klicken um die Webseite zu besuchen.',
      placement: 'bottom'
    },
    {
      element: '#emptyBox',
      content: 'Drücke <kbd class="darkbluebutton"><span class="cart-icon glyphicon glyphicon-shopping-cart" aria-hidden="true"></span> Öffnen</kbd> und fahre mit <kbd class="bluebutton">Weiter »</kbd>fort. ',
      placement: 'bottom'
    },
    {
      element: '#selectionBox',
      content: 'Super! <br><br> Das ist dein Warenkorb. <br><br> Ausgewählte Veranstaltungen kannst du hier finden.',
      placement: 'left'
    },
    {
      element: '#selectAll',
      content: 'Der <span style="color:white;background:#7dcf85;padding:0.2em 0.8em;">Alle auswählen</span> Button fügt alle auf der Seite ersichtlichen Veranstaltungen in deinen Warenkorb ein.',
      placement: 'bottom'
    },
    {
      element: 'button.addButton:first',
      content: 'Die <span style="color:white;background:#435779;padding:0.2em 0.8em;"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span> <b>blaue Schaltfläche</b></span> sind vom Plugin erkannte Veranstaltungen, die du einzeln in den Warenkorb hinzufügen, oder entfernen kannst.<br><br> <b>PS</b>: Grau hinterlegte <span style="color:white;background:lightgrey;padding:0.2em 0.8em;"> Veranstaltungen</span> enthalten nicht genügend Informationen und werden nicht vom Plugin erkannt.' ,
      placement: 'top'
    },
    {
      element: '.moreInfoButton:first',
      content: 'Die <span style="color:white;background:#7dcf85;padding:0.2em 0.8em;">weitere Informationen</span> Schaltfläche leitet dich zur Detailansicht weiter. <br><br>  In dieser kannst du einzelne Termine herunterladen. <br><br> Das ist sehr hilfreich, wenn z.B eine Veranstaltung mehrere Übungstermine hat.',
      placement: 'bottom'
    },
    {
      element: '.selectionBoxItem:first',
      content: 'Bearbeite eine Veranstaltung, indem du darauf klickst. ',
      placement: 'bottom'
    },
    {
      element: '.cd-item-remove:first',
      content: 'Damit löschst du die Veranstaltung aus dem Warenkorb.',
      placement: 'left'
    },
    {
      element: '#downloadSelected',
      content: 'Mit einem Klick auf den <span style="color:white;background:#7dcf85;padding:0.2em 0.8em;">Download</span> Button wird der Inhalt des Warenkorbs heruntergeladen.',
      placement: 'top'
    },
    {
      element: '#deleteCart',
      content: '<span style="color:white;background:#ea6a68;padding:0.2em 0.8em;"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></span> löscht den Warenkorb unwiderruflich.',
      placement: 'left'
    },
    {
      element: '#backButton',
      content: 'Wenn du dein Warenkorb ausblenden willst, dann reicht ein Klick auf <br> <kbd class="darkbluebutton"><span class="cart-icon glyphicon glyphicon-shopping-cart" aria-hidden="true"></span> Schließen</kbd>',
      placement: 'bottom'
    },
    {
      element: '#settings-button',
      content: 'Unter <span style="color:rgb(116, 147, 179);background:rgb(44, 62, 80);;padding:0.2em 0.8em;"><span class="cart-icon glyphicon glyphicon-cog"></span> Einstellungen</span> kannst du das Plugin konfigurieren. <br><br> Viel Spaß beim zusammenstellen deines Stundenplanes! <br><br><b>PS:</b> Erzähl doch deinen Kommilitonen davon ;-)',
      placement: 'bottom'
    }],
    storage: true,
    debug: true,
    template: "<div class='popover tour'>" +
                  "<div class='arrow'></div>" +
                  "<h3 class='popover-title'></h3>" +
                  "<div class='popover-content'></div>" +
                  "<div class='popover-navigation'>" +
                      "<button class='btn btn-default btn-xs' data-role='prev'>« Zur&uuml;ck</button>" +
                      "<span data-role='separator'>|</span>" +
                      "<button class='btn btn-info btn-xs' data-role='next'>Weiter »</button>" +
                      "<button class='btn btn-warning btn-xs' data-role='end'>Beenden</button>" +
                  "</div>" +
                "</div>",
  });

  introguide.init();
  /*
   * Check if there was already a tour and check if the current url matches the pattern
   *
  */  
  if(window.location.href.includes('www.tu-ilmenau.de/vlv/index.php') && window.location.href.includes('vers=text')) {
    introguide.start();
  }

  $(' a[href="#tourstarten"] ').on('click', function(){
    introguide.restart();
  });
});