function highlightUpdated() {
    var now = new Date();
    now = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var settingsPeriod = load('settings').highlightUpdatesPeriod;
    var period = new Date(now.getFullYear(), now.getMonth(), now.getDate() - settingsPeriod);

    for (var i = 0; i < subjects.length; i++) {
        var object = subjects[i];

        object.style.border = '2px solid #435779';

        try {
            for (var j = 0; j < $(object).find('tbody').length; j++){
                var tbody = $(object).find('tbody')[j];

                for (var k = 0; k < $(tbody).find('tr').length; k++){
                    var tr = $(tbody).find('tr')[k];

                    var rawLastUpdated = tr.childNodes[13].innerText.slice(13);
                    var year = rawLastUpdated.slice(6);
                    var month = rawLastUpdated.slice(3, (rawLastUpdated.length - 3)) - 1;
                    var day = rawLastUpdated.slice(0, rawLastUpdated.length - 6);
                    var lastUpdated = new Date('20' + year, month, day);

                    if (lastUpdated > period){
                    	var obj = tr.childNodes[13];

                        obj.style.background = '#ea6a68';
                        obj.style.color = 'white';
                        obj.style.padding = "2px";
                    }
                }
            }  
        } catch(e) {
            console.log("Highlighting updates failed.");
            console.log(e);
        }
    }
}