function save(key, value) {
	localStorage.setItem(key, JSON.stringify(value));
}

function load(key) {
	return JSON.parse(localStorage[key]);
}

function saveObject(key, object) {
  console.log("Object saved!");
	var path = getDomPath(object);
  save(key, path);
}

function loadObject(key) {
  console.log("Object loaded!");
	return document.querySelector(load(key).join(' '));
}

function getDomPath(element) {
  var stack = [];
  while ( element.parentNode != null ) {
    var sibCount = 0;
    var sibIndex = 0;
    for ( var i = 0; i < element.parentNode.childNodes.length; i++ ) {
      var sib = element.parentNode.childNodes[i];
      if ( sib.nodeName == element.nodeName ) {
        if ( sib === element ) {
          sibIndex = sibCount;
        }
        sibCount++;
      }
    }
    if ( element.hasAttribute('id') && element.id != '' ) {
      stack.unshift(element.nodeName.toLowerCase() + '#' + element.id);
    } else if ( sibCount > 1 ) {
      stack.unshift(element.nodeName.toLowerCase() + ':eq(' + sibIndex + ')');
    } else {
      stack.unshift(element.nodeName.toLowerCase());
    }
    element = element.parentNode;
  }

  return stack.slice(1);
}