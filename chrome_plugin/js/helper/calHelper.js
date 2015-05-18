/*
 * downloads the given events. takes an array as argument an concatenates it to a string to build an vCalendar formatted .ics file
 */
function download(subjects) {
  var cal = initCal();

  try {
    for (var i = 0; i < subjects.length; i++) {
      var source = 3;
      var event = getEventData(subjects[i], source);
      cal = addEvent(cal, event);
      console.log(event);
    }
  } catch (e) {
      console.log(e);
      console.log(subjects[i]);
    
    for (var n = i+1; i < subjects.length; n++) {
      console.log(event);
      var event = getEventData(subjects[n]);
      cal = addEvent(cal, event);
    }
    
  }
  
    
    for (var i = 0; i < subjects.length; i++) {
      var source = 4;
      
      try {
      var event = getEventData(subjects[i], source);
      cal = addEvent(cal, event);
      console.log(event);
      
        } catch (e) {
           console.log(e);
           console.log(subjects[i]);
           toastr.info("Keine Übung zu " + getNameOfLecture(subjects[i]) + "gefunden!")

      
    }
  }
  
  cal = closeCal(cal);
  var str = cal.join('\n');
  
  var dl = new Blob([str], {type: "text/plain;charset=utf-8"});
  saveAs(dl, "calendar.ics");
}

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
