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
      $(element).wrap('<li></li>');
      (element).after(removeButton);

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
                          var data = load(id);
                          var begin = data.objects[index].begin;

                          if(Array.isArray(begin)) {
                            openEditDialogDetailMulti(id, index);
                          } else {
                            openEditDialogDetail(id, index);
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

  var length = data.objects[i].begin.length;
  for (var j = 0; j < length; j++) {
    date.push(data.objects[i].begin[j].slice(0, 4) + '-' + data.objects[i].begin[j].slice(4, 6) + '-' + data.objects[i].begin[j].slice(6, 8));
    begin.push(data.objects[i].begin[j].slice(9, 11) + ':' + data.objects[i].begin[j].slice(11, 13));
    end.push(data.objects[i].end[j].slice(9, 11) + ':' + data.objects[i].end[j].slice(11, 13));
  }
  
  // assign the values of the object
  $('#editMultiId').val( id );
  $('#multiName').val( data.name );
  $('#multiLocation').val( data.objects[i].location );
  $('#multiComment').val( data.objects[i].comment );

  var origForm = $('#editFormMulti'); // Copy of the Form before Edit
  var clonedForm = null; // Holds the edited Form

  for (var j = 0; j < length; j++) {
    var addedInputs = '<div class="form-group">' +
                      '<label for="date'+ j +'">Datum</label>' +
                      '<input id="multiDate'+ j +'" name="date'+ j +'" type="date" class="form-control input-md">' +
                      '</div>' +
                      '<div class="form-group">' +
                      '<label for="begin'+ j +'">Beginn</label>' +
                      '<input id="multiBeginTime'+ j +'" name="begin'+ j +'" type="time" class="form-control input-md">' +
                      '</div>' +
                      '<div class="form-group">' +
                      '<label for="end'+ j +'">Ende</label>' +
                      '<input id="multiEndTime'+ j +'" name="end'+ j +'" type="time" class="form-control input-md">' +
                      '</div>';

    $('.form-group #multiComment').parent().after(addedInputs);

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
                            toastr.error(e, 'Error');
                          }
                          
                          try {
                            data.name = isEmpty($('#multiName')[0].value);
                            data.location = isEmpty($('#multiLocation')[0].value);
                            data.comment = isEmpty($('#multiComment')[0].value);
                            
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
                            toastr.error(e, 'Error');
                            return false;   // Prevent the Modal from closing
                          }
                          
                          try {
                              for (var j = 0; j < length; j++) {
                                $('[for="date'+ j +'"]').parent().remove();
                                $('[name="date'+ j +'"]').remove();
                                $('[for="date'+ j +'"]').remove();

                                $('[for="begin'+ j +'"]').parent().remove();
                                $('[name="begin'+ j +'"]').remove();
                                $('[for="begin'+ j +'"]').remove();

                                $('[for="end'+ j +'"]').parent().remove();
                                $('[name="end'+ j +'"]').remove();
                                $('[for="end'+ j +'"]').remove();
                              }
                              $('#formArea div:nth-child(2)').prepend(clonedForm);
                              save(id, data);
                          } catch(e) {
                            for (var j = 0; j < length; j++) {
                                $('[for="date'+ j +'"]').parent().remove();
                                $('[name="date'+ j +'"]').remove();
                                $('[for="date'+ j +'"]').remove();

                                $('[for="begin'+ j +'"]').parent().remove();
                                $('[name="begin'+ j +'"]').remove();
                                $('[for="begin'+ j +'"]').remove();

                                $('[for="end'+ j +'"]').parent().remove();
                                $('[name="end'+ j +'"]').remove();
                                $('[for="end'+ j +'"]').remove();
                              }
                            $('#formArea div:nth-child(2)').prepend(origForm);
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
                          for (var j = 0; j < length; j++) {
                                $('[for="date'+ j +'"]').parent().remove();
                                $('[name="date'+ j +'"]').remove();
                                $('[for="date'+ j +'"]').remove();

                                $('[for="begin'+ j +'"]').parent().remove();
                                $('[name="begin'+ j +'"]').remove();
                                $('[for="begin'+ j +'"]').remove();

                                $('[for="end'+ j +'"]').parent().remove();
                                $('[name="end'+ j +'"]').remove();
                                $('[for="end'+ j +'"]').remove();
                              }
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
                              $('#formArea div:nth-child(1)').prepend(clonedForm);
                              save(id, data);
                          } catch(e) {
                            $('#formArea div:nth-child(1)').prepend(origForm);
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