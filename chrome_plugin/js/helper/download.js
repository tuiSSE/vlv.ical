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
            if (!Array.isArray(tmp.objects[i].begin)) {
              cal = addEvents(cal, tmp.objects[i], i);
            } else {
              for (var j = 0; j < tmp.objects[i].begin.length; j++) {
                  cal = addEventsWithBreak(cal, tmp.objects[i], i, j);
              }
            }
          } else {
            cal = addEvent(cal, load(item).objects[i], i);
          }
        }); 
      });
      
      cal = closeCal(cal);
      var str = cal.join('\n');
      
      str = str.replace(/,/g, "\\,");
     
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

function downloadSeparateFiles() {
  var types = [];
  var objects = {};
  var items = load('selection');
  if (items.length > 0) {
    for (var i = 0; i < items.length; i++) {
      for (var j = 0; j < load(items[i]).objects.length; j++) {
        if (!containsObject(load(items[i]).objects[j].type, types)) {
          types.push(load(items[i]).objects[j].type);
          objects[load(items[i]).objects[j].type] = [];
        }
        objects[load(items[i]).objects[j].type].push(load(items[i]).objects[j]);
      }
    }

    for (var i = 0; i < types.length; i++) {
      var type = objects[types[i]];
      var cal = initCal(types[i]);

      for (var j = 0; j < type.length; j++) {
        var obj = type[j];
        if(obj.until !== null){
          if (!Array.isArray(obj.begin)) {
            cal = addEvents(cal, obj, i);
          } else {
            for (var j = 0; j < obj.begin.length; j++) {
              cal = addEventsWithBreak(cal, obj, i, j);
            }
          }
        } else {
          cal = addEvent(cal, obj, i);
        }
      }

      cal = closeCal(cal);
      var str = cal.join('\n');
      
      str = str.replace(/,/g, "\\,");

      var dl = new Blob([str], { type: "text/plain;charset=utf-8" });
      saveAs(dl, types[i] + "_" + getDatetoString() + ".ics");
    }

  } else {
    toastr.warning("Keine Veranstaltungen ausgewählt.");
  }
}