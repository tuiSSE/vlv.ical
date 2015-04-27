/*
 * removes a given object from a given array. needed for removing an event from selection
 */
function removeFromList(list, i, object) {
  return list.filter(function (object) {
      return list[i] !== object;
    });
}

/*
 * returns the index of an object in an array, needed for removeFromList()
 */
function getObjectIndex(object, list) {
  var i;
  for (i = 0; i< list.length; i++) {
    if (list[i] === object) {
      return i;
    }
  }
}

/*
 * returns whether or not an object is present in an array
 */
function containsObject(object, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === object) {
            return true;
        }
    }

    return false;
}
