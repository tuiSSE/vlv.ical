/*
 * injects download buttons into the webpage
 */
function injectDownloadButtons(subjects) {
  
  // adds a download button that only downloads an array of selected objects
  var downloadSelected = $('<input type="button" id="downloadSelected" class="downloadButton" value="Download selected"/><a>&nbsp</a>');
  downloadSelected.insertBefore(subjects[0]);
  var selection = loadObjects('selection');
  console.log(selection);
  $("#downloadSelected").on('click', function(entryInfo){
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
  var downloadAll= $('<input type="button" id="downloadAll" class="downloadButton" value="Download all"/><p>&nbsp</p>');
  downloadAll.insertBefore(subjects[0]);
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
  var i;
  for (i = 0; i < subjects.length; i++){
    var object = subjects[i];
    object.style.border = '2px solid grey';
    object.style.borderRadius = '4px';
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
 
function addNewButton() {
  var objects = document.getElementsByClassName("stupla_fs09");

  for (i in objects) {
    console.log(objects[i]);
  }

  for (i = 0; i < 2; i++) {
    var button = $('<button class="downloadButton">Download</button>');
    button.insertBefore(objects[i+7].childNodes[0]);
  }
}
