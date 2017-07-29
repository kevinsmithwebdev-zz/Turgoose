$(document).ready(function () {

  const CAL_MSG = "Upcoming performances ...";

  var $calArea = $('#calendar-area');

  const DATE_COL = 'col-xs-2';
  const TIME_COL = 'col-xs-2';
  const LOC_COL = 'col-xs-4';
  const SUM_COL = 'col-xs-4';

  var accountStr = 'rachelturgoosemusic@gmail.com';
  var apiKey = 'AIzaSyB70OG0v_0v5jFyYue7m1cY7VZAlKoEnTQ';

  var formattedDate = ISODateString(new Date());
  var numberEvents = 10;


  var urlStr =  'https://www.googleapis.com/calendar/v3/calendars/' +
                accountStr + '/events' +
                '?singleEvents=true' +
                '&timeMin=' + formattedDate +
                '&maxResults=' + numberEvents +
                '&orderBy=startTime' +
                '&sortorder=ascending' +
                // 'items(description,end(date,dateTime),location,start(date,dateTime,time))' +
                '&key=' + apiKey;


  // add cal title

  $calArea.append('<div class="row cal-title">' + CAL_MSG + '</div>');


  // add cal header

  $calArea.append('<div class="row cal-header">' +
                    '<div class=' + DATE_COL + '>' + "Date" + "</div>" +
                    '<div class=' + TIME_COL + '>' + "Time" + "</div>" +
                    '<div class=' + LOC_COL + '>' + "Location" + "</div>" +
                    '<div class=' + SUM_COL + '>' + "Description" + "</div>" +
                  '</div>\n');


  $.getJSON(urlStr, function(data) {
    var events = data.items;

    for (var i=0; i<events.length; i++) {
      var event = parseEvent(events[i]);
      $calArea.append(calendarLine("cal-item", event.date, event.time, event.location, event.summary));
    }
    $calArea.append('<div class="cal-full-link"><a target="_blank" href="https://calendar.google.com/calendar/embed?src=rachelturgoosemusic%40gmail.com&ctz=America/Chicago">See Rachel\'s full calendar.</a></div>');

  });

  //***************************************
  //***************************************
  //***************************************

  function calendarLine(rowClass, date, time, loc, sum) {

    return '<div class="row ' + rowClass + '">\n' +
              '<div class="' + DATE_COL + '">' + date + '</div>\n' +
              '<div class="' + TIME_COL + '">' + time + '</div>\n' +
              '<div class="' + LOC_COL + '">' +
                '<a target="_blank" href="http://maps.google.com/maps?q=' +
                encodeURIComponent(loc) + '">' + loc + '</a></div>\n' +
              '<div class="' + SUM_COL + '">' + sum + '</div>\n' +
            '</div>\n';
  }


  function parseEvent(eventObj) {
    var event = {};

    const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const MOY = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    var hasTime = eventObj.start.hasOwnProperty('dateTime');
    var rawDateStr=(hasTime)?eventObj.start.dateTime:eventObj.start.date;

    var year = +rawDateStr.substring(0,4);
    var month = +rawDateStr.substring(5,7) - 1;
    var date = +rawDateStr.substring(8,10);

    var day = (new Date(year, month, date)).getDay();

    event.date = DOW[day] + ", " + MOY[month] + " " + date;

    if (hasTime)
      event.time = timeStr(+eventObj.start.dateTime.substring(11,13), +eventObj.start.dateTime.substring(14,16)) + "-"
                      + timeStr(+eventObj.end.dateTime.substring(11,13), +eventObj.end.dateTime.substring(14,16));
     else
      event.time = "";

    event.location = eventObj.location;
    event.summary = eventObj.summary;

    return event;
  }

  const timeStr = (hours, mins) => (hours%12||12) + (mins?(":"+mins):"") + (hours<12?"am":"pm");


  function ISODateString(d) {
    const pad = (n) => { return n<10 ? '0'+n : n }

    return d.getUTCFullYear()+'-'
      + pad(d.getUTCMonth()+1)+'-'
      + pad(d.getUTCDate())+'T'
      + pad(d.getUTCHours())+':'
      + pad(d.getUTCMinutes())+':'
      + pad(d.getUTCSeconds())+'Z';
  }


});
