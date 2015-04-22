fixDivHeight();
//console.log(getLectures());
var events = getLectures();
for (item in events) {
    console.log(events[item].innerText);
}


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
function getLectures() {
    var list = document.getElementsByClassName("stupla_bold");
    var lectures = [];
    var i = 3;
    while (i < list.length) {
        lectures.push(list[i].parentNode);
        i = i + 1;
    } 
    return lectures;
}
