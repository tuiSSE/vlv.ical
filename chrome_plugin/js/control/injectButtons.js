function injectDownloadButtons(subjects) {
  var downloadSelected= $('<input type="button" id="downloadSelected" class="downloadButton" value="Download selected"/>');
  downloadSelected.insertBefore(subjects[0]);
  $("#downloadSelected").on('click', function(entryInfo){
    if (selectedEvents.length > 0) {
      try {
        download(subjects);
      } catch(e) {
        toastr.error("Download failed!", e);
      }
    } else {
      toastr.warning("Keine Veranstaltungen ausgewählt.")
    };
  });

  var downloadAll= $('<input type="button" id="downloadAll" class="downloadButton" value="Download all"/>');
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

function injectAddButtons(subjects) {
  var i;
  for (i = 0; i < subjects.length; i++){
    var r= $('<input type="button" class="eventToggle" value="+"/> ');
    r.insertBefore(subjects[i].childNodes[1].childNodes[0]);
  }
  $(".eventToggle").on('click', function(entryInfo){
    var object = this.parentNode.parentNode;
    if (!containsObject(object, selectedEvents)) {
      selectedEvents.push(object);
      this.value = '-';
      this.style.color = 'red'
      object.style.background = '#BEE8BA';
    } else {
      selectedEvents = removeFromList(selectedEvents, getObjectIndex(object, selectedEvents, object));
      this.value = '+';
      this.style.color = '#07d41f';
      object.style.background = 'white';
    }
  });
}
