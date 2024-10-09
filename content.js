// content.js
// function scrapeProductInfo() {
//   // Get the product element
//   const productElement = document.querySelector(".order-item__title");

//   if (productElement) {
//     // Extract the product title from the title attribute
//     const productTitle = productElement.getAttribute("title");

//     // Extract the product ID from the id attribute
//     const productId = productElement.getAttribute("id");

//     // Return the scraped product information
//     return { title: productTitle, id: productId };
//   } else {
//     return { title: "No product found", id: "N/A" };
//   }
// }

// Listen for messages from the popup or background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "scrape_product_info") {
    const productInfo = scrapeProductInfo();
    sendResponse({ product: productInfo });
  }
});
