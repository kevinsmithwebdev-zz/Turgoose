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
      heightCSL: '400px',
      heightCaptCSL: '60px',
      fadeCSL: 1000,
      delayCSL: 5000,
      counterCSL: 1, // 1-indexed
    }

    var $carouselArea = $("#carousel-area");
    var $carouselCaptArea = $("#carousel-caption-area");

    myImgs.list=data;

    // compute pic file names thumbnails

    for (var i = 0 ; i < data.length ; i++) {
      myImgs.list[i].tName = data[i].fName.substr(0, data[i].fName.lastIndexOf('.')) +
            "-tn." + data[i].fName.substr(data[i].fName.lastIndexOf('.') + 1);
    }

    // put pics in carousel

    for (var i = 0 ; i < myImgs.list.length ; i++) {
      $carouselArea.append('<img class = "transparent carousel center" src="' + myImgs.path +
          myImgs.list[i].tName + '" alt="picture" height="' + myImgs.heightCSL + '">');
    }

    $carouselArea.height(myImgs.heightCSL);
    $carouselCaptArea.height(myImgs.heightCaptCSL);

    var interval;

    // set delay for images
    function startCSL() { interval = setInterval(showImage, myImgs.delayCSL ); }
    function pauseCSL() { clearInterval(interval); }

    function showImage() {

      $("#carousel-area img:nth-child(" + myImgs.counterCSL +
          ")").fadeTo(myImgs.fadeCSL, 1 );
      $carouselCaptArea.hide().html("<h4>" + myImgs.list[myImgs.counterCSL-1].caption +
           "</h4>").fadeIn(myImgs.fadeCSL);
      if (myImgs.counterCSL > 1) {
        $("#carousel-area img:nth-child(" + (myImgs.counterCSL-1) +
            ")").fadeTo( myImgs.fadeCSL, 0 );
      } else {
        $("#carousel-area img:nth-child(" + myImgs.list.length +
            ")").fadeTo(myImgs.fadeCSL, 0 );;
      }
      if (++myImgs.counterCSL > myImgs.list.length) {
        myImgs.counterCSL = 1;
      }
    }  // showImage()

    $carouselArea.on('mouseenter', pauseCSL).on('mouseleave', startCSL);

    showImage();

    startCSL();

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
