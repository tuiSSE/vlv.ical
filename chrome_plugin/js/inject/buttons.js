/*
 * injects download buttons into the webpage
 */
function injectDownloadButtons() {
  
  // adds a download button that only downloads an array of selected objects
  var downloadSelected = document.createElement('input');
  downloadSelected.type = 'button';
  downloadSelected.id = 'downloadSelected';
  downloadSelected.className = 'downloadButton primary-btn';
  downloadSelected.value = 'Download Selected';

  var box = $('#downloadArea')[0];
  box.appendChild(downloadSelected);

  $("#downloadSelected").on('click', function(entryInfo){
    downloadSelection();
  });
}

function injectSelectAllButton() {
  var selectAll = document.createElement('input');
  selectAll.type = 'button';
  selectAll.id = 'selectAll';
  selectAll.className = 'downloadButton default-btn';
  selectAll.value = 'Select All';

  var box = $('#downloadArea')[0];
  box.appendChild(selectAll);
  
  $("#selectAll").on('click', function(entryInfo){
    var bool = load('selection').length < subjects.length;
    for (var i = 0; i < subjects.length; i++) {
      var object = subjects[i];
      if (bool) {
        if(!containsObject(getNameOfLecture(object), load('selection'))) {
          addToCart(object);
        }
      } else {
        if(containsObject(getNameOfLecture(object), load('selection'))) {
          deleteFromCart(object);
          updateSelection();
        }
      }
    }
    if (bool) {
      $('#selectAll')[0].value = 'Deselect All';
    } else {
      $('#selectAll')[0].value = 'Select All';
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
    if(!containsObject(getNameOfLecture(object), selection)) {
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
