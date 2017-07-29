$(document).ready(function () {

  const BG_PIC_NUM = 3; // number of BG pics, named img/BGxx.jpg
  const BG_INTERVAL = 10 * 1000; // delay of BG pic switch
  const BG_FADE = 1000; // delay of BG pic fade

  var menuList = [
    { name: 'Home', file: 'index.html' },
    { name: 'Media', file: 'media.html' },
    { name: 'Gallery', file: 'gallery.html' },
    { name: 'Bio', file: 'bio.html' },
    { name: 'Teaching', file: 'teaching.html' },
    { name: 'Partners', file: 'partners.html' },
    { name: 'Contact', file: 'contact.html' }
  ];

  var footerList = ['Rachel Turgoose &copy;2017',
      '<a href="mailto:rachelturgoosemusic@gmail.com?Subject=inquiry%20from%20web%20page" target="_top">rachelturgoosemusic@gmail.com</a> ',
      '484-459-8884'];

  var pageFName = location.pathname.split('/').pop();

  var titleName = "Rachel Turgoose";
  var titleDescr = "Vocals. Woodwinds. Educator.";

  var $body = $("body");


  initNav();

  initFooter();

  addPageIdent();

//************************************
//************************************
//************************************

  function initNav() {
  // insert the nav buttons on current page
    var menuStr = '<div class="container-fluid"><div class="navbar-header">' +
          '<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">' +
          '<span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span>' +
          '</button><a class="navbar-brand" href="#">rachelturgoose.com</a></div>';
    menuStr += '<div class="collapse navbar-collapse" id="myNavbar"><ul class="nav navbar-nav">';

    for (var i = 0 ; i < menuList.length ; i++) {
      menuStr += '<li><a href="' + menuList[i].file + '">' + menuList[i].name + '</a></li>';
    }
    menuStr += "</ul></div>";

    $('nav').html(menuStr);

    // put nav button that refers to current page in different CSS class
    $('.nav.navbar-nav li a[href$="' + pageFName + '"]').parent().addClass("loco-btn");

    // disable click for nav bar link to current page
    $('.loco-btn > a').click(function(e){
      e.preventDefault();
    });
  } // initNav()

//************************************

  function initFooter() {
    // insert the footer on current page
    var footerStr = '<div class="footer-container"><hr>';

    for (var i = 0 ; i < footerList.length ; i++) {
      footerStr += '<span>' + footerList[i] + '</span>';
    }
    footerStr += '</div>';

    $('footer').html(footerStr);

  } // initFooter

//************************************

  function addPageIdent() {

    var pageIdent = menuList.find( function(item) {
      return item.file === pageFName;
    });

    $('.title-area').append("<h1 class = 'title'>" + titleName + "</h1>");
    $('.title-area').append("<h2 class = 'sub-title'>" + titleDescr + "</h2>");

    if (pageIdent && pageIdent.file && pageIdent.name!="Home") {
      $('.title').append(" - " + pageIdent.name);
    }
  } // addPageIdent

  // load first BG image (to replace low-res dummy)
  setTimeout( function() {
    $body.css('background-image', 'url("img/BG01.jpg")');
  }, 100);
  // precache images
  for (var i=1; i<=BG_PIC_NUM; i++) {
    new Image().src='img/BG' + twoDigit(i) + '.jpg';
  }

  // set BG change
  var bgNum = 2;

  setInterval( function(){
    $body.css('background-image', 'url("' + 'img/BG' + twoDigit(bgNum) + '.jpg' + '")');
    (bgNum==BG_PIC_NUM)?(bgNum=1):(bgNum++);
  }, BG_INTERVAL);

}); // document ready

function twoDigit(num) {
  return (num>=10)?num:("0"+ num);
}
