function updateSelectionBox() {
	var selection = loadObjects('selection');
	var box = $('#selectionBox')[0];
	box.innerHTML = '';
	var clear = document.createElement('input');
	clear.class = 'clearButton';
	clear.type = 'button';
	clear.value = 'clear';
	clear.onclick = clearSelectionBox;
	box.appendChild(clear);
	
	for (var i = 0; i < selection.length; i++) {
		var name = getNameOfLecture(selection[i]);
		var element = document.createElement('input');
		element.type = 'button';
		element.value = name;
		box.appendChild(element);
	}
}

function injectDiv() {
  var div = $('<div id="emptyBox"><br><br><br><br></div>');
  div.insertBefore(document.body.childNodes[0]);
  
  var box = $('<div id="selectionBox"></div>')
  box.insertBefore(document.body.childNodes[0]);
}

function clearSelectionBox() {
	var selection = loadObjects('selection');
	selection = [];
	saveObjects('selection', selection);
	updateSelection();
}