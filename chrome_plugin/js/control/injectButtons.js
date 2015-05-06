function injectDownloadButtons(subjects) {
  var downloadSelected= $('<input type="button" id="downloadSelected" class="downloadButton" value="Download selected"/><a>&nbsp</a>');
  downloadSelected.insertBefore(subjects[0]);
  $("#downloadSelected").on('click', function(entryInfo){
    if (selectedEvents.length > 0) {
      try {
        download(selectedEvents);
        console.log("__________________");
        console.log(" ");
        console.log(" ");
      } catch(e) {
        toastr.error("Download failed!", e);
      }
    } else {
      toastr.warning("Keine Veranstaltungen ausgewählt.")
    };
  });

  var downloadAll= $('<input type="button" id="downloadAll" class="downloadButton" value="Download all"/><p>&nbsp</p>');
  downloadAll.insertBefore(subjects[0]);
  $("#downloadAll").on('click', function(entryInfo){
    if (subjects.length > 0) {
      try {
        download(subjects);
        console.log("__________________");
        console.log(" ");
        console.log(" ");
      } catch(e) {
        toastr.error("Download failed!", e);
      }
    } else {
      toastr.warning("Keine Veranstaltungen gefunden.")
    };
  });
}

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
