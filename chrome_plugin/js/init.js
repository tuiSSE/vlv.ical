fixDivHeight();
var toggledEvents = [];

/*
 * checks, if current page is the text one
 */
if (/vers=text/.test(self.location.href)) {
  init();
}

/*
 * initializes the plugin, loads the data, inserts the buttons, etc
 */
function init() {
  var entryInfo = {
      entryPoint: "stupla_fs09",
      rootElementLevel: 4
  }

  var subjects = getElements(getRootElement(entryInfo));

  var downloadSelected= $('<input type="button" id="downloadSelected" style="background: white; border-radius: 5px; font-size: 15px; border: solid #a3a3a3 2px;font-family: Helvetica;text-decoration: none;padding: 0px 7px 0px 7px;font-family: Arial" value="Download selected"/>');
  downloadSelected.insertBefore(subjects[0]);
  $("#downloadSelected").on('click', function(entryInfo){
    if (toggledEvents.length > 0) {
      download(toggledEvents);
    } else {
      alert("Keine Veranstaltungen ausgewählt.")
    };
  });

  var downloadAll= $('<input type="button" id="downloadAll" style="background: white; border-radius: 5px; font-size: 15px; border: solid #a3a3a3 2px;font-family: Helvetica;text-decoration: none;padding: 0px 7px 0px 7px;font-family: Arial" value="Download all"/>');
  downloadAll.insertBefore(subjects[0]);
  $("#downloadAll").on('click', function(entryInfo){
    if (subjects.length > 0) {
      download(subjects);
    } else {
      alert("Keine Veranstaltungen gefunden.")
    };
  });

  var i;
  for (i = 0; i < subjects.length; i++){
    var r= $('<input type="button" class="eventToggle" style="background: white; border-radius: 5px; font-size: 15px;  color: #07d41f; border: solid #a3a3a3 2px;font-family: Arial;text-decoration: none;padding: 0px 7px 0px 7px;font-family: Arial" value="+"/> ');
    r.insertBefore(subjects[i].childNodes[1].childNodes[0]);
  }

  $(".eventToggle").on('click', function(entryInfo){
    var object = this.parentNode.parentNode;
    if (!containsObject(object, toggledEvents)) {
      toggledEvents.push(object);
      this.value = '-';
      this.style.color = 'red'
      object.style.background = '#BEE8BA';
    } else {
      toggledEvents = removeFromList(toggledEvents, getObjectIndex(object, toggledEvents, object));
      this.value = '+';
      this.style.color = '#07d41f';
      object.style.background = 'white';
    }
  });

}

/*
 * downloads the given events. takes an array as argument an concatenates it to a string to build an vCalendar formatted .ics file
 */
function download(subjects) {
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

  console.log('Output: ');
  console.log([str]);

  var dl = new Blob([str], {type: "text/plain;charset=utf-8"});
  saveAs(dl, "calendar.ics");
}

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

function parseTime(raw, day) {
  raw = raw.split(" ");
  var hours = [];
  hours[0] = raw[0].split('.');
  hours[1] = raw[2].split('.');

  var time =[];
  try {
    var dt = getDate(18, 2015, day);
  } catch(e) { console.log(e); }

  var year = dt.getFullYear().toString();

  var month = dt.getMonth() + 1;
  if (month < 10) {
    month = '0' + month.toString();
  }

  var date = dt.getDate().toString();

  time[0] = new String(year + month + date + 'T' + hours[0][0] + hours[0][1] + '00');
  time[1] = new String(year + month + date + 'T' + hours[1][0] + hours[1][1] + '00');

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

function getDate(w, y, day) {
    var simple = new Date(y, 0, 1 + (w - 1) * 7);
    var date = simple;
    var dow = simple.getDay();
    var weekStart = simple;
    if (dow <= 4)
        weekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else
        weekStart.setDate(simple.getDate() + 8 - simple.getDay());

    switch(day) {
      case 'Montag':
        break;

      case 'Dienstag':
        date.setDate(weekStart.getDate() + 1);
        break;

      case 'Mittwoch':
        date.setDate(weekStart.getDate() + 2);
        break;

      case 'Donnerstag':
        date.setDate(weekStart.getDate() + 3);
        break;

      case 'Freitag':
        date.setDate(weekStart.getDate() + 4);
        break;

      case 'Samstag':
        date.setDate(weekStart.getDate() + 5);
        break;

      case 'Sonntag':
        date.setDate(weekStart.getDate() + 6);
        break;
        }

    return date;
}

function uid() {
  function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  }

  return(S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
}

function fixDivHeight() {
    document.getElementById("rechtespalte2").style.height = "auto";
}
