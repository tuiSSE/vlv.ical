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

/**
 * Helper to check if a Var is Empty/Defined
 */
function isEmpty(v) {
  if(v && typeof v !== 'undefined') {
    return v;
  } else {
    throw new Error("Variable " + v + "is empty or not defined!");
  }
}

/**
 * Returns current time and date as string
 */
function getDatetoString(){
  var now = new Date();

   var year = now.getFullYear();
   
   var month = now.getMonth() + 1;
   if (month < 10) {
    month = "0" + month;
   }

   var day = now.getDate();
   if (day < 10) {
    day = '0' + day;
   }

   var hours = now.getHours();
   if (hours < 10) {
    hours = '0' + hours;
   }

   var minutes = now.getMinutes();
   if (minutes < 10) {
    minutes = '0' + minutes;
   }
   
   var dateString = year + month + day + hours + minutes;
   return dateString;
 }