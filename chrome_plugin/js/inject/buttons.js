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

  var box = $('#downloadArea');
  box.prepend(downloadSelected);

  $("#downloadSelected").on('click', function(entryInfo){
    var filename = "vlv_ical_export_" + getDatetoString();
    downloadSelection(filename);
  });
}

function injectSelectAllButton() {
  var selectAll = $('<button id="selectAll" class="selectAll">Select All</input>');
  selectAll.insertBefore(getRootElement().getElementsByTagName('div')[0]);
  $('<p>&nbsp;</p>').insertBefore(subjects[0]);
  
  $("#selectAll").on('click', function(entryInfo){
    var bool = load('selection').length < subjects.length;
    for (var i = 0; i < subjects.length; i++) {
      var object = subjects[i];
      if (bool) {
        if(!containsObject(getIdOfLecture(object), load('selection'))) {
          addToCart(object);
        }
      }
    }
    if (bool) {
      openBox();
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
    var r = $('<button class="addButton"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span> ' + name + '</button>');
    r.insertBefore(subjects[i].childNodes[1].childNodes[0]);

    try {
      var oldElement = object.childNodes[1].childNodes[2];
      if (oldElement != undefined) {
        var newElement = $('<button class="moreInfoButton" onclick="window.open(\'' + oldElement.href + '\', \'_blank\')">weitere Informationen</button>');
        newElement.insertBefore(oldElement);
        $(object.childNodes[1].childNodes[3]).remove();
      }
    } catch(e) {
      console.log("Inject Buttons could not be injected.")
      console.log(e);
    };
  }
  
  $(".addButton").on('click', function(){
    $(this).toggleClass('active');
    var object = this.parentNode.parentNode;
    var selection = load('selection');
    if(!containsObject(getIdOfLecture(object), selection)) {
      addToCart(object);
      openBox();
    } else {
      removeFromCart(object);
    }
  });
}
