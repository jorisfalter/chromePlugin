// Immediately invoke the function when the popup opens
(() => {
  // Send message to background script to scrape the product info
  chrome.runtime.sendMessage({ message: "scrape_product_info" }, (response) => {
    if (response && response.product) {
      console.log("Product Info Scraped:", response.product);
      document.getElementById(
        "output"
      ).textContent = `Product Title: ${response.product.title}\nProduct ID: ${response.product.id}`;
    }
  });
})();
