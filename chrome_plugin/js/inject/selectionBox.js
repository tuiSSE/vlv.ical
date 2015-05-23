function updateSelectionBox() {
  var itemBox = $('#itemBox')[0];
  itemBox.innerHTML = '';

  try {
    var items = load('selection');
    for (var i = 0; i < items.length; i++) {
      var element = document.createElement('input');
      element.className = 'selectionBoxItem';
      element.type = 'button';
      element.value = items[i];
      itemBox.appendChild(element);
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

  var open = $('<div id="openSelectionBox"><img class="plusIcon" src="' + chrome.extension.getURL('/resources/add.svg') + '"/>' + '</div>')
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
  $(open).fadeOut();
  
  var box = $('#selectionBox')[0];
  $(box).fadeIn();
}

function closeBox() {
  var open = $('#openSelectionBox')[0];
  $(open).fadeIn();
  
  var box = $('#selectionBox')[0];
  $(box).fadeOut();
}

function clearSelectionBox() {
  var selection = loadObjects('selection');
  selection = [];
  saveObjects('selection', selection);
  updateSelection();
}