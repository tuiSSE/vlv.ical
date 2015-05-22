function getDate(w, y, day) { // Function still needed?
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


// TODO: Get Time Span
function parseTime(raw, day) {
  var hours = [];
  var date;
  var month;
  var year;
  // RegEx to check Dates
  var dateEx = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
  
  var rawTime = raw[1].split(" ");
 
  hours[0] = rawTime[0].split('.');
  hours[1] = rawTime[2].split('.');
  
  // Check if Regular Date
  if(raw[0].match(dateEx)){
    var regularDate = moment(raw[0], "DD.MM.YYYY");
    
    // assign to time string
      year = regularDate.format('YYYY');
      month = regularDate.format('MM');
      date = regularDate.format('DD');
  } else {
    var cWeektoDate;
    var rawPeriod = raw[0].match(/[0-9]+/g)
                            .map(function(n) { return +(n); } );
    for (var i = 0; i < rawPeriod.length; i++) {
      cWeektoDate = moment().isoWeek(rawPeriod[i]);
      cWeektoDate.day(day);
    }
    // assign to time string
      year = cWeektoDate.format('YYYY');
      month = cWeektoDate.format('MM');
      date = cWeektoDate.format('DD');
  }
 
  var time =[];

  time[0] = new String(year + month + date + 'T' + hours[0][0] + hours[0][1] + '00');
  time[1] = new String(year + month + date + 'T' + hours[1][0] + hours[1][1] + '00');
  console.log(time);

  return time;
}
