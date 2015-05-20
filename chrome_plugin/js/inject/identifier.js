function fixId() {
    var injectedIds = {};
    var name = getNameOfLecture(subjects[0]);
    try {
        injectedIds = load('injectedIds');
    } catch (e) {
        injectedIds[name] = makeid();
        save('injectedIds', injectedIds);
    }
	subjects[0].id = injectedIds[name];
}

function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 10; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}