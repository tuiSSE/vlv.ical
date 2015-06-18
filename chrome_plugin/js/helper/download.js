function downloadSelection(filename) {
  var items = load('selection');
  if (items.length > 0) {
    try {
      var cal = initCal();
      
      items.forEach(function(item, i, iArray){
        var tmp = load(item);
        /**
         * Iterate over data.objects
         * @param  {[type]} event         [Element in data.objects]
         * @param  {[type]} i             [Index of the iterations element]
         * @param  {[type]} eventArray){                       if(tmp.objects[i].until.length ! [description]
         * @return {[type]}               [description]
         */
        tmp.objects.forEach(function(event, i, eventArray){
          if(tmp.objects[i].until !== null){
            /*
             * Get data.seq[Begin, End, Until] items
             */           
            cal = addEvents(cal, tmp, i);
          } else {
            cal = addEvent(cal, load(item), i);
          }
        }); 
      });
      
      cal = closeCal(cal);
      var str = cal.join('\n');
      
      str = str.replace(/,/g, "\\,");
      console.log(str);
     
      var dl = new Blob([str], { type: "text/plain;charset=utf-8" });
     saveAs(dl, filename + ".ics");
    } catch (e) {
      toastr.error("Download failed!", e);
      console.log(e);
    }
  } else {
      toastr.warning("Keine Veranstaltungen ausgewählt.")
  };
}