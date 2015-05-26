function injectBorders() {
    var now = new Date();
    var changed = [];
    now = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    for (var i = 0; i < subjects.length; i++) {
        var object = subjects[i];

        var rawLastUpdated = getLastUpdated(object);
        var year = rawLastUpdated.slice(6);
        var month = rawLastUpdated.slice(3, (rawLastUpdated.length - 3)) - 1;
        var day = rawLastUpdated.slice(0, rawLastUpdated.length - 6);
        var lastUpdated = new Date('20' + year, month, day);

        var twoWeeks = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 14);
        if (lastUpdated > twoWeeks) {
            object.style.border = '2px solid red';
            object.style.borderRadius = '4px';
            changed.push(getNameOfLecture(object));
        } else {
            object.style.border = '2px solid grey';
        }
    }
    
    if (changed.length <= 3) {
        for (var i = 0; i < changed.length; i++) {
            toastr.info('Es gab eine Änderung innerhalb der letzten 2 Wochen im Fach ' + changed[i], 'Änderung');
        }
    } else {
        toastr.info('Es gab eine Änderung innerhalb der letzten 2 Wochen in mehr als 3 Fächern', 'Änderung');
    }
}