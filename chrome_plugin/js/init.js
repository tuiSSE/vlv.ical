fixDivHeight();
getLectures();

/*
 * Log the container that holds all relevant information
 */
console.log(" ");
console.log("container:");
console.log(document.getElementById("rechtespalte2"));



/**
 * The VLV has a bad layout due to a single div containing a fixed height. This function fixes this by setting height to auto like it should be.
 */
function fixDivHeight() {
    document.getElementById("rechtespalte2").style.height = "auto";
}
function getLectures() {
    var list = document.getElementsByClassName("stupla_bold");
    var i = 3;
    while (i < list.length) {
        console.log(list[i].parentNode);
        i = i + 1;
    } 
}
