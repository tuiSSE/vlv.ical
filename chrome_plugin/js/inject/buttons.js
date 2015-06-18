/*
 * injects download buttons into the webpage
 */
function injectDownloadButtons() {
  
  // adds a download button that only downloads an array of selected objects
  var downloadSelected = document.createElement('input');
  downloadSelected.type = 'button';
  downloadSelected.id = 'downloadSelected';
  downloadSelected.className = 'downloadButton primary-btn';
  downloadSelected.value = 'Download';

  var box = $('#downloadArea')[0];
  box.appendChild(downloadSelected);

  $("#downloadSelected").on('click', function(entryInfo){
    bootbox.dialog({
                title: 'Download',
                message:
                    '<form> ' +
                    '<div class="col-md-6"> ' +
                    'Dateiname: <input id="editFileName" name="name" type="text" placeholder="calendar" class="form-control input-md"> ' +
                    '</div> ' +
                    '</form>',
                buttons: {
                    success: {
                        label: "Save",
                        className: "btn-success",
                        callback: function () {
                          var filename = $('#editFileName')[0].value;
                          if (filename == null || filename == "") {
                            filename = "calendar";
                          }
                          downloadSelection(filename);
                        }
                    }
                },
                keyboard: false
            }
        );
  });
}

function injectSelectAllButton() {
  var selectAll = document.createElement('input');
  selectAll.type = 'button';
  selectAll.id = 'selectAll';
  selectAll.className = 'downloadButton default-btn';
  selectAll.value = 'Select All / Unselect All';

  var box = $('#downloadArea')[0];
  box.appendChild(selectAll);
  
  $("#selectAll").on('click', function(entryInfo){
    var bool = load('selection').length < subjects.length;
    for (var i = 0; i < subjects.length; i++) {
      var object = subjects[i];
      if (bool) {
        if(!containsObject(getIdOfLecture(object), load('selection'))) {
          addToCart(object);
        }
      } else {
        if(containsObject(getIdOfLecture(object), load('selection'))) {
          deleteFromCart(object);
          updateSelection();
        }
      }
    }
  });
}

/*
 * injects buttons to add subjects to an array, like a shopping cart
 */
function injectAddButtons(subjects) {
  for (var i = 0; i < subjects.length; i++){
    var object = subjects[i];
    var name = subjects[i].childNodes[1].childNodes[0].data;
    subjects[i].childNodes[1].childNodes[0].data = null;
    var r = $('<button class="addButton">' + name + '</button> <a>&nbsp</a>');
    r.insertBefore(subjects[i].childNodes[1].childNodes[0]);
  }
  
  $(".addButton").on('click', function(){
    $(this).toggleClass('active');
    var object = this.parentNode.parentNode;
    var selection = load('selection');
    if(!containsObject(getIdOfLecture(object), selection)) {
      addToCart(object);
    } else {
      removeFromCart(object);
    }
  });
}
 
 //
 
function addNewButton() {
  var objects = document.getElementsByClassName("stupla_fs09");

  var zeile = objects[8].parentNode;
  console.log(zeile);

  for (i = 0; i < 2; i++) {
    var button = $('<button class="downloadButton">Download</button>');
    button.insertBefore(objects[i+7].parentNode.childNodes[14]);    
  }
}
