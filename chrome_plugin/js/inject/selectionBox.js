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
      $(element).on('click', function() {
          openEditDialog(this.id);
      })
      element.insertBefore($('#itemBox')[0].childNodes[i]);
    }
  } catch(e) {
    console.log("Could not update selection.");
    console.log(e);
  }
}

function openEditDialog(id) {
  var data = load(id);
  bootbox.dialog({
                title: id,
                message:
                    '<label>Diese Daten werden in deinen Kalender übernommen</label>' +
                    '<form> ' +
                    '<input type="hidden" id="editId" value="' + id + '">' +
                    '<div class="col-md-6"> ' +
                    'Name: <input id="editName" name="name" type="text" value="' + data.name + '" class="form-control input-md"> ' +
                    '</div> ' +
                    '<div class="col-md-6"> ' +
                    'Ort: <input id="editLocation" name="location" type="text" value="' + data.location + '" class="form-control input-md"> ' +
                    '</div>' +
                    '<div class="col-md-6"> ' +
                    'Kommentar: <input id="editComment" name="comment" type="text" value="' + data.comment + '" class="form-control input-md"> ' +
                    '</div>' +
                    '<div class="col-md-6"> ' +
                    'Beginn: <input id="editBegin" name="begin" type="text" value="' + data.begin + '" class="form-control input-md"> ' +
                    '</div>' +
                    '<div class="col-md-6"> ' +
                    'Ende: <input id="editEnd" name="end" type="text" value="' + data.end + '" class="form-control input-md"> ' +
                    '</div>' +
                    '</form>',
                buttons: {
                    success: {
                        label: "Save",
                        className: "btn-success",
                        callback: function () {
                          try {
                            var id = $('#editId')[0].value;
                            var data = load(id);
                          } catch (e) {
                            toastr.error(e, 'Error');
                          }
                          
                          try {
                            data.name = $('#editName')[0].value;
                            data.location = $('#editLocation')[0].value;
                            data.comment = $('#editComment')[0].value;
                            data.begin = $('#editBegin')[0].value;
                            data.end = $('#editEnd')[0].value;
                          } catch(e) {
                            toastr.error(e, 'Error');
                          }
                          
                          try {
                            save(id, data);
                          } catch(e) {
                            toastr.error(e, 'Error');
                          }
                          
                          updateSelectionBox();
                          
                        }
                    }
                },
                keyboard: false
            }
        );
}

function injectDiv() {
  var div = $('<div id="emptyBox"><br><br><br><br></div>');
  div.insertBefore(document.body.childNodes[0]);

  var open = $('<div id="openSelectionBox">VLV.ical</div>')
  open.insertBefore(document.body.childNodes[0]);

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
  
  var boxHeader = $('<div id="boxHeader"><p>MY SELECTION:</p></div>');
  boxHeader.insertBefore($('#selectionBox')[0].childNodes[0]);
  
  var backButton = $('<div id="backButton">click here to hide</div>');
  backButton.insertBefore($('#selectionBox')[0].childNodes[0]);

  backButton = $('#backButton')[0];
  backButton.onclick = function () {
    closeBox(this.parentNode);
  };

  injectDownloadButtons();
  injectSelectAllButton();
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