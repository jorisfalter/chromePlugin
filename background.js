// background.js

// Listener to relay messages between popup and content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "scrape_product_info") {
    // Get the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (activeTab) {
        // Execute the content script on the active tab
        chrome.scripting.executeScript(
          {
            target: { tabId: activeTab.id },
            func: scrapeProductInfo,
          },
          (injectionResults) => {
            // Send the scraped product information back to the popup
            if (injectionResults && injectionResults.length > 0) {
              sendResponse({ product: injectionResults[0].result });
            }
          }
        );
      }
    });

    // Keep the message channel open for async response
    return true;
  }
});

// Function to scrape product info on the page (to be executed in content script context)
function scrapeProductInfo() {
  const productElement = document.querySelector(".order-item__title");
  if (productElement) {
    const productTitle = productElement.getAttribute("title");
    const productId = productElement.getAttribute("id");
    return { title: productTitle, id: productId };
  } else {
    return { title: "No product found", id: "N/A" };
  }
}
