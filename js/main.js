$(document).ready(function () {
  var menuList = [
      { name: 'Home', file: 'index.html' },
      { name: 'Media', file: 'media.html' },
      { name: 'Gallery', file: 'gallery.html' },
      { name: 'Bio', file: 'bio.html' },
      // { name: 'Press Kit', file: 'presskit.html' },
      { name: 'Teaching', file: 'teaching.html' },
      { name: 'Partners', file: 'partners.html' },
      { name: 'Contact', file: 'contact.html' }
    ];

  var footerList = ['Rachel Turgoose &copy;2017',
        '<a href="mailto:rachelturgoosemusic@gmail.com?Subject=inquiry%20from%20web%20page" target="_top">rachelturgoosemusic@gmail.com</a> ',
        '484-459-8884'];

  pageFName = window.location.pathname.split('/').pop();

  var titleName = "Rachel Turgoose";
  var titleDescr = "Vocals. Woodwinds. Educator.";

  initNav();

  initFooter();

  addPageIdent();

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

  function initFooter() {
      // insert the footer on current page

      var footerStr = '<div class="footer-container"><hr>';
      for (var i = 0 ; i < footerList.length ; i++) {
        footerStr += '<span>' + footerList[i] + '</span>';
      }

      footerStr += '</div>';
      $('footer').html(footerStr);
    }

  function addPageIdent() {
    var pageIdent = menuList.find( function(item) {
      return item.file === pageFName;
      });

    $('.title-area').append("<span class = 'title'>" + titleName + "</span>");
    $('.title-area').append("<span class = 'sub-title'>" + titleDescr + "</span>");

    if (pageIdent.name !== 'Home') {
      $('title').append(" - " + pageIdent.name);
      $('.title').append(" - " + pageIdent.name);
    }

  }

  var bgNum = 1;

  setInterval( function(){
      (bgNum==4)?(bgNum=1):(bgNum++);
      $('body').css('background-image', 'url(' + 'img/BG' + bgNum + '.jpg' + ')');
    }, 5000);



});
