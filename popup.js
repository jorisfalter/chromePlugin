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

      // Display the product image
      const productImg = document.getElementById("productImg");
      if (response.product.imgUrl) {
        productImg.src = response.product.imgUrl;
        productImg.style.display = "block"; // Make sure the image is visible
      } else {
        productImg.style.display = "none"; // Hide image if no URL is found
      }

      // Optionally, update the 'Buy Now' link based on the product
      const buyButton = document.querySelector(".buy-btn");
      buyButton.href =
        "https://example.com/buy/" + encodeURIComponent(response.product.title); // Update the URL as necessary
    }
  });
})();

// Function to handle toggle button clicks
function handleToggleButtonClick(event) {
  // Remove 'active' class from all buttons
  document.querySelectorAll(".toggle-buttons button").forEach((button) => {
    button.classList.remove("active");
  });

  // Add 'active' class to the clicked button
  event.target.classList.add("active");

  // Update content based on the clicked button
  const contentArea = document.getElementById("contentArea");
  if (event.target.id === "fontBtn") {
    contentArea.innerHTML =
      "<h2>Font Settings</h2><p>Select your font preferences.</p>";
  } else if (event.target.id === "colorBtn") {
    contentArea.innerHTML =
      "<h2>Color Settings</h2><p>Choose your color palette.</p>";
  } else if (event.target.id === "assetsBtn") {
    contentArea.innerHTML = "<h2>Assets</h2><p>Manage your assets.</p>";
  }
}

// Add event listeners to toggle buttons
document
  .getElementById("fontBtn")
  .addEventListener("click", handleToggleButtonClick);
document
  .getElementById("colorBtn")
  .addEventListener("click", handleToggleButtonClick);
document
  .getElementById("assetsBtn")
  .addEventListener("click", handleToggleButtonClick);
