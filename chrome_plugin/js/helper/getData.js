/*
 * returns the root element, which is the highest element on the page we work with
 */
function getRootElement(entryInfo) {
  return $(document.getElementsByClassName(entryInfo.entryPoint)[0]).parents().eq(entryInfo.rootElementLevel)[0];
}

/*
 * returns an array of all events present on the page
 */
function getElements(root) {
  return root.getElementsByTagName('div');
}

function getNameOfLecture(object) {
    var name = object.childNodes[1].innerText;
    return name.slice(0, (name.length - 12));
}

function getSpeakerOfLecture(object) {
  return object.childNodes[3].innerText.slice(12).split(',').join('\\,');
}

function getDayOfWeek(object) {
  return object.childNodes[5].childNodes[3].childNodes[0].childNodes[3].innerText;
}

function getLocation(object) {
  return object.childNodes[5].childNodes[3].childNodes[0].childNodes[9].innerText.split(',').join('\\,');
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
  var event = {
    name: "",
    speaker: "",
    location: "",
    begin: "",
    end: ""
  }

  event.name = getNameOfLecture(subject);
  event.speaker = getSpeakerOfLecture(subject);
  event.location = getLocation(subject);

  var time = parseTime(getTime(subject), getDayOfWeek(subject));
  event.begin = time[0];
  event.end = time[1];

  return event;
}
