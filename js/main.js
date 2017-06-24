$(document).ready(function () {
  var menuList = [
      { name: 'Home', file: 'test.html' }, //*** change back to index
      { name: 'Media', file: 'media.html' },
      { name: 'Gallery', file: 'gallery.html' },
      { name: 'Bio', file: 'bio.html' },
      // { name: 'Press Kit', file: 'presskit.html' },
      { name: 'Teaching', file: 'teaching.html' },
      // { name: 'Partners', file: 'partners.html' },
      { name: 'Contact', file: 'contact.html' }
    ];

  var footerList = ['Rachel Turgoose &copy;2017',
        '<a href="mailto:rachelturgoosemusic@gmail.com?Subject=inquiry%20from%20web%20page" target="_top">rachelturgoosemusic@gmail.com</a> ',
        '484-459-8884'];

  pageFName = window.location.pathname.split('/').pop();

  var titleName = "Rachel Turgoose";
  var titleDescr = "Vocalist. Woodwind Instrumentalist. Educator.";

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

      var footerStr = '';
      for (var i = 0 ; i < footerList.length ; i++) {
        footerStr += '<span class = "footer-element">' + footerList[i] + '</span>';
      }
      $('footer').html(footerStr);

    }

  function addPageIdent() {
    var pageIdent = menuList.find( function(item) {
      return item.file === pageFName;
      });

    $('.title-area').append("<span class = 'title'>" + titleName + "</span>");
    $('.title-area').append("<span class = 'sub-title'>" + titleDescr + "</span>");

    // if (pageIdent.name !== 'Home') {
      $('title').append(" - " + pageIdent.name);
      $('.title').append(" - " + pageIdent.name);
    // }

    // <span class = 'title'>Rachel Turgoose</span>
    // <span class = 'sub-title'>Austin Area Singer, Saxophonist, and Teacher</span>
      // page identifier on end of <title> and text title

  }
});
