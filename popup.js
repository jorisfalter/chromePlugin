document.getElementById("scrapeProduct").addEventListener("click", () => {
  // Send message to background script to scrape the product info
  chrome.runtime.sendMessage({ message: "scrape_product_info" }, (response) => {
    if (response && response.product) {
      // Display the scraped product information
      const output = document.getElementById("output");
      output.textContent = `Product Title: ${response.product.title}\nProduct ID: ${response.product.id}`;

      // Display the server's response
      if (response.serverResponse) {
        output.textContent += `\nServer Response: ${JSON.stringify(
          response.serverResponse
        )}`;
      }
    }
  });
});
