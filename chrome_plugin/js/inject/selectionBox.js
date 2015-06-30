function updateSelectionBox() {
  var itemBox = $('#itemBox')[0];
  itemBox.innerHTML = '<br>';

  try {
    var items = load('selection');
    for (var i = 0; i < items.length; i++) {
      var item = load(items[i]);
      var element = $('<button id="' +
                        item.id +
                        '" class="selectionBoxItem">' +
                        item.name + 
                        '</button>');
      var removeButton = $('<button name="'+ item.id +
                           '" class="cd-item-remove cd-img-replace">Remove</button>');

      element.insertBefore($('#itemBox')[0].childNodes[i]);
      
      /* Wrap element inside li to apply styles to row */
      $(element).wrap('<li></li>');
      (element).after(removeButton);

      /* highlight element, if it was changed through edit dialog */
      if (item.changed) {
        $(element).parent().addClass('item-edited');
        $(element).append('<br> <em class="small text-muted">- This item has been edited</em>');
      }

      $(element).on('click', function() {
          openEditDialog(this.id);
      });
    }
    // Delete a chosen Object
    var id = null;
    $('#itemBox li .cd-item-remove').on('click', function() {
      id = this.name;
      var item = load(id);
      removeFromCart(item);
    });
  } catch(e) {
    console.log("Could not update selection.");
    console.log(e);
  }
}

function openEditDialog(id) {
  var data = load(id);
  var date,
      begin,
      end,
      type,
      repeat,
      index;
  /*
   * Inject Table into DOM
   */
  var table = '<table id="editItemTable" class="table table-hover">' +
              '<thead><tr><th>#</th><th>Typ</th><th>Datum</th><th>Uhrzeit</th><th>Wiederholung</th></tr></thead>' +
              '<tbody id="editTableBody"></tbody></table> ';
  $('#formArea').append(table);

  /*
   * Iterate over Objects of an Event
   */
  for (var i = 0; i < data.objects.length; i++) {
    /*
     * Check if begin is an Array,
     * If True, Event could have multiple dates
     * If False, Event is unique
     */
    if(Array.isArray(data.objects[i].begin)){
      var length = data.objects[i].begin.length;
      for (var j = 0; j < length; j++) {
        date = data.objects[i].begin[j].slice(6, 8) + '.' + data.objects[i].begin[j].slice(4, 6) + '.' + data.objects[i].begin[j].slice(0, 4);
        begin = data.objects[i].begin[j].slice(9, 11) + ':' + data.objects[i].begin[j].slice(11, 13);
        end = data.objects[i].end[j].slice(9, 11) + ':' + data.objects[i].end[j].slice(11, 13);
        type = data.objects[i].type;
        repeat = data.objects[i].weekly;
        var row = '<tr><th scope="row">' + (i + 1) + '</th>' +
                  '<td>' + type + '</td>' +
                  '<td>' + date + '</td>' +
                  '<td>' + begin + ' - ' + end + '</td>' +
                  '<td>' + repeat + ' Wöchentlich</td></tr>';
        $('#editTableBody').append(row);
      }
    } else {
      date = data.objects[i].begin.slice(6, 8) + '.' + data.objects[i].begin.slice(4, 6) + '.' + data.objects[i].begin.slice(0, 4);
      begin = data.objects[i].begin.slice(9, 11) + ':' + data.objects[i].begin.slice(11, 13);
      end = data.objects[i].end.slice(9, 11) + ':' + data.objects[i].end.slice(11, 13);
      type = data.objects[i].type;
      var row = '<tr><th scope="row">' + (i + 1) + '</th>' +
                '<td>' + type + '</td>' +
                '<td>' + date + '</td>' +
                '<td>' + begin + ' - ' + end + '</td>' +
                '<td>Einmalig</td></tr>';
      $('#editTableBody').append(row);
    }

  };

  /*
   * Color the clicked Table Row
   * Fetch the # Number of the corresponding Row
   * Save it into {int} index
   */
  $('#editTableBody tr').on('click', function(){
    $('tr').each(function(){ // this might be bad, need to reconsider
      $(this).removeClass('success');
    });
    $(this).addClass('success');
    index = parseInt($(this).find('th').text()) - 1;
  });

  bootbox.dialog({
                title: data.origName,
                message: $('#editItemTable'),
                buttons: {
                    success: {
                        label: "Edit",
                        className: "btn-success",
                        callback: function () {
                          try {
                            if (data.objects[index] !== undefined) {
                              var begin = data.objects[index].begin;
                              console.log(data);

                              if(Array.isArray(begin)) {
                                  openEditDialogDetailMulti(id, index);
                                } else {
                                  openEditDialogDetail(id, index);
                                }
                            } else {
                              toastr.info("Es wurde kein Termin ausgewählt.");
                              return false;
                            }
                          } catch(e) {
                            toastr.error(e, 'Fehler');
                            return false;
                          }
                        }
                    }
                },
                keyboard: false
            }
        );
}

