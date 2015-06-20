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
                            $('#formArea').prepend(origForm);
                            toastr.error(e, 'Error');
                          }
                          
                          try {
                            data.name = isEmpty($('#editName')[0].value);
                            data.location = isEmpty($('#editLocation')[0].value);
                            data.comment = isEmpty($('#editComment')[0].value);
                            
                            var date = isEmpty($('#editDate')[0].value);
                            date = date.split("-").join('');
                            
                            var beginTime = isEmpty($('#editBeginTime')[0].value);
                            var endTime = isEmpty($('#editEndTime')[0].value);
                            
                            beginTime = beginTime.slice(0, 2) + beginTime.slice(3, 5) + '00';
                            endTime = endTime.slice(0, 2) + endTime.slice(3, 5) + '00';
                            
                            data.begin = date + 'T' + beginTime;
                            data.end = date + 'T' + endTime;

                            var weekly = $('#editRepeat')[0].value;
                            data.objects[i].weekly = weekly;

                            clonedForm = $('#editForm');
                          } catch(e) {
                            console.error(e.name+": "+e.message);
                            toastr.error(e, 'Error');
                            return false;   // Prevent the Modal from closing
                          }
                          
                          try {
                              $('#formArea').prepend(clonedForm);
                              save(id, data);
                          } catch(e) {
                            $('#formArea').prepend(origForm);
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
  var page = $('#page')[0];

  var div = $('<div id="emptyBox"><br><br></div>');
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

  var deleteCart = $('<div id="deleteCart">Empty Cart</div>');
  deleteCart.insertBefore($('#selectionBox')[0].childNodes[0]);

  deleteCart = $('#deleteCart')[0];
  deleteCart.onclick = function () {
    bootbox.confirm("Do you want to empty your cart?", function(result) {
      if (result) {
        save('selection', []);
        updateSelection();
      }
    });
  }
  
  var boxHeader = $('<div id="boxHeader"><p>VLVical</p></div>');
  boxHeader.insertBefore($('#selectionBox')[0].childNodes[0]);
  
  var backButton = $('<div id="backButton">click here to hide</div>');
  backButton.insertBefore($('#selectionBox')[0].childNodes[0]);

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

  var boxWidth = $('#openSelectionBox').css('width');
  var pageWidth = $('#page').css('width');
  boxWidth = 2.5 * parseInt(boxWidth.slice(0, boxWidth.length-2));
  pageWidth = parseInt(pageWidth.slice(0, pageWidth.length-2));
  if (pageWidth > (995 + boxWidth)) {
    $('#page')[0].style.width = (pageWidth - boxWidth) + "px";
  }
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