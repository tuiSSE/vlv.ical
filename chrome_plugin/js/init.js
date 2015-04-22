var entryInfo = { 
    entryPoint : "stupla_bold",
    skip : 3
}

fixDivHeight();
parse(getCourses(entryInfo));

/*
 * Log the container that holds all relevant information
 */
console.log(" ");
console.log("container:");
console.log(document.getElementById("rechtespalte2"));

/*
 * The VLV has a bad layout due to a single div containing a fixed height. This function fixes this by setting height to auto like it should be.
 */
function fixDivHeight() {
    document.getElementById("rechtespalte2").style.height = "auto";
}

/*
 * Returns an array of all courses shown on the current page.
 */
function getCourses(entryInfo) {
    var list = document.getElementsByClassName(entryInfo.entryPoint);
    var courses = [];
    var i = entryInfo.skip;
    while (i < list.length) {
        courses.push(list[i].parentNode);
        i = i + 1;
    } 
    return courses;
}

/*
 * Returns an array of lectures containing all relevant information about that lecture
 */
function parse(rawCourses) {
    var courses = [];
    var titles = [];
    var speaker = [];
    for (item in events) {
        var event = rawCourses[item];
        titles.push(getTitleOfLecture(event));
        speaker.push(getSpeakerOfLecture(event));
    }
    
    var i = 0;
    while (i < rawCourses.length) {
        console.log("Name: " + titles[i]);
        console.log("Vorlesender: " + speaker[i]);
        console.log(" ");
        i = i + 1;
    }
    return courses;
}

/*
 * Returns the name of a lecture
 */
function getTitleOfCourse(event) {
    var child = event.childNodes[1];
    if (child.innerText) {
        var title = child.innerText;
        return title.slice(0, (title.lastIndexOf() - 12));
    }
}

/*
 * Returns the speaker of a lecture
 */
function getSpeakerOfLecture(event) {
    var child = event.childNodes[3];
    return child.innerText.slice(12);
}

function getLecture() {

}

function getLesson() {

}
