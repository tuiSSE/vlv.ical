/*
 * returns the root element, which is the highest element on the page we work with
 */
function getRootElement() {
  return $(document.getElementsByClassName("stupla_fs09")[0]).parents().eq(4)[0];
}

/*
 * returns an array of all events present on the page
 */
function getElements(root) {
  var elements = root.getElementsByTagName('div');
  var result = [];
  for (var i = 0; i < elements.length; i++) {
    if (getDayOfWeek(elements[i]) != null &&
        getTime(elements[i]) != "  -  ") {
      result.push(elements[i]);
    }
  }
  return result;
}

function getIdOfLecture(object) {
  return object.id;
}

function getNameOfLecture(object) {
    var name = object.childNodes[1].innerText;
    if (name.slice(name.length - 12) == "Beschreibung") {
      result = name.slice(0, (name.length - 15));
    } else {
      result = name;
    }
    return result;
}

function getSpeakerOfLecture(object) {
  return object.childNodes[3].innerText.slice(12);
}

function getDayOfWeek(object) {
  return object.childNodes[5].childNodes[3].childNodes[0].childNodes[3].innerText;
}

function getLocation(object) {
  return object.childNodes[5].childNodes[3].childNodes[0].childNodes[9].innerText;
}

function getTime(object) {
  return object.childNodes[5].childNodes[3].childNodes[0].childNodes[7].innerText;
}

function getDates(object) {
  return object.childNodes[5].childNodes[3].childNodes[0].childNodes[5].innerText;
}

function getTargetGroup(object) {
  return object.childNodes[5].childNodes[3].childNodes[0].childNodes[11].innerText;
}

function getLastUpdated(object) {
  return object.childNodes[5].childNodes[3].childNodes[0].childNodes[13].innerText.slice(13);
}

function getData(object) {
  var data = [];
  var raw = getTypes(object);

  for (var i = 0; i < raw.length; i++) {
    var type = raw[i];
    var events = [];

    for (var j = 0; j < type.objs.length; j++) {
      var obj = type.objs[j];
      var tmpData = {
        "dayOfWeek": obj.childNodes[3].innerText,
        "dates": obj.childNodes[5].innterText,
        "time": obj.childNodes[7].innerText,
        "location": obj.childNodes[9].innerText,
        "targetGroup": obj.childNodes[11].innerText,
        "lastUpdated": obj.childNodes[13].innerText
      };

      events.push(tmpData);
    }

    var tmpTypeData = {
      "type": type.type,
      "events": events
    };

    data.push(tmpTypeData);

  }
  return data;
}

function getTypes(object) {
  var result = [];

  var tbodies = $(object).find('tbody');
  for (var i = 0; i < tbodies.length; i++) {
    var obj = tbodies[i];
    var type = $(obj.childNodes[0].childNodes[1]).attr('axis');
    var count = 0;
    var objs = [];

    var objs = $(obj).find('tr');
    var objects = [];
    for (var j = 0; j < objs.length; j++) {
      objects.push(objs[j]);
    }

    result[i] = {
      "type": type,
      "count": count,
      "objs": objects
    }
  }

  return result;
}