function openEditDialogDetailMulti(id, index) {
  var data = load(id);
  var i = index;

  var date = [],
      begin = [],
      end = [];

  $('body').css('overflow', 'hidden'); // hide body

  var length = data.objects[i].begin.length;
  for (var j = 0; j < length; j++) {
    date.push(data.objects[i].begin[j].slice(0, 4) + '-' + data.objects[i].begin[j].slice(4, 6) + '-' + data.objects[i].begin[j].slice(6, 8));
    begin.push(data.objects[i].begin[j].slice(9, 11) + ':' + data.objects[i].begin[j].slice(11, 13));
    end.push(data.objects[i].end[j].slice(9, 11) + ':' + data.objects[i].end[j].slice(11, 13));
  }
  
  // assign the values of the object
  $('#editMultiId').val( id );
  $('#multiName').val( data.objects[i].name );
  $('#multiLocation').val( data.objects[i].location );
  $('#multiComment').val( data.objects[i].comment );

  var origForm = $('#editFormMulti'); // Copy of the Form before Edit
  var clonedForm = null; // Holds the edited Form

  for (var j = 0; j < length; j++) {
    var addedInputs = '<div class="panel panel-default">' +
                      '<div class="panel-heading">Zeitraum '+ (j + 1) +'</div>' +
                      '<div class="panel-body">' +
                      '<div class="form-group">' +
                      '<label for="date'+ j +'">Startdatum f&uuml;r Zeitraum '+ (j + 1) +'</label>' +
                      '<input id="multiDate'+ j +'" name="date'+ j +'" type="date" class="form-control input-md">' +
                      '</div>' +
                      '<div class="form-group">' +
                      '<label for="begin'+ j +'">Beginn</label>' +
                      '<input id="multiBeginTime'+ j +'" name="begin'+ j +'" type="time" class="form-control input-md">' +
                      '</div>' +
                      '<div class="form-group">' +
                      '<label for="end'+ j +'">Ende</label>' +
                      '<input id="multiEndTime'+ j +'" name="end'+ j +'" type="time" class="form-control input-md">' +
                      '</div>' +
                      '</div>' + 
                      '</div>';

    $('.form-group #multiRepeat').parent().before(addedInputs);

    $('#multiDate' + j).val( date[j] );
    $('#multiBeginTime' + j).val( begin[j] );
    $('#multiEndTime' + j).val( end[j] );
  }
  $('#multiRepeat').val( data.objects[i].weekly );
  

  bootbox.dialog({
                title: data.origName,
                message: $('#editFormMulti'),
                backdrop: true,
                closeButton: false,
                buttons: {
                    success: {
                        label: "Save",
                        className: "btn-success",
                        callback: function () {
                          var i = index;

                          try {
                            var id = $('#editMultiId')[0].value;
                            var data = load(id);
                          } catch (e) {
                            $('#formArea div:nth-child(2)').prepend(origForm);
                            toastr.error(e, 'Fehler');
                          }
                          
                          try {
                            data.objects[i].name = isEmpty($('#multiName').val());
                            data.objects[i].location = isEmpty($('#multiLocation').val());
                            data.objects[i].comment = isEmpty($('#multiComment').val());
                            data.objects[i].weekly = isEmpty($('#multiRepeat').val());
                            
                            var date = [],
                                beginTime = [],
                                endTime = [];

                            for (var j = 0; j < length; j++) {
                              date.push(isEmpty($('#multiDate' + j)[0].value));
                              date[j] = date[j].split("-").join('');

                              beginTime.push(isEmpty($('#multiBeginTime' + j)[0].value));
                              beginTime[j] = beginTime[j].slice(0, 2) + beginTime[j].slice(3, 5) + '00';

                              endTime.push(isEmpty($('#multiEndTime' + j)[0].value));
                              endTime[j] = endTime[j].slice(0, 2) + endTime[j].slice(3, 5) + '00';

                              data.objects[i].begin[j] = date[j] + 'T' + beginTime[j];
                              data.objects[i].end[j] = date[j] + 'T' + endTime[j];
                            }
                            
                            clonedForm = $('#editFormMulti');
                          } catch(e) {
                            console.error(e.name+": "+e.message);
                            toastr.error(e, 'Fehler');
                            return false;   // Prevent the Modal from closing
                          }
                          
                          try {
                              for (var j = 0; j < length; j++) {
                                $('.panel-default').empty();
                                $('.panel-default').remove();
                              }
                              $('#formArea div:nth-child(2)').prepend(clonedForm);
                              
                              if (JSON.stringify(load(id)).localeCompare(JSON.stringify(data)) != 0) {
                                data.changed = true;
                              }
                              
                              save(id, data);
                          } catch(e) {
                            for (var j = 0; j < length; j++) {
                                $('.panel-default').empty();
                                $('.panel-default').remove();
                              }
                            $('#formArea div:nth-child(2)').prepend(origForm);
                            toastr.error(e, 'Fehler');
                          }

                          updateSelectionBox();
                          $('body').css('overflow', 'auto');
                        }
                    },
                    cancel: {
                      label: "Cancel",
                      className: "btn-danger",
                      callback: function(){
                        try {
                          for (var j = 0; j < length; j++) {
                                $('.panel-default').empty();
                                $('.panel-default').remove();
                              }
                          $('body').css('overflow', 'auto');
                          $('#formArea div:nth-child(2)').prepend(origForm);
                        } catch(e) {
                          console.log(e);
                        }
                      }
                    }
                },
                keyboard: false
            }
        );
}

