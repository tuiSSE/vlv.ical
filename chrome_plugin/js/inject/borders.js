function injectBorders() {
    var now = new Date();
    now = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    for (var i = 0; i < subjects.length; i++) {
        var object = subjects[i];

        var rawLastUpdated = getLastUpdated(object);
        var year = rawLastUpdated.slice(6);
        var month = rawLastUpdated.slice(3, (rawLastUpdated.length - 3)) - 1;
        var day = rawLastUpdated.slice(0, rawLastUpdated.length - 6);
        var lastUpdated = new Date('20' + year, month, day);

        var twoWeeks = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 14);
        object.style.border = '2px solid #435779';

        if (lastUpdated > twoWeeks) {
        	var obj = object.childNodes[5].childNodes[3].childNodes[0].childNodes[13];
            obj.style.background = '#ea6a68';
            obj.style.color = 'white';
            obj.style.padding = "2px";
        }
    }
}