/*
 * downloads the given events. takes an array as argument an concatenates it to a string to build an vCalendar formatted .ics file
 */
function downloadAll(subjects) {
  var cal = initCal();

  try {
    for (var i = 0; i < subjects.length; i++) {
      var event = getEventData(subjects[i]);
      cal = addEvent(cal, event);
    }
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
      
      for (var i = 0; i < items.length; i++) {
        cal = addEvent(cal, load(items[i]));
      }
      
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