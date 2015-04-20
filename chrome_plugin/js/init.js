fixFixedHeight();


/**
 * The VLV has a bad layout due to a single tag containing a fixed height. This function fixes this by setting height to auto like it should be.
 */
function fixFixedHeight() {
    document.getElementById("rechtespalte2").style.height = "auto";
}
