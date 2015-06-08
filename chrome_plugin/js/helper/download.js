/*
 * downloads the given events. takes an array as argument an concatenates it to a string to build an vCalendar formatted .ics file
 */
function downloadAll(subjects) {
  var cal = initCal();

  try {
    subjects.forEach(function(subject, i, subArray){
      var event = getEventData(subject);
      
      if(event.seq !== undefined && event.seq.length !== 0){
          event.seq.forEach(function(ev, i, eventArray){
            item.begin = ev[0];
            item.end = ev[1];
            
            cal = addEvents(cal, ev);
          });
      } else {
        cal = addEvent(cal, event);
      }
    });
  } catch (e) {
    console.log(e);
    console.log(subjects[i]);
  }

  cal = closeCal(cal);
  var str = cal.join('\n');
  
  str = str.replace(/,/g, "\\,");
  console.log(str);
  
  var dl = new Blob([str], { type: "text/plain;charset=utf-8" });
  saveAs(dl, "calendar.ics");
}

function downloadSelection() {
  var items = load('selection');
  if (items.length > 0) {
    try {
      var cal = initCal();
      
      items.forEach(function(item, i, iArray){
        var tmp = load(item);
   
        if(tmp.seq !== undefined && tmp.seq.length !== 0){
          tmp.seq.forEach(function(event, i, eventArray){
            tmp.begin = event[0];
            tmp.end = event[1];
            
            cal = addEvents(cal, tmp);
          });
        } else {
          cal = addEvent(cal, load(item));
        }
        
      });
      
      cal = closeCal(cal);
      var str = cal.join('\n');
      
      str = str.replace(/,/g, "\\,");
      console.log(str);
     
      var dl = new Blob([str], { type: "text/plain;charset=utf-8" });
     saveAs(dl, "calendar.ics");
    } catch (e) {
      toastr.error("Download failed!", e);
    }
  } else {
      toastr.warning("Keine Veranstaltungen ausgewählt.")
  };
}