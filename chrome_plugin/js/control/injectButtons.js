/*
 * injects download buttons into the webpage
 */
function injectDownloadButtons(subjects) {
  
  // adds a download button that only downloads an array of selected objects
  var downloadSelected = $('<input type="button" id="downloadSelected" class="downloadButton" value="Download selected"/><a>&nbsp</a>');
  downloadSelected.insertBefore(subjects[0]);
  $("#downloadSelected").on('click', function(entryInfo){
    if (selectedEvents.length > 0) {
      try {
        download(selectedEvents);
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
  $(".addButton").on('click', function(entryInfo){
    var object = this.parentNode.parentNode;
    if (!containsObject(object, selectedEvents)) {
      selectedEvents.push(object);
      object.style.background = '#BEE8BA';
      this.style.background = 'red';
    } else {
      selectedEvents = removeFromList(selectedEvents, getObjectIndex(object, selectedEvents, object));
      object.style.background = 'white';
      this.style.background = '#44c767';
    }
  });
}

function addNewButon(subjects) {
var einfügenbutton = document.createElement("button");
einfügenbutton.href = "http://wcms3.rz.tu-ilmenau.de/~goettlich/elvvi/*";

// button an ein Objekt hängen
var vorhandenesObjekt = document.getElementsByClassName("stupla_09");

vorhandenesObjekt.insertBefore(einfügenbutton);

}
