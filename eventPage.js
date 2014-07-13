chrome.browserAction.onClicked.addListener( function (tab) {
  startTheater();
})
chrome.commands.onCommand.addListener(function(command) {
  if (command = 'start-ss-theater'){
    startTheater();
  }
});
function startTheater(){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {startTheater: true});
  });
}