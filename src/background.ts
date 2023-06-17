chrome.webNavigation.onHistoryStateUpdated.addListener(function (details) {
  const url = new URL(details.url);
  if (url.pathname.startsWith("/trending") && url.hostname === "github.com") {
    chrome.scripting.executeScript({
      target: { tabId: details.tabId },
      files: ["dist/content.js"],
    });
  }
});
