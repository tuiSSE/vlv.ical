$(function(){
  var introguide = new Tour({
    steps: [
    {
      element: '#pluginLogo',
      title: 'Willkommen zu VLV.ical!',
      content: 'Dieses Tutorial wird dich durch das Plugin führen. <br><br> Benutze die "Pfeiltasten" um durch die Führung zu navigieren. <br><br> Mit der "ESC-Taste" kannst du das Tutorial vorzeitig beenden.<br><br> Bei "Hilfe" kannst du zur einer späteren Zeit das Tutorial wieder starten',
      placement: 'bottom'
    },
    {
      element: '#emptyBox',
      content: 'Das ist die Menüleiste <br><br> Hier kannst du diverse Einstellungen für deine Veranstaltungen übernehmen <br><br> Du kannst auf  VLV.ical klicken um die Webseite zu besuchen.',
      placement: 'bottom'
    },
    {
      element: '#emptyBox',
      content: 'Mit einem Klick auf "Öffnen" öffnest du dein Warenkorb <br><br> Teste es gleich! <br><br> Um mit der Führung fortzufahren, öffne bitte zuerst den Warenkorb und fahre anschließen mit "Weiter" fort.',
      placement: 'bottom'
    },
    {
      element: '#selectionBox',
      content: 'Super! <br><br> Das ist dein Warenkorb. <br><br> Hier (siehst/sammelst/stapelst) du deine ausgewählten Veranstaltungen.',
      placement: 'left'
    },
    {
      element: '#selectAll',
      content: 'Der "Alles auswählen" Button fügt alle auf der Seite ersichtlichen Veranstaltungen in deinen Warenkorb.',
      placement: 'bottom'
    },
    {
      element: 'button.addButton:first',
      content: 'Die Blauen Schaltflächen sind vom Plugin erkannte Veranstaltungen, die du separat (einzeln) in den Warenkorb hinzufügen, oder entfernen kannst.',
      placement: 'top'
    },
    {
      element: '.moreInfoButton:first',
      content: 'Die "Weitere Informationen" Schaltfläche leitet dich zur Detailansicht weiter. <br><br>  In der Detailansicht kannst du einzelne Termine herunterladen. <br><br><br><br><br> Das ist sehr hilfreich, wenn z.B eine Veranstaltung mehrere Übungstermine hat.',
      placement: 'bottom'
    },
    {
      element: '.selectionBoxItem:first',
      content: 'kp was das darstellen soll.',
      placement: 'left'
    },
    {
      element: '.cd-item-remove:first',
      content: 'kp was das darstellen soll.',
      placement: 'left'
    },
    {
      element: '#downloadSelected',
      content: 'Mit einem Klick auf den  "Download" Button wird der inhalt des Warenkorbs heruntergeladen.',
      placement: 'top'
    },
    {
      element: '#deleteCart',
      content: 'Die rote Schaltfläche mit dem Papierkorb Symbol, löscht den Warenkorb unwiederruflich.',
      placement: 'left'
    },
    {
      element: '#backButton',
      content: 'Wenn du dein Warenkorb ausblenden willst, dann reicht ein Klick auf den "Schließen" Button.',
      placement: 'bottom'
    },
    {
      element: '#settings-button',
      content: 'Unter "Einstellungen" kannst du dein Warenkorb einstellen. <br><br> Viel Spaß mit wenigen Klicks dein Stundenplan zusammenzustellen! <br><br> Nicht vergessen deinen Kommmilitonen von dem Plugin zu erzählen ;-)',
      placement: 'bottom'
    }],
    storage: false,
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