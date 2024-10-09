// Immediately invoke the function when the popup opens
(() => {
  // Send message to background script to scrape the product info
  chrome.runtime.sendMessage({ message: "scrape_product_info" }, (response) => {
    if (response && response.product) {
      // Display the scraped product information
      document.getElementById("productTitle").textContent =
        response.product.title;
      document.getElementById("productPrice").textContent =
        response.product.price;

      // Optionally, update the 'Buy Now' link based on the product
      const buyButton = document.querySelector(".buy-btn");
      buyButton.href =
        "https://example.com/buy/" + encodeURIComponent(response.product.title); // Update the URL as necessary
    }
  });
})();
