// external js: masonry.pkgd.js, imagesloaded.pkgd.js

// init Masonry after all images have loaded
$(document).ready(function() {
  var proxyStr = "http://crossorigin.me/";
  var strRT = "http://www.rachelturgoose.com/img/gallery/gallery.json";

  $.getJSON(proxyStr + strRT, function(data) {

    // set up carousel

    var myImgs = {
      list: [],
      path: 'img/gallery/',
    }


    myImgs.list=data;

    // compute pic file names thumbnails

    for (var i = 0 ; i < data.length ; i++) {
      myImgs.list[i].tName = data[i].fName.substr(0, data[i].fName.lastIndexOf('.')) +
            "-tn." + data[i].fName.substr(data[i].fName.lastIndexOf('.') + 1);
    }

    // Set up freewall grid

    var html = '<div class="grid-sizer"></div>';
    var strURL = "http://www.rachelturgoose.com/img/gallery/";
    var w;
    for (var i = 0 ; i < data.length ; i++) {
      w = 200;
      // html += '<div class="grid-item"><img src="' + strURL + myImgs.list[i].tName +
      //       '"></div>\n';
      html += '<a data-fancybox="gallery" href="' + strURL + myImgs.list[i].fName + '" data-caption="' + myImgs.list[i].caption + '"><div class="grid-item"><img src="' + strURL + myImgs.list[i].tName +
            '"></div></a>\n';
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
