fixDivHeight();
init();

function init() {
  var entryInfo = {
      entryPoint: "stupla_fs09",
      rootElementLevel: 4
  }

  var subjects = getElements(getRootElement(entryInfo));

  var cal = [];

  cal.push('BEGIN:VCALENDAR');
  cal.push('CALSCALE:GREGORIAN');
  cal.push('VERSION:2.0');
  cal.push('METHOD:PUBLISH');
  cal.push('X-WR-CALNAME:Uni');
  cal.push('X-WR-TIMEZONE:Europe/Berlin');
  cal.push('X-APPLE-CALENDAR-COLOR:#1BADF8');
  cal.push('BEGIN:VTIMEZONE');
  cal.push('TZID:Europe/Berlin');
  cal.push('BEGIN:DAYLIGHT');
  cal.push('TZOFFSETFROM:+0100');
  cal.push('RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU');
  cal.push('DTSTART:19810329T020000');
  cal.push('TZNAME:MESZ');
  cal.push('TZOFFSETTO:+0200');
  cal.push('END:DAYLIGHT');
  cal.push('BEGIN:STANDARD');
  cal.push('TZOFFSETFROM:+0200');
  cal.push('RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU');
  cal.push('DTSTART:19961027T030000');
  cal.push('TZNAME:MEZ');
  cal.push('TZOFFSETTO:+0100');
  cal.push('END:STANDARD');
  cal.push('END:VTIMEZONE');

  try {
    for (i in subjects) {
      var event = getEventData(subjects[i]);
      cal = addEvent(cal, event);
    }
  } catch (e) {}

  cal.push('END:VCALENDAR');
  var str = cal.join('\n');

  console.log(str);
  var dl = new Blob([str], {type: "text/plain;charset=utf-8"});
  saveAs(dl, "calendar.ics");
}

function getRootElement(entryInfo) {
  return $(document.getElementsByClassName(entryInfo.entryPoint)[0]).parents().eq(entryInfo.rootElementLevel)[0];
}

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

  var time = parseTime(getTime(subject));
  event.begin = time[0];
  event.end = time[1];

  return event;
}

function parseTime(raw) {
  raw = raw.split(" ");
  var hours = [];
  hours[0] = raw[0].split('.');
  hours[1] = raw[2].split('.');

  var time =[];
  //time[0] = moment('25.04.2015', 'DD.MM.YYYY');
  //time[0].hour(hours[0][0]);
  //time[0].minute(hours[0][1]);
  //time[1] = moment('25.04.2015', 'DD.MM.YYYY');
  //time[1].hour(hours[1][0]);
  //time[1].minute(hours[1][1]);

  time[0] = new String('20150425' + 'T' + hours[0][0] + hours[0][1] + '00');
  time[1] = new String('20150425' + 'T' + hours[1][0] + hours[1][1] + '00');

  return time;
}

function addEvent(cal, event) {
  cal.push('BEGIN:VEVENT');
  cal.push('CREATED:20150425T221630Z');
  cal.push('UID:' + uid());
  cal.push('DTEND;TZID=Europe/Berlin:' + event.end);
  cal.push("LOCATION:" + event.location);
  cal.push('TRANSP:OPAQUE');
  cal.push('SUMMARY:' + event.name);
  cal.push("DESCRIPTION:" + event.speaker);
  cal.push('DTSTART;TZID=Europe/Berlin:' + event.begin);
  cal.push('DTSTAMP:20150425T221630Z');
  cal.push('SEQUENCE:0');
  cal.push('END:VEVENT');

  return cal;
}

function uid() {
  function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  }
  console.log(S4);

  return(S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
}

function fixDivHeight() {
    document.getElementById("rechtespalte2").style.height = "auto";
}
