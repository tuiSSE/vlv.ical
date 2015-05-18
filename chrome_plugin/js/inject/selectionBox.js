function updateSelectionBox() {
  var selection = loadObjects('selection');
  var box = $('#itemBox')[0];
  box.innerHTML = '';

  for (var i = 0; i < selection.length; i++) {
    var name = getNameOfLecture(selection[i]);
    var element = document.createElement('input');
    element.className = 'selectionBoxItem';
    element.type = 'button';
    element.value = name;
    box.appendChild(element);
  }
}

function injectEditDialogs() {
  $('.addButton').on('click', function() {

  });
}

function injectDiv() {
  var div = $('<div id="emptyBox"><br><br><br><br></div>');
  div.insertBefore(document.body.childNodes[0]);

  var box = $('<div id="selectionBox"></div>')
  box.insertBefore(document.body.childNodes[0]);

  box = $('#selectionBox')[0];

  var controlBox = document.createElement('div');
  controlBox.id = 'controlBox';
  box.appendChild(controlBox);

  var itemBox = document.createElement('div');
  itemBox.id = 'itemBox';
  box.appendChild(itemBox);

  var clear = document.createElement('input');
  clear.className = 'clearButton';
  clear.type = 'button';
  clear.value = 'clear';
  clear.onclick = clearSelectionBox;
  box.appendChild(clear);

}

function clearSelectionBox() {
  var selection = loadObjects('selection');
  selection = [];
  saveObjects('selection', selection);
  updateSelection();
}