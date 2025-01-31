// chrome.runtime.onInstalled.addListener(() => {
//   console.log("Extension installed and service worker is running!");
// console.log(chrome.action);
// });

// Listen for browser action (now called action) clicks
chrome.action.onClicked.addListener((tab) => {
  startTheater(tab);
});

// Listen for keyboard shortcut commands
chrome.commands.onCommand.addListener((command) => {
  if (command === "toggle-ss-theater") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        startTheater(tabs[0]);
      }
    });
  }
});

// Function to start the theater mode
function startTheater(tab) {
  if (tab && tab.id) {
    chrome.tabs.sendMessage(tab.id, { startTheater: true });
  }
}
