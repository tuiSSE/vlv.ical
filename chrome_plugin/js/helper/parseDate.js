function getDate(w, y, day) {
    var simple = new Date(y, 0, 1 + (w - 1) * 7);
    var date = simple;
    var dow = simple.getDay();
    var weekStart = simple;
    if (dow <= 4)
        weekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else
        weekStart.setDate(simple.getDate() + 8 - simple.getDay());

    switch(day) {
      case 'Montag':
        break;

      case 'Dienstag':
        date.setDate(weekStart.getDate() + 1);
        break;

      case 'Mittwoch':
        date.setDate(weekStart.getDate() + 2);
        break;

      case 'Donnerstag':
        date.setDate(weekStart.getDate() + 3);
        break;

      case 'Freitag':
        date.setDate(weekStart.getDate() + 4);
        break;

      case 'Samstag':
        date.setDate(weekStart.getDate() + 5);
        break;

      case 'Sonntag':
        date.setDate(weekStart.getDate() + 6);
        break;
        }

    return date;
}


// TODO: get week and year
function parseTime(raw, day) {
  var rawTime = raw[1].split(" ");
  var rawPeriod = raw[0].match(/[0-9]+/g).map(function(n) {
                    return +(n);
                  });
  console.log(rawPeriod[0]);
  
  var hours = [];
  hours[0] = rawTime[0].split('.');
  hours[1] = rawTime[2].split('.');

  var time =[];
  try {
    var dt = getDate(18, 2015, day);
  } catch(e) { console.log(e); }

  var year = dt.getFullYear().toString();

  var month = dt.getMonth() + 1;
  if (month < 10) {
    month = '0' + month.toString();
  }

  var date = dt.getDate().toString();

  time[0] = new String(year + month + date + 'T' + hours[0][0] + hours[0][1] + '00');
  time[1] = new String(year + month + date + 'T' + hours[1][0] + hours[1][1] + '00');

  return time;
}
