// Node JS backend file
// this doesn't work

require("dotenv").config();

const express = require("express");
const axios = require("axios");
const app = express();
const PORT = 3000; // Adjust the port as necessary

// Middleware to parse JSON
app.use(express.json());

// ChatGPT API Key - Replace with your OpenAI API Key
const OPENAI_API_KEY = process.env.API_KEY;
// Route to handle the product data and send it to the ChatGPT API
app.post("/find-alternatives", async (req, res) => {
  const { productTitle, productPrice } = req.body;

  // Prepare the prompt for the GPT API
  const prompt = `I am looking for cheaper alternatives to the product "${productTitle}" which is priced at ${productPrice}. Could you suggest some alternatives?`;

  try {
    // Send the request to the OpenAI API
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
    
      {
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 100,
      },

    );

    // Send the GPT response back to the client
    res.json({ alternatives: response.data.choices[0].text });
    console.log(res.json({ alternatives: response.data.choices[0].text }));
  } catch (error) {
    console.error(
      "Error with OpenAI API:",
      error.response ? error.response.data : error.message
    );
    res
      .status(500)
      .json({ error: "Failed to fetch alternatives from ChatGPT." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