function openEditDialogDetail(id, index) {
  var data = load(id);
  var i = index;
  
  $('body').css('overflow', 'hidden');

  var date = data.objects[i].begin.slice(0, 4) + '-' + data.objects[i].begin.slice(4, 6) + '-' + data.objects[i].begin.slice(6, 8);
  var begin = data.objects[i].begin.slice(9, 11) + ':' + data.objects[i].begin.slice(11, 13);
  var end = data.objects[i].end.slice(9, 11) + ':' + data.objects[i].end.slice(11, 13);
  
  // assign the values of the object
  $('#editId').val( id );
  $('#editName').val( data.name );
  $('#editLocation').val( data.objects[i].location );
  $('#editComment').val( data.objects[i].comment );
  $('#editDate').val( date );
  $('#editBeginTime').val( begin );
  $('#editEndTime').val( end );
  $('#editRepeat').val( data.objects[i].weekly );

  var clonedForm = null; // Holds the edited Form
  var origForm = $('#editForm'); // Copy of the Form before Edit

  bootbox.dialog({
                title: data.origName,
                message: $('#editForm'),
                backdrop: true,
                closeButton: false,
                buttons: {
                    success: {
                        label: "Save",
                        className: "btn-success",
                        callback: function () {
                          try {
                            var id = $('#editId')[0].value;
                            var data = load(id);
                          } catch (e) {
                            $('#formArea div:nth-child(1)').prepend(origForm);
                            toastr.error(e, 'Fehler');
                          }
                          
                          try {
                            data.name = isEmpty($('#editName')[0].value);
                            data.objects[i].location = isEmpty($('#editLocation')[0].value);
                            data.objects[i].comment = isEmpty($('#editComment')[0].value);
                            
                            var date = isEmpty($('#editDate')[0].value);
                            date = date.split("-").join('');
                            
                            var beginTime = isEmpty($('#editBeginTime')[0].value);
                            var endTime = isEmpty($('#editEndTime')[0].value);
                            
                            beginTime = beginTime.slice(0, 2) + beginTime.slice(3, 5) + '00';
                            endTime = endTime.slice(0, 2) + endTime.slice(3, 5) + '00';
                            
                            data.objects[i].begin = date + 'T' + beginTime;
                            data.objects[i].end = date + 'T' + endTime;

                            clonedForm = $('#editForm');
                          } catch(e) {
                            console.error(e.name+": "+e.message);
                            toastr.error(e, 'Fehler');
                            return false;   // Prevent the Modal from closing
                          }
                          
                          try {
                              $('#formArea div:nth-child(1)').prepend(clonedForm);
                              if (JSON.stringify(load(id)).localeCompare(JSON.stringify(data) != 0)) {
                                data.changed = true;
                              }
                              save(id, data);
                          } catch(e) {
                            $('#formArea div:nth-child(1)').prepend(origForm);
                            toastr.error(e, 'Fehler');
                          }
                          $('body').css('overflow', 'auto');
                          updateSelectionBox();
                          
                        }
                    },
                    cancel: {
                      label: "Cancel",
                      className: "btn-danger",
                      callback: function(){
                        try {
                          $('body').css('overflow', 'auto');
                          $('#formArea div:nth-child(1)').prepend(origForm);
                        } catch(e) {
                          console.log(e);
                        }
                      }
                    }
                },
                keyboard: false
            }
        );
}

