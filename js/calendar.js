$(document).ready(function () {

  var iframeStr = '<iframe ' +
        'src="https://calendar.google.com/calendar/embed' +
        '?src=rachelturgoosemusic%40gmail.com' +
        '&mode=AGENDA' +
        '&bgcolor=%23ffffff' +
        '&ctz=America/Chicago" ' +
        'style="border: 0" ' +
        'width="800" ' +
        'height="400" ' +
        'frameborder="0" ' +
        'scrolling="yes"' +
        'ALLOWTRANSPARENCY="true"' +
        '></iframe>';

  $('#calendar-area').append(iframeStr);
});
