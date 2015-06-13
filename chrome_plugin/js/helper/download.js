function downloadSelection(filename) {
  var items = load('selection');
  if (items.length > 0) {
    try {
      var cal = initCal();
      
      items.forEach(function(item, i, iArray){
        var tmp = load(item);
        /*
         * Check if data.seq is not an empty array
         * Then iterate over it
         */
        if(tmp.seq !== undefined && tmp.seq.length !== 0){
          tmp.seq.forEach(function(event, i, eventArray){
            /*
             * Get data.seq[Begin, End, Until] items
             */
            tmp.begin = event[0];
            tmp.end = event[2];
            tmp.until = event[1];
            
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
     saveAs(dl, filename + ".ics");
    } catch (e) {
      toastr.error("Download failed!", e);
    }
  } else {
      toastr.warning("Keine Veranstaltungen ausgewählt.")
  };
}