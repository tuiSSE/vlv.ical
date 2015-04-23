fixDivHeight();
var entryInfo = {
    entryPoint: "stupla_fs09",
    rootElementLevel: 4
}

var subjects = getElements(getRootElement(entryInfo));
parse(subjects);

console.log(subjects[0]);





function parse(subjects) {
  var data = [];
  var lectures = $('[axis="Vorlesungen:"]');
  var lessons = $('[axis="Übungen:"]');
  parseLectures(lectures, data);
  parseLessons(lessons, data);
}

function getRootElement(entryInfo) {
  return $(document.getElementsByClassName(entryInfo.entryPoint)[0]).parents().eq(entryInfo.rootElementLevel)[0];
}

function getElements(root) {
  return root.getElementsByTagName('div');
}

function getNameOfLecture(object) {
    var name = object.parentNode.parentNode.parentNode.childNodes[1].innerText
    return name.slice(0, (name.length - 12));
}

function getSpeakerOfLecture(object) {
  return object.parentNode.parentNode.parentNode.childNodes[3].innerText.slice(12);
}

function getDayOfWeek(object) {
  return object.childNodes[3].innerText;
}

function getLocation(object) {
  return object.childNodes[9].innerText;
}

function getTime(object) {
  return object.childNodes[7].innerText;
}

function getDates(object) {
  return object.childNodes[5].innerText;
}

function getTargetGroup(object) {
  return object.childNodes[11].innerText;
}

function getLastUpdated(object) {
  var st = object.childNodes[13].innerText.slice(13);
  var parts = st.split('.');
  var dt = new Date('20' + parts[2].slice(0,2), parts[1]-1, parts[0]);
  return dt;
}

function parseLectures(objects, data) {
  var subjectData = {
      name: "",
      speaker: "",
      lecture: {
          dayOfWeek: "",
          dates: [],
          time: "",
          location: "",
          targetGroup: "",
          lastUpdated: ""
      },
      lessons: [{
          dayOfWeek: "",
          dates: [],
          time: "",
          location: "",
          targetGroup: "",
          lastUpdated: ""
      }]
  };

  var i = 0;
  while (i < objects.length) {
    var subject = objects[i].parentNode;
    console.log(subject);
    subjectData.name = getNameOfLecture(subject);
    subjectData.speaker = getSpeakerOfLecture(subject);
    subjectData.lecture.dayOfWeek = getDayOfWeek(subject);
    subjectData.lecture.location = getLocation(subject);
    subjectData.lecture.time = getTime(subject);
    subjectData.lecture.dates = getDates(subject);
    subjectData.lecture.targetGroup = getTargetGroup(subject);
    subjectData.lecture.lastUpdated = getLastUpdated(subject);
    console.log(subjectData);

    data.push(subjectData);
    i++;
  }

  return data;
}

function parseLessons(objects, data) {

}













function fixDivHeight() {
    document.getElementById("rechtespalte2").style.height = "auto";
}
