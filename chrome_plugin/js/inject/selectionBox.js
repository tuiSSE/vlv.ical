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
                title: data.origName,
                message:
                    '<form class="form-horizontal"> ' +
                    '<input type="hidden" id="editSelectId" value="' + id + '">' +
                    'Index <input id="editSelectIndex" name="index" type="number" min="0" max="' + (data.objects.length - 1) + '" value="' + 0 + '" class="form-control input-md"> ' +
                    '</form>',
                buttons: {
                    success: {
                        label: "Save",
                        className: "btn-success",
                        callback: function () {
                          var id = $('#editSelectId')[0].value;
                          var index = $('#editSelectIndex')[0].value;

                          openEditDialogDetail(id, index);
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
  $('#editRepeat').val( 'not yet implemented' );
  var clonedForm = null;
  var origForm = $('#editForm');

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
                            toastr.error(e, 'Error');
                          }
                          
                          try {
                            data.name = $('#editName')[0].value;
                            data.location = $('#editLocation')[0].value;
                            data.comment = $('#editComment')[0].value;
                            
                            var date = $('#editDate')[0].value;
                            date = date.split("-").join('');
                            
                            var beginTime = $('#editBeginTime')[0].value;
                            var endTime = $('#editEndTime')[0].value;
                            
                            beginTime = beginTime.slice(0, 2) + beginTime.slice(3, 5) + '00';
                            endTime = endTime.slice(0, 2) + endTime.slice(3, 5) + '00';
                            
                            data.begin = date + 'T' + beginTime;
                            data.end = date + 'T' + endTime;
                            clonedForm = $('#editForm');
                          } catch(e) {
                            toastr.error(e, 'Error');
                          }
                          
                          try {
                              $('#formArea').prepend(clonedForm);
                              save(id, data);
                          } catch(e) {
                            toastr.error(e, 'Error');
                          }

                          updateSelectionBox();
                          
                        }
                    },
                    cancel: {
                      label: "Cancel",
                      className: "btn-danger",
                      callback: function(){
                        try {
                          $('#formArea').prepend(origForm);
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