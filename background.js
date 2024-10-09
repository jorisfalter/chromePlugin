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
          async (injectionResults) => {
            // Send the scraped product information back to the popup
            if (injectionResults && injectionResults.length > 0) {
              const productInfo = injectionResults[0].result;

              // Send product info to an external server
              const responseFromServer = await sendProductInfoToServer(
                productInfo.title
              );

              // Return both the product info and the server's response
              sendResponse({
                product: productInfo,
                serverResponse: responseFromServer,
              });
            }
          }
        );
      }
    });

    // Keep the message channel open for async response
    return true;
  }
});

// Function to send product information to a server
async function sendProductInfoToServer(productTitle) {
  const url = "https://example.com/api/product"; // Replace with your actual URL

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productTitle }),
    });

    // Wait for the response from the server
    const data = await response.json();
    return data; // You can adjust what you return based on the server's response
  } catch (error) {
    console.error("Error sending product to server:", error);
    return { error: "Failed to send product to the server" };
  }
}
