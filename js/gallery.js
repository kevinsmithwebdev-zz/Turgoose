// external js: masonry.pkgd.js, imagesloaded.pkgd.js

// init Masonry after all images have loaded
$(document).ready(function() {
  var proxyStr = "http://crossorigin.me/";
  var strRT = "http://www.rachelturgoose.com/img/gallery/gallery.json";

  $.getJSON(proxyStr + strRT, function( data ) {
    var html = '<div class="grid-sizer"></div>';
    var strURL = "http://www.rachelturgoose.com/img/gallery/";
    var w;
    for (var i = 0 ; i < data.length ; i++) {
      var tName = data[i].fName.substr(0, data[i].fName.lastIndexOf('.')) +
          "-tn." + data[i].fName.substr(data[i].fName.lastIndexOf('.') + 1);
      w = 200;
      html += '<div class="grid-item"><img src="' + strURL + tName +
            '"></div>\n';
    }
    $('#grid-area').html(html);

    var $grid = $('.grid').imagesLoaded( function() {
      $grid.masonry({
        itemSelector: '.grid-item',
        percentPosition: true,
        columnWidth: '.grid-sizer'
      });
    });
   }); // getJSON
}); // document ready
