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


// TODO: Clean Up Code
function parseTime(raw, day) {
  var time =[];
  var hours = [], 
      date = [], 
      month = [], 
      year = [], 
      eventSpan = [];
  // Handle when no time given
  raw[1] = raw[1] === undefined ? raw[1] : '00.00 - 00.00';
  
  // RegEx to check Dates
  var dateEx = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
  
  var rawTime = raw[1].split(" ");
  hours[0] = rawTime[0].split('.');
  hours[1] = rawTime[2].split('.');
  
  
  // Check if Regular Date
  if(raw[0].match(dateEx)){
    var regularDate = moment(raw[0], "DD.MM.YYYY");
    
    // assign to time string
      year[0] = regularDate.format('YYYY');
      month[0] = regularDate.format('MM');
      date[0] = regularDate.format('DD');
      
      time[0] = new String(year[0] + month[0] + date[0] + 'T' + hours[0][0] + hours[0][1] + '00');
      time[1] = new String(year[0] + month[0] + date[0] + 'T' + hours[1][0] + hours[1][1] + '00');
  } 
  // Transform 'week of year' to Date
  else {
    var periodArr = raw[0].split(',');
    
    periodArr.forEach(function(period, idx, pArr){
      period = period.match(/[0-9]+/g).map(function(n) { return +(n); } );
      period.forEach(function(p, i, arr){
        arr[i] = moment().isoWeek(p).day(day);
      });
      eventSpan.push(period);
    });
    console.log(eventSpan);
    
    // assign to time string
      year[0] = eventSpan[0].format('YYYY');
      month[0] = eventSpan[0].format('MM');
      date[0] = eventSpan[0].format('DD');
      
      year[1] = eventSpan[eventSpan.length - 1].format('YYYY');
      month[1] = eventSpan[eventSpan.length - 1].format('MM');
      date[1] = eventSpan[eventSpan.length - 1].format('DD');
      
      time[0] = new String(year[0] + month[0] + date[0] + 'T' + hours[0][0] + hours[0][1] + '00');
      time[1] = new String(year[1] + month[1] + date[1] + 'T' + hours[1][0] + hours[1][1] + '00');
  }
 
  console.log(time);

  return time;
}
