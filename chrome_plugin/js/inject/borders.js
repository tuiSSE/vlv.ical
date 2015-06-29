function injectBorders() {
    var elements = getRootElement().getElementsByTagName('div');
    for (var i = 0; i < elements.length; i++) {
        try {
            var object = elements[i];
            object.style.border = '2px solid #435779'; 
        } catch(e) {
            console.log(e);
        }
    }
}