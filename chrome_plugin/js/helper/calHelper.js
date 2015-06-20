/*
 * adds a given event to a given calendar
 */
function addEvent(cal, event, i) {
    cal.push('BEGIN:VEVENT');
    cal.push('CREATED:' + getCurrentTimestamp());
    cal.push('UID:' + uid());
    cal.push('DTEND;TZID=Europe/Berlin:' + event.objects[i].end);
    cal.push("LOCATION:" + event.objects[i].location);
    cal.push('TRANSP:OPAQUE');
    cal.push('SUMMARY:' + event.objects[i].name);
    cal.push("DESCRIPTION:" + event.objects[i].comment);
    cal.push('DTSTART;TZID=Europe/Berlin:' + event.objects[i].begin);
    cal.push('DTSTAMP:' + getCurrentTimestamp());
    cal.push('SEQUENCE:0');
    cal.push('END:VEVENT');
  
  return cal;
}

/*
 * adds an event with multiple dates to a given calendar
 */
function addEvents(cal, event, i) {
    cal.push('BEGIN:VEVENT');
    cal.push('CREATED:' + getCurrentTimestamp());
    cal.push('UID:' + uid());
    cal.push('DTEND;TZID=Europe/Berlin:' + event.objects[i].end);
    cal.push("LOCATION:" + event.objects[i].location);
    cal.push('TRANSP:OPAQUE');
    cal.push('SUMMARY:' + event.objects[i].name);
    cal.push("DESCRIPTION:" + event.objects[i].comment);
    cal.push('DTSTART;TZID=Europe/Berlin:' + event.objects[i].begin);
    cal.push('RRULE:FREQ=WEEKLY;INTERVAL=' + event.objects[i].weekly + ';UNTIL=' + event.objects[i].until);
    cal.push('DTSTAMP:' + getCurrentTimestamp());
    cal.push('SEQUENCE:0');
    cal.push('END:VEVENT');
  
  return cal;
}

/*
 * adds an event with multiple dates and a break to a given calendar
 */
function addEventsWithBreak(cal, event, i, j) {
    cal.push('BEGIN:VEVENT');
    cal.push('CREATED:' + getCurrentTimestamp());
    cal.push('UID:' + uid());
    cal.push('DTEND;TZID=Europe/Berlin:' + event.objects[i].end[j]);
    cal.push("LOCATION:" + event.objects[i].location);
    cal.push('TRANSP:OPAQUE');
    cal.push('SUMMARY:' + event.objects[i].name);
    cal.push("DESCRIPTION:" + event.objects[i].comment);
    cal.push('DTSTART;TZID=Europe/Berlin:' + event.objects[i].begin[j]);
    cal.push('RRULE:FREQ=WEEKLY;INTERVAL=' + event.objects[i].weekly + ';UNTIL=' + event.objects[i].until[j]);
    cal.push('DTSTAMP:' + getCurrentTimestamp());
    cal.push('SEQUENCE:0');
    cal.push('END:VEVENT');
  
  return cal;
}

/*
 * initializes a valid vCalendar
 */
function initCal() {
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
  
  return cal;
}

/*
 * adds an end tag to a given calendar
 */
function closeCal(cal) {
  cal.push('END:VCALENDAR');
  return cal;
}

function getCurrentTimestamp() {
  var tst = "20150425T221630Z";

  var date = new Date();
  var year = date.getFullYear();

  var month = date.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }

  var day = date.getDate();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();

  var str = year + month + day + "T" + hours + minutes + seconds + "Z";

  return str;
}

/*
 * returns a unique identifier needed for calendar events
 */
function uid() {
  function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  }

  return(S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
}
