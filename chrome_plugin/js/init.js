var entryInfo = { 
    entryPoint : "stupla_bold",
    skip : 3
}
fixDivHeight();
parse(getLectures(entryInfo));

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
 * Returns an Array of all Lectures shown on the current page.
 */
function getLectures(entryInfo) {
    var list = document.getElementsByClassName(entryInfo.entryPoint);
    var lectures = [];
    var i = entryInfo.skip;
    while (i < list.length) {
        lectures.push(list[i].parentNode);
        i = i + 1;
    } 
    return lectures;
}

/*
 * 
 */
function parse(events) {
    var lectures = [];
    var titles = [];
    var speaker = [];
    for (item in events) {
        var event = events[item];
        lectures.push(event);
        titles.push(getTitleOfLecture(event));
        speaker.push(getSpeakerOfLecture(event));
    }
    
    var i = 0;
    while (i < events.length) {
        console.log("Name: " + titles[i]);
        console.log("Vorlesender: " + speaker[i]);
        console.log(" ");
        i = i + 1;
    }

}

function getTitleOfLecture(event) {
    var child = event.childNodes[1];
    if (child.innerText) {
        var title = child.innerText;
        return title.slice(0, (title.lastIndexOf() - 12));
    }
}

function getSpeakerOfLecture(event) {
    var child = event.childNodes[3];
    return child.innerText.slice(12);
}
