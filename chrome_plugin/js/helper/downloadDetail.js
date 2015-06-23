function downloadDetail(obj) {
	var data = getDetailData(obj);

	try {
      var cal = initCal();
      
      if(data.until !== null){
      	if (!Array.isArray(data.begin)) {
        	cal = addEventsDetail(cal, data);
        } else {
        	for (var i = 0; i < data.begin.length; i++) {
            	cal = addEventsWithBreakDetail(cal, data, i);
            }
        }
      } else {
      	cal = addEventDetail(cal, data);
      }
      
      cal = closeCal(cal);
      var str = cal.join('\n');
      
      str = str.replace(/,/g, "\\,");
      console.log(str);

      var filename = data.name.split(" ").join("_") + '_' + getDatetoString();
     
      var dl = new Blob([str], { type: "text/plain;charset=utf-8" });
      saveAs(dl, filename + ".ics");
    } catch (e) {
      toastr.error("Download failed!", e);
      console.log(e);
    }
}

function getDetailData(obj) {
  var dates = obj.childNodes[5].innerText;
  if (dates.match(/[0-9][0-9].[0-9][0-9]/g) !== null ||
          dates.match(/KW/g) !== null) {

  	var name = obj.parentNode.parentNode.parentNode.childNodes[1].innerText;
  	var dayOfWeek = obj.childNodes[3].innerText;
  	var time = obj.childNodes[7].innerText;
  	var dates = obj.childNodes[5].innerText;
  	var location = obj.childNodes[9].innerText;

  	var timeData = [dates, time];
      var time = parseTime(timeData, dayOfWeek);
      var begin;
      var end;
      var until = null;
      var weekly = 1;

      if(!Array.isArray(time[0])){
      begin     = time[0];
      end       = time[1];

      } else {
        begin = [];
        end = [];
        until = [];
        time.forEach(function(event, i, eventArray){
          begin.push(event[0]);
          end.push(event[2]);
          until.push(event[1]);
        });
      }

  	return {
  		"name": name,
  		"location": location,
  		"begin": begin,
  		"end": end,
  		"until": until,
  		"weekly": weekly
  	}
  }
}

/*
 * adds a given event to a given calendar
 */
function addEventDetail(cal, event) {
    cal.push('BEGIN:VEVENT');
    cal.push('CREATED:' + getCurrentTimestamp());
    cal.push('UID:' + uid());
    cal.push('DTEND;TZID=Europe/Berlin:' + event.end);
    cal.push("LOCATION:" + event.location);
    cal.push('TRANSP:OPAQUE');
    cal.push('SUMMARY:' + event.name);
    cal.push("DESCRIPTION:");
    cal.push('DTSTART;TZID=Europe/Berlin:' + event.begin);
    cal.push('DTSTAMP:' + getCurrentTimestamp());
    cal.push('SEQUENCE:0');
    cal.push('END:VEVENT');
  
  return cal;
}

/*
 * adds an event with multiple dates to a given calendar
 */
function addEventsDetail(cal, event) {
    cal.push('BEGIN:VEVENT');
    cal.push('CREATED:' + getCurrentTimestamp());
    cal.push('UID:' + uid());
    cal.push('DTEND;TZID=Europe/Berlin:' + event.end);
    cal.push("LOCATION:" + event.location);
    cal.push('TRANSP:OPAQUE');
    cal.push('SUMMARY:' + event.name);
    cal.push("DESCRIPTION:");
    cal.push('DTSTART;TZID=Europe/Berlin:' + event.begin);
    cal.push('RRULE:FREQ=WEEKLY;INTERVAL=' + event.weekly + ';UNTIL=' + event.until);
    cal.push('DTSTAMP:' + getCurrentTimestamp());
    cal.push('SEQUENCE:0');
    cal.push('END:VEVENT');
  
  return cal;
}

/*
 * adds an event with multiple dates and a break to a given calendar
 */
function addEventsWithBreakDetail(cal, event, i) {
    cal.push('BEGIN:VEVENT');
    cal.push('CREATED:' + getCurrentTimestamp());
    cal.push('UID:' + uid());
    cal.push('DTEND;TZID=Europe/Berlin:' + event.end[i]);
    cal.push("LOCATION:" + event.location);
    cal.push('TRANSP:OPAQUE');
    cal.push('SUMMARY:' + event.name);
    cal.push("DESCRIPTION:");
    cal.push('DTSTART;TZID=Europe/Berlin:' + event.begin[i]);
    cal.push('RRULE:FREQ=WEEKLY;INTERVAL=' + event.weekly + ';UNTIL=' + event.until[i]);
    cal.push('DTSTAMP:' + getCurrentTimestamp());
    cal.push('SEQUENCE:0');
    cal.push('END:VEVENT');
  
  return cal;
}