/*
 * adds a given event to a given calendar
 */
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

/*
 * adds an event with multiple dates to a given calendar
 */
function addEvents(cal, event) {
    cal.push('BEGIN:VEVENT');
    cal.push('CREATED:20150425T221630Z');
    cal.push('UID:' + uid());
    cal.push('DTEND;TZID=Europe/Berlin:' + event.end);
    cal.push("LOCATION:" + event.location);
    cal.push('TRANSP:OPAQUE');
    cal.push('SUMMARY:' + event.name);
    cal.push("DESCRIPTION:" + event.speaker);
    cal.push('DTSTART;TZID=Europe/Berlin:' + event.begin);
    cal.push('RRULE:FREQ=WEEKLY;INTERVAL=1;UNTIL=' + event.until);
    cal.push('DTSTAMP:20150425T221630Z');
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

/*
 * returns a unique identifier needed for calendar events
 */
function uid() {
  function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  }

  return(S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
}
