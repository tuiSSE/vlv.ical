var entryInfo = {
    entryPoint: "stupla_bold",
    skip: 3
}

fixDivHeight();
console.log(parse(getSubjects(entryInfo)));

/*
 * Log the container that holds all relevant information
 */
console.log(" ");
console.log("container:");
console.log(document.getElementById("rechtespalte2"));

/*
 * The VLV has a bad layout due to a single div containing a fixed height. This function fixes this by setting height to auto like it should be.
 */
function fixDivHeight() {
    document.getElementById("rechtespalte2").style.height = "auto";
}

/*
 * Returns an array of all courses shown on the current page.
 */
function getSubjects(entryInfo) {
    var list = document.getElementsByClassName(entryInfo.entryPoint);
    var subjects = [];
    var i = entryInfo.skip;
    while (i < list.length) {
        subjects.push(list[i].parentNode);
        i = i + 1;
    }
    return subjects;
}

/*
 * Returns an array of lectures containing all relevant information about that lecture
 */
function parse(rawSubjects) {
    var subjects = [];
    var titles = [];
    var speaker = [];

    for (item in rawSubjects) {
        var subject = rawSubjects[item];
        titles.push(getTitleOfSubject(subject));
        speaker.push(getSpeakerOfLecture(subject));
    }

    var i = 0;
    while (i < rawSubjects.length) {
        var item = rawSubjects[i];
        var data = {
            name: "",
            speaker: "",
            lecture: {
                dayOfWeek: "",
                weekOfYear: "",
                time: "",
                location: "",
                targetGroup: "",
                lastUpdated: ""
            },
            lesson: {
                dayOfWeek: "",
                weekOfYear: "",
                time: "",
                location: "",
                targetGroup: "",
                lastUpdated: ""
            }
        };

        data.name = getTitleOfSubject(item);
        data.speaker = getSpeakerOfLecture(item);
        

        subjects.push(data);
        i = i + 1;
    }
    return subjects;
}

/*
 * Returns the name of a lecture
 */
function getTitleOfSubject(subject) {
    var child = subject.childNodes[1];
    if (child.innerText) {
        var title = child.innerText;
        return title.slice(0, (title.lastIndexOf() - 12));
    }
}

/*
 * Returns the speaker of a lecture
 */
function getSpeakerOfLecture(subject) {
    var child = subject.childNodes[3];
    return child.innerText.slice(12);
}

function getLecture(subject) {
    return subject.childNodes[5].childNodes[3];
}

function getLesson(subject) {
    return subject.childNodes[5].childNodes[4];
}
