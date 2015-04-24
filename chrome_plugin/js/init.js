fixDivHeight();
var entryInfo = {
    entryPoint: "stupla_fs09",
    rootElementLevel: 4
}

console.log(buildCalendar());

var subjects = getElements(getRootElement(entryInfo));
console.log(getRootElement(entryInfo));
console.log(parse(subjects));

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
  var st = object.childNodes[13].innerText.slice(13);
  var parts = st.split('.');
  var dt = new Date('20' + parts[2].slice(0,2), parts[1]-1, parts[0]);
  return dt;
}

function parseLectures(objects, data) {
  var i = 0;
  while (i < objects.length) {
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

function buildCalendar() {
  var arr = [];

  arr.push("BEGIN:VCALENDAR");
  arr.push("VERSION:2.0");
  arr.push("PRODID:-//github.com/vlvical/vlv.ical");
  arr.push("CALSCALE:GREGORIAN");
  arr.push("BEGIN:VTIMEZONE");
  arr.push("TZID:Europe/Berlin");
  arr.push("TZURL:http://tzurl.org/zoneinfo-outlook/Europe/Berlin");
  arr.push("X-LIC-LOCATION:Europe/Berlin");
  arr.push("BEGIN:DAYLIGHT");
  arr.push("TZOFFSETFROM:+0100");
  arr.push("TZOFFSETTO:+0200");
  arr.push("TZNAME:CEST");
  arr.push("DTSTART:19700329T020000");
  arr.push("RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU");
  arr.push("END:DAYLIGHT");
  arr.push("BEGIN:STANDARD");
  arr.push("TZOFFSETFROM:+0200");
  arr.push("TZOFFSETTO:+0100");
  arr.push("TZNAME:CET");
  arr.push("DTSTART:19701025T030000");
  arr.push("RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU");
  arr.push("END:STANDARD");
  arr.push("END:VTIMEZONE");
  arr.push("BEGIN:VEVENT");
  arr.push("DTSTAMP:20150424T085249Z");
  arr.push("UID:20150424T085249Z-795382762@marudot.com");
  arr.push('DTSTART;TZID="Europe/Berlin":20150424T120000');
  arr.push('DTEND;TZID="Europe/Berlin":20150424T140000');
  arr.push("SUMMARY:Titel");
  arr.push("URL:" + url);
  arr.push("DESCRIPTION:" + description);
  arr.push("LOCATION:" + location);
  arr.push("BEGIN:VALARM");
  arr.push("ACTION:DISPLAY");
  arr.push("DESCRIPTION:Titel");
  arr.push("TRIGGER:-PT5M");
  arr.push("END:VALARM");
  arr.push("END:VEVENT");
  arr.push("END:VCALENDAR");

  return arr.join("\n");
}








function fixDivHeight() {
    document.getElementById("rechtespalte2").style.height = "auto";
}
