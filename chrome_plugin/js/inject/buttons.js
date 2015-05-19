/*
 * injects download buttons into the webpage
 */
function injectDownloadButtons(subjects) {
  
  // adds a download button that only downloads an array of selected objects
  var downloadSelected = document.createElement('input');
  downloadSelected.type = 'button';
  downloadSelected.id = 'downloadSelected';
  downloadSelected.className = 'downloadButton';
  downloadSelected.value = 'Download Selected';

  var box = $('#controlBox')[0];
  box.appendChild(downloadSelected);

  $("#downloadSelected").on('click', function(entryInfo){
    var selection = loadObjects('selection');
    if (selection.length > 0) {
      try {
        download(selection);
      } catch(e) {
        toastr.error("Download failed!", e);
      }
    } else {
      toastr.warning("Keine Veranstaltungen ausgewählt.")
    };
  });

  // adds a download button that downloads an array of all objects the plugin could find on the page
  var br = document.createElement('br');
  box.appendChild(br);
  
  var downloadAll = document.createElement('input');
  downloadAll.type = 'button';
  downloadAll.id = 'downloadAll';
  downloadAll.className = 'downloadButton';
  downloadAll.value = 'Download All';

  var box = $('#controlBox')[0];
  box.appendChild(downloadAll);
  
  $("#downloadAll").on('click', function(entryInfo){
    if (subjects.length > 0) {
      try {
        download(subjects);
      } catch(e) {
        toastr.error("Download failed!", e);
      }
    } else {
      toastr.warning("Keine Veranstaltungen gefunden.")
    };
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
    var r = $('<button class="addButton">' + '<img class="shoppingCart" src="' + chrome.extension.getURL('/resources/add.svg') + '"/>' +" " + name + '</button> <a>&nbsp</a>');
    r.insertBefore(subjects[i].childNodes[1].childNodes[0]);
  }
  
  $(".addButton").on('click', function(){
    var object = this.parentNode.parentNode;
    var selection = loadObjects('selection');
    if(!containsObject(object, selection)) {
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
    
 var br = document.createElement('br');
  box.appendChild(br);
  
  var downloadAll = document.createElement('input');
  downloadAll.type = 'button';
  downloadAll.id = 'downloadAll';
  downloadAll.className = 'downloadButton';
  downloadAll.value = 'Download All';

  var box = $('#controlBox')[0];
  box.appendChild(downloadAll);
  
  $("#downloadAll").on('click', function(entryInfo){
    if (subjects.length > 0) {
      try {
        download(subjects);
      } catch(e) {
        toastr.error("Download failed!", e);
      }
    } else {
      toastr.warning("Keine Veranstaltungen gefunden.")
    };
  });
}
    
  }
}
