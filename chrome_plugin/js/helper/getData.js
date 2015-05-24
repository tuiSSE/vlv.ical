/*
 * returns the root element, which is the highest element on the page we work with
 */
function getRootElement(entryInfo) {
  return $(document.getElementsByClassName(entryInfo.entryPoint)[0]).parents().eq(entryInfo.rootElementLevel)[0];
}

/*
 * returns an array of all events present on the page
 */
function getElements(root) {
  return root.getElementsByTagName('div');
}

function getNameOfLecture(object) {
    var name = object.childNodes[1].innerText;
    if (name.slice(name.length - 12) == "Beschreibung") {
      result = name.slice(0, (name.length - 15));
    } else {
      result = name;
    }
    return result;
}

function getSpeakerOfLecture(object) {
  return object.childNodes[3].innerText.slice(12).split(',').join('\\,');
}

function getDayOfWeek2(object) {
  return object.childNodes[5].childNodes[3].childNodes[0].childNodes[3].innerText;
}

function getLocation(object) {
  return object.childNodes[5].childNodes[3].childNodes[0].childNodes[9].innerText.split(',').join('\\,');
}

function getTime(object) {
  return object.childNodes[5].childNodes[3].childNodes[0].childNodes[7].innerText;
}

function getDates(object) {
  return object.childNodes[5].childNodes[3].childNodes[0].childNodes[5].innerText;
}

function getTargetGroup(object) {
  return object.childNodes[5].childNodes[3].childNodes[0].childNodes[11].innerText;
}

function getLastUpdated(object) {
  return object.childNodes[5].childNodes[3].childNodes[0].childNodes[13].innerText.slice(13);
}

function getTimeOfObject(object) {
  return object.innerHTML.match(/[0-2][0-9].[0-5][0-9] - [0-2][0-9].[0-5][0-9]/g);
}

function getDayOfWeek(object) {
  var result = "";
  
  if (object.innerHTML.match(/Montag/g).length > 0) {
    result = object.innerHTML.match(/Montag/g);
    
  } else if (object.innerHTML.match(/Dienstag/g).length > 0) {
    result = object.innerHTML.match(/Dienstag/g);
    
  } else if (object.innerHTML.match(/Mittwoch/g).length > 0) {
    result = object.innerHTML.match(/Mittwoch/g);
    
  } else if (object.innerHTML.match(/Donnerstag/g).length > 0) {
    result = object.innerHTML.match(/Donnerstag/g);
    
  } else if (object.innerHTML.match(/Freitag/g).length > 0) {
    result = object.innerHTML.match(/Freitag/g);
    
  } else if (object.innerHTML.match(/Samstag/g).length > 0) {
    result = object.innerHTML.match(/Samstag/g);
    
  } else if (object.innerHTML.match(/Sonntag/g).length > 0) {
    result = object.innerHTML.match(/Sonntag/g);
  }
  
  return result;
}

function getEventData(subject) {
  var data = {
    name: "",
    comment: "",
    location: "",
    begin: "",
    end: ""
  };
  
  var timeData = [getDates(subject), getTime(subject)];

  data.name = getNameOfLecture(subject);
  data.comment = getSpeakerOfLecture(subject);
  data.location = getLocation(subject);

  var time = parseTime(timeData, getDayOfWeek(subject));
  data.begin = time[0];
  data.end = time[1];

  return data;
}

function getTypeOfContents(obj) {
  var result = {
    lectures : false,
    lessons : false,
    exams : false
  };
  
  if ($(obj).find('[axis="Vorlesungen:"]').length > 0) {
    result.lectures = true;
  }
  
  if ($(obj).find('[axis="Übungen:"]').length > 0) {
    result.lessons = true;
  }
  
  if ($(obj).find('[axis="Klausur:"]').length > 0) {
    result.exams = true;
  }
  
  return result;
}

function getData(obj) {
  var type = getTypeOfContents(obj);
  var data = {
    name : "",
    speaker : "",
    lectures : [],
    lessons : [],
    exams : []
  };
  
  data.name = getNameOfLecture(obj);
  data.speaker = getSpeakerOfLecture(obj);
  
  if (type.lectures) {
    var rawLectures = $(obj).find('[axis="Vorlesungen:"]');
    data.lectures = getLectures(rawLectures);
  }
  
  if (type.lessons) {
    var rawLessons = $(obj).find('[axis="Übungen:"]');
    data.lessons = getLessons(rawLessons);
  }
  
  if (type.exams) {
    var rawExams = $(obj).find('[axis="Klausur:"]');
    data.exams = getExams(rawExams);
  }
  
  return data;
}

function getLectures(objs) {
  var data = [];
  
  for (var i = 0; i < objs.length; i++) {
    var obj = objs[i].parentNode;
    var event = {
      location : "",
      begin : "",
      end : "",
      repeat : "",
      targetGroup : "",
      lastUpdated : ""
    };
    
     var time = getTimeOfObject(obj);
     var dayOfWeek = getDayOfWeek(obj);
    
  }
  
  return data;
}

function getLessons(objs) {
  var data = [];
  
  for (var i = 0; i < objs.length; i++) {
    var event = {
      location : "",
      begin : "",
      end : "",
      repeat : "",
      targetGroup : "",
      lastUpdated : ""
    };
    
    
  }
  
  return data;
}

function getExams(objs) {
  var data = [];
  
  for (var i = 0; i < objs.length; i++) {
    var event = {
      location : "",
      begin : "",
      end : "",
      repeat : "",
      targetGroup : "",
      lastUpdated : ""
    };
    
  }
  
  return data;
}
