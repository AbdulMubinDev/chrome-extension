// Background service worker for FB Engager sidebar extension

// Set up side panel behavior - enable it for Facebook pages
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => {
    console.error("Failed to set side panel behavior:", error);
  });

// Set up side panel options for Facebook pages
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (
    changeInfo.status === "complete" &&
    tab.url &&
    tab.url.includes("facebook.com")
  ) {
    try {
      // Enable the side panel for this tab
      await chrome.sidePanel.setOptions({
        tabId: tabId,
        path: "index.html",
        enabled: true,
      });
    } catch (error) {
      console.error("Failed to enable side panel for Facebook tab:", error);
    }
  }
});

// Handle action button clicks to toggle the side panel
chrome.action.onClicked.addListener(async (tab) => {
  try {
    // Simply open the side panel - this is the most reliable approach
    // The sidePanel API handles toggling automatically
    await chrome.sidePanel.open({ tabId: tab.id });
  } catch (error) {
    console.error("Failed to open sidebar:", error);
    // Could show a notification to user here if needed
  }
});

// Note: chrome.sidePanel.onOpened and onClosed listeners are not available in current Chrome versions
// These would be used for analytics if they become available in future versions
