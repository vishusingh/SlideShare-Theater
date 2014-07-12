chrome.runtime.onMessage.addListener( function(request, sender){
  if( request.startTheater == true )
    $('html').append('<div id="ss-theater"/>');
});
