function fixId(obj) {
    var injectedIds = {};
    var str = obj.innerText;
    var str = str.split(/[ ][B][e][s][c][h][r][e][i][b][u][n][g]/);
    var name = str[0];
    try {
        injectedIds = load('injectedIds');
        if (injectedIds[name] != undefined) {
            obj.id = injectedIds[name];
        } else {
            injectedIds[name] = makeid();
            save('injectedIds', injectedIds);
        }
        obj.id = injectedIds[name];
    } catch (e) {
        injectedIds[name] = makeid();
        save('injectedIds', injectedIds);
        obj.id = injectedIds[name];
    }
}

function fixIds(objs) {
    for (var i = 0; i < objs.length; i++) {
        if ($(objs[i]).attr('id') == undefined) {
            fixId(objs[i]);
        } 
    }
}

function makeid() {
    var text = "nr";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for( var i=0; i < 32; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}