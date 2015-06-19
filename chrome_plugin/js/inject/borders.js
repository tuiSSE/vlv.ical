function injectBorders() {
    var subjects = getRootElement().getElementsByTagName('div');
    var now = new Date();
    var changed = [];
    now = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    for (var i = 0; i < subjects.length; i++) {
        var object = subjects[i];
        object.style.border = '2px solid #435779';
    }
}