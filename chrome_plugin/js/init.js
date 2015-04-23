fixDivHeight();
var entryInfo = {
    entryPoint: "stupla_fs09",
    rootElementLevel: 4
}

var subjects = getElements(getRootElement(entryInfo));
parse(subjects);

console.log(subjects[0]);





function parse(subjects) {
  var lectures = $('[axis="Vorlesungen:"]');

  var i = 0;
  while (i < subjects.length) {
    var item = subjects[i];
    var data = {
        name: "",
        speaker: "",
        lecture: {
            dayOfWeek: "",
            dates: [],
            time: "",
            location: "",
            targetGroup: "",
            lastUpdated: ""
        },
        lesson: {
            dayOfWeek: "",
            dates: [],
            time: "",
            location: "",
            targetGroup: "",
            lastUpdated: ""
        }
    };

    data.name = getTitleOfSubject(item);
    data.speaker = getSpeakerOfLecture(item);

    try{
      var lecture = lectures[i].parentNode;
      data.lecture.dayOfWeek = getDayOfWeek(lecture);
      data.lecture.location = getLocation(lecture);
      console.log(lecture);
    } catch(e) {

    }

    console.log(data);
    i++;
  }
}

function getRootElement(entryInfo) {
  return $(document.getElementsByClassName(entryInfo.entryPoint)[0]).parents().eq(entryInfo.rootElementLevel)[0];
}

function getElements(root) {
  return root.getElementsByTagName('div');
}

function getTitleOfSubject(object) {
    var child = object.childNodes[1];
    if (child.innerText) {
        var title = child.innerText;
        return title.slice(0, (title.lastIndexOf() - 12));
    }
}

function getSpeakerOfLecture(object) {
    var child =  object.childNodes[3];
    return child.innerText.slice(12);
}

function getDayOfWeek(object) {
  return object.childNodes[3].innerText;
}

function getLocation(object) {
  return object.childNodes[9].innerText;
}

















function fixDivHeight() {
    document.getElementById("rechtespalte2").style.height = "auto";
}
