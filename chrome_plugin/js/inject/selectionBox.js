function updateSelectionBox() {
  var itemBox = $('#itemBox')[0];
  itemBox.innerHTML = '<br>';

  try {
    var items = load('selection');
    for (var i = 0; i < items.length; i++) {
      var item = load(items[i]);
      var element = $('<div class="selectionBoxItem">' + 
                        item.name + 
                        '<br><hr><div class="itemDetail">' + 
                        'location: ' + item.location + '<br>' + 
                        'comment: ' + item.comment + '<br>' +
                        'begin: ' + item.begin + '<br>' + 
                        'end: ' + item.end + '<br>' +
                        '<br></div></div>')
      element.insertBefore($('#itemBox')[0].childNodes[i]);
    }
  } catch(e) {
    console.log("Could not update selection.");
    console.log(e);
  }
}

function injectEditDialogs() {
  $('.addButton').on('click', function () {
  });
}

function injectDiv() {
  var div = $('<div id="emptyBox"><br><br><br><br></div>');
  div.insertBefore(document.body.childNodes[0]);

  var open = $('<div id="openSelectionBox">VLV.ical</div>')
  open.insertBefore(document.body.childNodes[0]);

  var box = $('<div id="selectionBox"><br></div>')
  box.insertBefore(document.body.childNodes[0]);

  open = $('#openSelectionBox')[0];
  open.onclick = function () {
    openBox();
  }
  
  var downloadArea = $('<div id="downloadArea"></div>');
  downloadArea.insertBefore($('#selectionBox')[0].childNodes[0]);

  var itemBox = $('<div id="itemBox"><br></div>');
  itemBox.insertBefore($('#selectionBox')[0].childNodes[0]);

  var backButton = $('<div id="backButton"><center>hide</center></div>');
  backButton.insertBefore($('#selectionBox')[0].childNodes[0]);

  backButton = $('#backButton')[0];
  backButton.onclick = function () {
    closeBox(this.parentNode);
  }

  injectDownloadButtons();
}

function openBox() {
  var open = $('#openSelectionBox')[0];
  $(open).hide("slide");
  
  var box = $('#selectionBox')[0];
  $(box).show("slide");
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