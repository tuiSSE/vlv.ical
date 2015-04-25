fixDivHeight();
var entryInfo = {
    entryPoint: "stupla_fs09",
    rootElementLevel: 4
}


console.log(parseTime("09.00 - 10.30"));

//var subjects = getElements(getRootElement(entryInfo));
//console.log(getRootElement(entryInfo));
//console.log(parse(subjects));

function parse(subjects) {
  var data = [];
  var lectures = $('[axis="Vorlesungen:"]');
  var lessons = $('[axis="Übungen:"]');
  parseLectures(lectures, data);
  parseLessons(lessons, data);
  return data;
}

function getRootElement(entryInfo) {
  return $(document.getElementsByClassName(entryInfo.entryPoint)[0]).parents().eq(entryInfo.rootElementLevel)[0];
}

function getElements(root) {
  return root.getElementsByTagName('div');
}

function getNameOfLecture(object) {
    var name = object.parentNode.parentNode.parentNode.childNodes[1].innerText;
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
  return object.childNodes[13].innerText.slice(13);
}

function parseLectures(objects, data) {
  var i = 0;
  while (i < objects.length) {
    var subjectData = {
        name: "",
        speaker: "",
        lecture: [{
            dayOfWeek: "",
            dates: [],
            time: "",
            location: "",
            targetGroup: "",
            lastUpdated: ""
        }],
        lessons: [{
            dayOfWeek: "",
            dates: [],
            time: "",
            location: "",
            targetGroup: "",
            lastUpdated: ""
        }]
    };

    var subject = objects[i].parentNode;

    subjectData.name = getNameOfLecture(subject);
    subjectData.speaker = getSpeakerOfLecture(subject);
    subjectData.lecture.dayOfWeek = getDayOfWeek(subject);
    subjectData.lecture.location = getLocation(subject);
    subjectData.lecture.time = getTime(subject);
    subjectData.lecture.dates = getDates(subject);
    subjectData.lecture.targetGroup = getTargetGroup(subject);
    subjectData.lecture.lastUpdated = getLastUpdated(subject);

    data.push(subjectData);
    i++;
  }

  return data;
}

function parseLessons(objects, data) {
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

    var j = 0;
    while (j < data.length) {
      if (data[j].name == subject.parentNode.parentNode.parentNode.childNodes[1].innerText.slice(0, (name.length - 12))) {

      } else {

      }
      j++;
    }

    i++;
  }
}

function parseTime(raw) {
  raw = raw.split(" ");
  var time = [];
  time[0] = raw[0].replace('.','') + '00';
  time[1] = raw[2].replace('.','') + '00';
  return time;
}

function buildCalendar(data) {
  var arr = [];

  arr = openCal(arr);

  var i = 0;
  while (i < data.length) {
    arr = addEvent(arr, data[i]);
    i++
  }

  arr = closeCal(arr);

  return arr.join("\n");
}

function openCal(arr) {
  arr.push("BEGIN:VCALENDAR");
  arr.push("VERSION:1.0");
  return arr;
}

function addEvent(arr, event) {
  arr.push("BEGIN:VEVENT");
  //arr.push("DTSTART:20150425T090000");
  //arr.push("DTEND:20150425T100000");
  arr.push("DTSTART:" + event.date + 'T' + event.start);
  arr.push("DTEND:" + event.date + 'T' + event.end);
  arr.push("SUMMARY:" + event.name);
  arr.push("LOCATION:" + event.location);
  //arr.push("DESCRIPTION:" + event.description);
  //arr.push("PRIORITY:3");
  arr.push("END:VEVENT");

  return arr;
}

function closeCal(arr) {
  arr.push("END:VCALENDAR");
  return arr;
}

function saveCal(cal, fileName) {
  var file = new Blob(cal, {type: "text/plain;charset=utf-8"});
  saveAs(file, fileName + ".ics");
}

function fixDivHeight() {
    document.getElementById("rechtespalte2").style.height = "auto";
}
