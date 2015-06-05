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
  return root.getElementsByTagName('div');
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
    end: ""
  };
  
  var timeData = [getDates(subject), getTime(subject)];

  data.name = getNameOfLecture(subject);
  data.comment = getSpeakerOfLecture(subject);
  data.location = getLocation(subject);

  var time = parseTime(timeData, getDayOfWeek(subject));
  data.begin = time[0];
  data.end = time[1];

  return data;
}