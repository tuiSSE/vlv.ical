/*
 * downloads the given events. takes an array as argument an concatenates it to a string to build an vCalendar formatted .ics file
 */
function download(subjects) {
    var i;
    for (i = 0; i < subjects.length; i++) {
      var d = subjects[i];
      console.log("Name: " + getNameOfLecture(d));
      console.log("Lesende(r): " + getSpeakerOfLecture(d));
      console.log("Ort: " + getLocation(d));
      console.log("Tag der Woche: " + getDayOfWeek(d));
      console.log("Zeit: " + getTime(d));
      console.log("Zielgruppe: " + getTargetGroup(d));
      console.log(" ");
    }

}

function uid() {
  function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  }

  return(S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
}
