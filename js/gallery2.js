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
      winHeightCSL: '100%',
      winWidthCSL: 100,
      delayCSL: 3000,
      transitionCSL: 500, // ? used?
      counterCSL: 1, // 1-indexed
      tblHeightCSL: 300,
      colsTBL: 3
    }

    var $carouselArea = $("#carousel-area");

    myImgs.list=data;

    //

    for (var i = 0 ; i < data.length ; i++) {
      myImgs.list[i].tName = data[i].fName.substr(0, data[i].fName.lastIndexOf('.')) +
            "-tn." + data[i].fName.substr(data[i].fName.lastIndexOf('.') + 1);
    }

    for (var i = 0 ; i < myImgs.list.length ; i++) {
      $carouselArea.append('<img class = "transparenta" src="' + myImgs.path +
          myImgs.list[i].tName + '" alt="picture" height="' + myImgs.winHeight + '">')
    }

    //
    // var interval;
    //
    // // set delay for images
    // function startCSL() {
    //   interval = setInterval( showImage, myImgs.delayCSL );
    // }
    //
    // function pauseCSL() {
    //   clearInterval(interval);
    // }
    //
    // $('#carousel-area').on('mouseenter', pauseCSL).on('mouseleave', startCSL);
    //
    // showImage();
    // startCSL();

    // Set up freewall grid

    var html = '<div class="grid-sizer"></div>';
    var strURL = "http://www.rachelturgoose.com/img/gallery/";
    var w;
    for (var i = 0 ; i < data.length ; i++) {
      w = 200;
      html += '<div class="grid-item"><img src="' + strURL + myImgs.list[i].tName +
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
