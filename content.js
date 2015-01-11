chrome.runtime.onMessage.addListener( function(request, sender){
  if( request.startTheater ) {
    var theater = $('#ss-theater');

    if( theater.length > 0 ) {
      closeTheater();
    } else {
      $('body').addClass('theater-running').append('<div id="ss-theater"/><div id="theater-slides-list"><a id="thumbs-list-handle"></a><ul class="slide-thumbs"/></div>');
      var theater = $('#ss-theater');

      $('#ss-theater').load(chrome.extension.getURL('ss-theater.html'), function () {
        var theaterHeaderContainer = $('.theater-header-container');
        var theaterContent = $('#theater-content');
        var slideshowTitle = $('.title h1.slideshow-title-text').text();
        var authorName = $('.j-author-name').text();
        var theaterTitle = $('.slideshare-title', '#theater-content');
        var theaterAuthor = $('.theater-author', '#theater-content');

        theaterTitle.text(slideshowTitle);
        theaterAuthor.text('by ' + authorName);

        var ssLogo = chrome.extension.getURL('/images/ss-logo.png');
        theaterHeaderContainer.append('<img src="' + ssLogo + '"/>');

        theater.show().addClass('animated fadeInUp');

        var theaterSlides = $('.slide_image');
        var slideUrls = [];
        var thumbUrls = [];

        for (var i = theaterSlides.length - 1; i >= 0; i--) {
          slideUrls.push(theaterSlides[i].getAttribute('data-full'));
          thumbUrls.push(theaterSlides[i].getAttribute('data-normal'));
        };

        var slidesList = $('#theater-slides');
        var thumbsListContainer = $('#theater-slides-list');
        var thumbsList = $('.slide-thumbs', '#theater-slides-list');
        totalSlides = slideUrls.length;

        for (var i = 0; i <= slideUrls.length - 1; i++) {
          slidesList.append('<li id="' + (i+1) + '"><img src="' + slideUrls[totalSlides - (i+1)] + '"/><span class="slide-number">' + (i+1) + '/' + slideUrls.length +'</span></li>');
          thumbsList.append('<li><a class="slide-thumb" href="#' + (i+1) + '"><img src="' + thumbUrls[totalSlides - (i+1)] + '"/></a></li>');
        };

        setTimeout(function () {
          theaterContent.show().addClass('animated fadeInUp');
          thumbsListContainer.show().addClass('animated fadeInUp');
        }, 600);

        setTimeout(function () {
          $('#esc-help').show().addClass('animated fadeInRight');
        }, 1000);

        setTimeout(function () {
          thumbsListContainer.addClass('closed');
        }, 3000);

        theater.scroll(function(){
          var escHelp = $('#esc-help');
          if(theater.scrollTop() > 0) {
            escHelp.addClass('animated fadeOutRight');
          } else if(theater.scrollTop() == 0) {
            escHelp.removeClass('fadeOutRight').addClass('fadeInRight');
          }
        });

        $('#thumbs-list-handle').click(function() {
          thumbsListContainer.toggleClass('closed');
        })

        $('a.slide-thumb', '#theater-slides-list').click(function(e) {
          e.preventDefault();
          var theater = $('#ss-theater');

          var scrollId = $(this).attr('href');
          var height = $(scrollId).height();
          var slideNumber = parseInt(scrollId.match(/#([0-9]+)/)[1]);

          theater.animate({
            scrollTop: (slideNumber - 1) * (height + 35)
          }, 500);
        });

      });
    } //Else block ends

    $(document).keyup(function (e) {
      if (e.keyCode == 27) { closeTheater(); }
    })


    function closeTheater() {
      var theater = $('#ss-theater');
      var thumbsListContainer = $('#theater-slides-list');

      theater.addClass('animated fadeOutDownBig');
      thumbsListContainer.addClass('animated fadeOutDownBig');
      setTimeout(function() {
        theater.remove();
        thumbsListContainer.remove();
        $('body').removeClass('theater-running');
      }, 600);
    }
  }
});
