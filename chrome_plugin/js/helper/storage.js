/*
 * Saves a given value to localStorage.
 */
function save(key, value) {
	localStorage.setItem(key, JSON.stringify(value));
}

/*
 * Loads a value from localStorage and returns it.
 */
function load(key) {
	return JSON.parse(localStorage[key]);
}


/*
 * Saves a given object by saving its DOM path.
 */
function saveObject(key, object) {
	var path = getDomPath(object);
  save(key, path);
}

/*
 * Loads an object by loading its DOM path from storage and return the object with that path
 */
function loadObject(key) {
	return document.querySelector(load(key).join(' '));
}

/*
 * Saves an array of objects to storage.
 */
function saveObjects(key, objects) {
  if (load(key + '_length') > 0 ) {
    var objectLength = load(key + '_length');
    
    for (var i = 0; i < objectLength; i++) {
      localStorage.removeItem(key + '_' + i);
    }
  }
  
  save(key + '_length', objects.length);
  for (var i = 0; i < objects.length; i++) {
    saveObject(key + '_' + i, objects[i]);
  }
}

/*
 * Loads an array from storage.
 */
function loadObjects(key) {
  try {
    var objects = [];
    objectLength = load(key + '_length');
    for (var i = 0; i < objectLength; i++) {
      objects.push(loadObject(key + '_' + i));
    }
    return objects; 
  } catch(e) {
    return [];
  }
}

/*
 * Returns the DOM path of a given element. The DOM path is unique and serves as an unique identifier to save and load objects to and from localStorage.
 */
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