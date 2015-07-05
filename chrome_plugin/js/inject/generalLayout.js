function injectDiv() {
  var page = $('#page')[0];

  var div = $('<div id="emptyBox"><br><br></div>');
  div.insertBefore(document.body.childNodes[0]);

  var open = $('<div id="openSelectionBox"><span class="cart-icon glyphicon glyphicon-shopping-cart" aria-hidden="true"></span> &Ouml;ffnen</div>');
  var help = $('<div id="help-section"><li class="dropdown active"> <a class="dropdown-toggle" data-toggle="dropdown" href="#" aria-expanded="false"><span class="cart-icon glyphicon glyphicon-question-sign" aria-hidden="true"></span> Hilfe <span class="caret"></span> </a> <ul class="dropdown-menu"> <li class=""><a href="#tourstarten" data-toggle="tab" aria-expanded="false">Führung starten</a></li> <li class="divider"></li> <li class=""><a href="http://vlvical.github.io/" data-toggle="tab" aria-expanded="true">FAQ & Webseite</a></li> </ul> </li> </div>');
  var settings = $('<div id="settings-button"><span class="cart-icon glyphicon glyphicon-cog"></span> <span>Einstellungen</span> <span class="padded-divider">|</span> </div>');
  var logo = $('<div id="pluginLogo"> <a href="http://vlvical.github.io/" target="_blank">VLV.ical</a> <span class="padded-divider">|</span> </div>');
  $('#emptyBox').prepend(open);
  $('#emptyBox').prepend(help);
  $('#emptyBox').prepend(settings);
  $('#emptyBox').prepend(logo);

  $(settings).on('click', function() {
    openSettingsDialog();
  });

  var box = $('<div id="selectionBox"><br></div>')
  box.insertBefore(document.body.childNodes[0]);

  open = $('#openSelectionBox')[0];
  open.onclick = function () {
    openBox();
    };

  var downloadArea = $('<div id="downloadArea"></div>');
  downloadArea.insertBefore($('#selectionBox')[0].childNodes[0]);

  var itemBox = $('<div id="itemBox"><br></div>');
  itemBox.insertBefore($('#selectionBox')[0].childNodes[0]);
  
  var backButton = $('<header class="cart-header"><div id="backButton"><p><span class="cart-icon glyphicon glyphicon-shopping-cart" aria-hidden="true"></span> Schließen</p></div></header>');
  backButton.insertBefore($('#selectionBox')[0].childNodes[0]);

  /*
   * Insert Trash Button
   */
  var deleteCart = $('<div id="deleteCart"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></div>');
  $('.cart-header').prepend(deleteCart);

  $(deleteCart).on('click', function () {
    bootbox.dialog({
      title: 'Warenkorb entleeren',
      message: 'Willst du den Warenkorb entleeren?',
      closeButton: false,
      buttons: {
          success: {
              label: "Ja",
              className: "btn-primary",
              callback: function () {
                try {
                    save('selection', []);
                    clearDataWithPrefix('nr');
                    updateSelection();
                } catch(e) {
                    toastr.error(e, 'Fehler');
                    return false;
                }
              }
          },
          cancel: {
              label: "Abbrechen",
              className: "btn-default",
              callback: function(){}
          }
      },
      keyboard: false
    });
  });
  
  /*
   * Hover Effect for Trash Symbol
   */
  $(deleteCart).on('mouseenter', function () {
    $(this).find('span').fadeOut(500, function() { $(this).remove(); });
    $(this).append('<p>Entleeren</p>');
  });

  $(deleteCart).on('mouseleave', function () {
    $(this).find('p').fadeOut(500, function() { $(this).remove(); });
    $(this).append('<span class="glyphicon glyphicon-trash" aria-hidden="true"></span>');
  });

  backButton = $('#backButton')[0];
  backButton.onclick = function () {
    closeBox(this.parentNode);
    page.style.width = "100%";
  };

  injectDownloadButtons();
}