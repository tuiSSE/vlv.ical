fixDivHeight();
parse();

/*
 * Log the container that holds all relevant information
 */
console.log(document.getElementById("rechtespalte2"));



/**
 * The VLV has a bad layout due to a single div containing a fixed height. This function fixes this by setting height to auto like it should be.
 */
function fixDivHeight() {
    document.getElementById("rechtespalte2").style.height = "auto";
}
function parse() {
    var list = document.getElementById("rechtespalte2").getElementsByTagName("div");
    var i = 0;
    for ( item in list ) {
        console.log(document.getElementById("rechtespalte2").children[i].id);
        i = i + 1;
    }
}