function injectDiv() {
  var page = $('#page')[0];

  var div = $('<div id="emptyBox"><br><br></div>');
  div.insertBefore(document.body.childNodes[0]);

  var open = $('<div id="openSelectionBox"><span class="cart-icon glyphicon glyphicon-shopping-cart" aria-hidden="true"></span> &Ouml;ffnen</div>');
  var settings = $('<div id="settings-button"><span class="cart-icon glyphicon glyphicon-cog"></span> <span>Einstellungen</span></div>')
  var logo = $('<div id="pluginLogo">VLV.ical <span class="padded-divider">|</span> </div>');
  $('#emptyBox').prepend(open);
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
    bootbox.confirm("Willst du den Warenkorb entleeren?", function(result) {
      if (result) {
        save('selection', []);
        clearDataWithPrefix('nr');
        updateSelection();
      }
    });
  });
  
  /*
   * Hover Effect for Trash Symbol
   */
  $(deleteCart).on('mouseenter', function () {
    $(this).find('span').fadeOut(500, function() { $(this).remove(); });
    $(this).append('<p>Clear</p>');
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

function openBox() {

  var open = $('#openSelectionBox')[0];
  $(open).hide("slide");
  
  var box = $('#selectionBox')[0];
  $(box).show("slide");

}

function closeBox() {
  var open = $('#openSelectionBox')[0];
  $(open).show("slide");
  
  var box = $('#selectionBox')[0];
  $(box).hide("slide");
}

function clearSelectionBox() {
  var selection = load('selection');
  selection = [];
  saveObjects('selection', selection);
  updateSelection();
}

function openSettingsDialog() {
    var settings = load('settings');
    bootbox.dialog({
                title: "Einstellungen",
                message: getSettingsForm(),
                backdrop: true,
                closeButton: false,
                buttons: {
                    success: {
                        label: "Save",
                        className: "btn-success",
                        callback: function () {
                          try {
                            clonedForm = $('#editForm');
                            settings.highlightUpdatesPeriod = parseInt($('#setUpdatePeriod')[0].value);
                            settings.addTypeToName = $("#addTypeToName").is(":checked");
                            settings.separateByType = $("#separateByType").is(":checked");

                            save('settings', settings);
                            $('#formArea div:nth-child(1)').prepend(clonedForm);
                          } catch(e) {

                            console.log("Saving settings failed!");
                            console.log(e);
                          }
                        }
                    },
                    cancel: {
                      label: "Cancel",
                      className: "btn-danger",
                      callback: function(){
                        try {

                        } catch(e) {
                          console.log(e);
                        }
                      }
                    }
                },
                keyboard: false
            }
        );
}

function getSettingsForm() {
  var settings = load('settings');
  var form = '<form id="settingsForm" role="form"><div class="form-group">' +
                    '<label for="setUpdatePeriod">Größe des Zeitraums, in dem aktualisierte Veranstaltungen hervorgehoben werden (in Tagen)</label>' +
                    '<input id="setUpdatePeriod" type="number" class="form-control input-md" value=' + settings.highlightUpdatesPeriod + ' required>' +
                    '<label for="addTypeToName">Soll an den Veranstaltungsnamen der Typ angehangen werden? (Vorlesung, Übung, Seminar, etc.)</label>' +
                    '<input id="addTypeToName" type="checkbox" class="form-control input-md">' +
                    '<label for="separateByType">Sollen die Veranstaltungsarten separat heruntergeladen werden?</label>' +
                    '<input id="separateByType" type="checkbox" class="form-control input-md">' +
              '</div></form>';
  $(document.body).prepend(form);
  $('#addTypeToName').prop('checked', settings.addTypeToName);
  $('#separateByType').prop('checked', settings.separateByType);
  return $('#settingsForm');
}