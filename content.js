chrome.runtime.onMessage.addListener( function(request, sender){
  if( request.startTheater == true ) {
    var theater = $('#ss-theater');

    if( theater.length > 0 ) {
      theater.addClass('animated fadeOutDownBig');
      setTimeout(function() {
        theater.remove();
        $('body').removeClass('theater-running');
      }, 600);
    } else {
      $('body').addClass('theater-running').append('<div id="ss-theater"/>');
      var theater = $('#ss-theater');

      $('#ss-theater').load(chrome.extension.getURL('ss-theater.html'), function () {
        var theaterHeaderContainer = $('.theater-header-container');
        var theaterContent = $('#theater-content');
        var slideshowTitle = $('.title h1.h-slideshow-title').text();
        var theaterTitle = $('.slideshare-title', '#theater-content');

        theaterTitle.text(slideshowTitle);

        var ssLogo = chrome.extension.getURL('/images/ss-logo.png');
        theaterHeaderContainer.append('<img src="' + ssLogo + '"/>');

        theater.show().addClass('animated fadeInUp');

        var theaterSlides = $('.slide_image');
        var slideUrls = [];
        for (var i = theaterSlides.length - 1; i >= 0; i--) {
          slideUrls.push(theaterSlides[i].getAttribute('data-full'));
        };

        var slidesList = $('#theater-slides');
        totalSlides = slideUrls.length;

        for (var i = 0; i <= slideUrls.length - 1; i++) {
          slidesList.append('<li><img src="' + slideUrls[totalSlides - (i+1)] + '"/><span class="slide-number">' + (i+1) + '/' + slideUrls.length +'</span></li>');
        };

        setTimeout(function () {
          theaterContent.show().addClass('animated fadeInUp');
        }, 600);
      });
    }
  }
});
