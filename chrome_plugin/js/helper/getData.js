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
    if (elements[i].childNodes[5].childNodes[3].childNodes[0].innerText.match(/mündliche Prüfung/g) == null) {
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

function getEventData(subject) {
  var data = {
    name: "",
    comment: "",
    location: "",
    begin: "",
    end: "",
    until: "",
    seq:[]
  };
  
  var timeData = [getDates(subject), getTime(subject)];

  data.name = getNameOfLecture(subject);
  data.comment = getSpeakerOfLecture(subject);
  data.location = getLocation(subject);

  var time = parseTime(timeData, getDayOfWeek(subject));
  
  /*
   * When time[0] is not an array, the event is non-repeating
   */
  if(!Array.isArray(time[0])){
    data.begin = time[0];
    data.end = time[1];
  } else {
    data.seq = time;
  }

  return data;
}