/*
 * returns the root element, which is the highest element on the page we work with
 */
function getRootElement() {
  return $(document.getElementsByClassName("stupla_fs09")[0]).parents().eq(4)[0];
}

/*
 * returns an array of all events present on the page
 */
function getElements() {
  var elements = getRootElement().getElementsByTagName('div');
  var result = [];

  for (var i = 0; i < elements.length; i++) {

    try {
      if (getDayOfWeek(elements[i]) != null &&
          getTime(elements[i]) != "  -  ") {
        result.push(elements[i]);
      }
    } catch(e) {
        console.log("Failed to read subject");
        console.log(e);
        console.log(elements[i]);
    }
  }

  return result;
}

function getDeactivatedElements() {
  var elements = getRootElement().getElementsByTagName('div');
  var result = [];

  var active = getElements(getRootElement());
  for (var i = 0; i < elements.length; i++) {
    if (!(containsObject(elements[i], active))) {
      result.push(elements[i]);
    }
  }

  return result;
}

function getIdOfLecture(object) {
  return object.id;
}

function getNameOfLecture(object) {
    return object.childNodes[1].childNodes[0].innerText;
}

function getSpeakerOfLecture(object) {
  var speaker;
  var data = object.childNodes[3].innerText;

  if (data !== null) {
    if (data.indexOf('Lesende(r):') !== -1) {
    speaker = data.slice(12);

    } else {
      speaker = "";
    }
  } else {
    speaker = "";
  }
  return speaker;
}

function getDayOfWeek(object) {
  var day;
  try{
    day = object.childNodes[5].childNodes[3].childNodes[0].childNodes[3].innerText;
  } catch(e) {
    var data = getData(object);
    day = data[0].events[0].dayOfWeek;
  }

  return day;
}

function getTime(object) {
  var time;
  try {
    time = object.childNodes[5].childNodes[3].childNodes[0].childNodes[7].innerText
  } catch(e) {
    var data = getData(object);
    time = data[0].events[0].time;
  }
  return time;
}

function getLastUpdated(object) {
  var lastUpdated;
  try {
    lastUpdated = object.childNodes[5].childNodes[3].childNodes[0].childNodes[13].innerText.slice(13);
  } catch(e) {
    var data = getData(object);
    lastUpdated = data[0].events[0].lastUpdated;
  }
  return lastUpdated;
}

function getData(object) {
  var data;
  var cache = load('dataCache');

  if (cache != []) {
    if (!containsObject(object, cache)) {
      data = getNewData(object);
      cache.push(object.id);
      save('dataCache', cache);
      save('data_' + object.id, data);
    } else {
      data = load('data_' + object.id);
    }
  } else {
      data = getNewData(object);
      cache.push(object.id);
      save('dataCache', cache);
      save('data_' + object.id, data);
  }

  return data;
}

function getNewData(object) {
  var data = [];
  var raw = getTypes(object);

  for (var i = 0; i < raw.length; i++) {
    var type = raw[i];
    var events = [];

    for (var j = 0; j < type.objs.length; j++) {
      var obj = type.objs[j];

      var dates = obj.childNodes[5].innerText;
      if (dates.match(/[0-9][0-9].[0-9][0-9]/g) !== null ||
          dates.match(/KW/g) !== null) {

        var tmpData = {
          "dayOfWeek": obj.childNodes[3].innerText,
          "dates": obj.childNodes[5].innerText,
          "time": obj.childNodes[7].innerText,
          "location": obj.childNodes[9].innerText,
          "targetGroup": obj.childNodes[11].innerText,
          "lastUpdated": obj.childNodes[13].innerText.slice(13)
        };

        events.push(tmpData);
      }
    }

    var tmpTypeData = {
      "type": type.type,
      "events": events
    };

    data.push(tmpTypeData);

  }
  return data;
}

function getTypes(object) {
  var result = [];

  var tbodies = $(object).find('tbody');
  for (var i = 0; i < tbodies.length; i++) {
    var obj = tbodies[i];
    var type = $(obj.childNodes[0].childNodes[1]).attr('axis');
    var count = 0;
    var objs = [];

    var objs = $(obj).find('tr');
    var objects = [];
    for (var j = 0; j < objs.length; j++) {
      objects.push(objs[j]);
    }

    result[i] = {
      "type": type.slice(0, type.length-1),
      "count": count,
      "objs": objects
    }
  }

  return result;
}

function convertData(obj) {
    var data = {
    id: "",
    name: "",
    origName: "",
    objects: [], // gets dataObjects
    link: [],
    changed: false
  }
  var dataObjects;

  var objData = getData(obj);

  data.id = getIdOfLecture(obj);
  data.name = getNameOfLecture(obj);
  data.origName = data.name;
  data.link = getDomPath(obj);
  var comment = getSpeakerOfLecture(obj);
  
  for (var i = 0; i < objData.length; i++) {
    for (var j = 0; j < objData[i].events.length; j++) {
      var obj = objData[i].events[j];

      if (obj.dayOfWeek !== ' ' &&
          obj.time !== '  -  ' &&
          obj.dates !== '') {

        var timeData = [obj.dates, obj.time];
        var time = parseTime(timeData, obj.dayOfWeek);
        var repeat = parseIntervall(obj.dates);
        var begin;
        var end;
        var until = null;

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

        dataObjects = { type: objData[i].type,
                      name: data.name,
                      location: obj.location, 
                      begin: begin,
                      end:   end,
                      until: until,
                      weekly: repeat,
                      lastUpdated: obj.lastUpdated,
                      comment:  comment};
        data.objects.push(dataObjects);
      }
    }
  }
  return data;
}