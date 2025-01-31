chrome.runtime.onMessage.addListener(function (request, sender) {
  if (request.startTheater) {
    var theater = $("#ss-theater");

    if (theater.length > 0) {
      closeTheater();
    } else {
      $("body")
        .addClass("theater-running")
        .append(
          '<div id="ss-theater"></div><div id="theater-slides-list"><a id="thumbs-list-handle"></a><ul class="slide-thumbs"></ul></div>'
        );
      var theater = $("#ss-theater");

      $("#ss-theater").load(
        chrome.runtime.getURL("ss-theater.html"),
        function () {
          var theaterHeaderContainer = $(".theater-header-container");
          var theaterContent = $("#theater-content");
          var slideshowTitle = $(".title").text();
          var authorName = $('[data-cy="author-link"]').text();
          var theaterTitle = $(".slideshare-title", "#theater-content");
          var theaterAuthor = $(".theater-author", "#theater-content");

          theaterTitle.text(slideshowTitle);
          theaterAuthor.text("by " + authorName);

          var ssLogo = chrome.runtime.getURL("/images/ss-logo.png");
          theaterHeaderContainer.append('<img src="' + ssLogo + '"/>');

          theater.show().addClass("animated fadeInUp");

          var theaterSlides = $(".vertical-slide-image");
          var slideUrls = [];
          var thumbUrls = [];

          for (var i = theaterSlides.length - 1; i >= 0; i--) {
            const srcset = theaterSlides[i].getAttribute("srcset");

            if (srcset) {
              const urls = srcset.split(",").map((item) => item.trim()); // Split and clean
              const firstUrl = urls[0].split(" ")[0]; // Get the first URL (smallest image)
              const lastUrl = urls[urls.length - 1].split(" ")[0]; // Get last URL (largest image)

              slideUrls.push(lastUrl);
              thumbUrls.push(firstUrl);
              // console.log("Largest URL:", lastUrl);
            } else {
              console.log("No url found.");
            }
          }

          console.log("Thumb URLs:", thumbUrls);

          var slidesList = $("#theater-slides");
          var thumbsListContainer = $("#theater-slides-list");
          var thumbsList = $(".slide-thumbs", "#theater-slides-list");
          totalSlides = slideUrls.length;

          for (var i = 0; i <= slideUrls.length - 1; i++) {
            slidesList.append(
              '<li id="' +
                (i + 1) +
                '"><img src="' +
                slideUrls[totalSlides - (i + 1)] +
                '"/><span class="slide-number">' +
                (i + 1) +
                "/" +
                slideUrls.length +
                "</span></li>"
            );
            thumbsList.append(
              '<li><a class="slide-thumb" href="#' +
                (i + 1) +
                '"><img src="' +
                thumbUrls[totalSlides - (i + 1)] +
                '"/></a></li>'
            );
          }

          setTimeout(function () {
            theaterContent.show().addClass("animated fadeInUp");
            thumbsListContainer.show().addClass("animated fadeInUp");
          }, 600);

          setTimeout(function () {
            $("#esc-help").show().addClass("animated fadeInRight");
          }, 1000);

          setTimeout(function () {
            thumbsListContainer.addClass("closed");
          }, 3000);

          theater.scroll(function () {
            var escHelp = $("#esc-help");
            if (theater.scrollTop() > 0) {
              escHelp.addClass("animated fadeOutRight");
            } else if (theater.scrollTop() == 0) {
              escHelp.removeClass("fadeOutRight").addClass("fadeInRight");
            }
          });

          $("#thumbs-list-handle").click(function () {
            thumbsListContainer.toggleClass("closed");
          });

          $("a.slide-thumb", "#theater-slides-list").click(function (e) {
            e.preventDefault();
            var theater = $("#ss-theater");

            var scrollId = $(this).attr("href");
            var height = $(scrollId).height();
            var slideNumber = parseInt(scrollId.match(/#([0-9]+)/)[1]);

            theater.animate(
              {
                scrollTop: (slideNumber - 1) * (height + 35),
              },
              500
            );
          });
        }
      );
    } //Else block ends

    $(document).keyup(function (e) {
      if (e.keyCode == 27) {
        closeTheater();
      }
    });

    function closeTheater() {
      var theater = $("#ss-theater");
      var thumbsListContainer = $("#theater-slides-list");

      theater.addClass("animated fadeOutDownBig");
      thumbsListContainer.addClass("animated fadeOutDownBig");
      setTimeout(function () {
        theater.remove();
        thumbsListContainer.remove();
        $("body").removeClass("theater-running");
      }, 600);
    }
  }
});
