function parseIntervall(raw) {
  if(raw[0].charAt(0) === "G" || raw[0].charAt(0) === "U") {
    return 2;
  } else {
    return 1;
  }
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
  raw[1] = raw[1] !== undefined ? raw[1] : '00.00 - 00.00';
  
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
        // create date object with moment
        if(i === 0){
          arr[arr.length] = moment().isoWeek(p).day(day).hour(hours[1][0]).minute(hours[1][1]).second(0).format('YYYYMMDD'+'T'+'HHmmss');
        }
        arr[i] = moment().isoWeek(p).day(day).hour(hours[i][0]).minute(hours[i][1]).second(0).format('YYYYMMDD'+'T'+'HHmmss');
      });
      eventSpan.push(period);
    });
    
    // assign to time var
    eventSpan.forEach(function(event) {
      time.push(event);
    });
  }

  return time;
}
