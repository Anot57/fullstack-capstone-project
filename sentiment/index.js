/*jshint esversion: 8 */
const express = require("express");
const natural = require("natural"); // Task 1: Import the library

const app = express(); // Task 2: Initialize the server

app.use(express.json());

// Task 3: Create POST /sentiment endpoint
app.post("/sentiment", (req, res) => {
  try {
    // Task 4: Extract the sentence parameter from request body
    const { sentence } = req.body;

    if (!sentence || sentence.trim() === "") {
      return res.status(400).json({ error: "Sentence parameter is required" });
    }

    // Set up the Sentiment Analyzer
    const Analyzer = natural.SentimentAnalyzer;
    const stemmer = natural.PorterStemmer;
    const analyzer = new Analyzer("English", stemmer, "afinn");

    // Analyze sentiment score
    const analysisResult = analyzer.getSentiment(sentence.split(" "));

    // Task 5: Determine sentiment based on score
    let sentiment = "neutral";
    if (analysisResult < 0) {
      sentiment = "negative";
    } else if (analysisResult > 0.33) {
      sentiment = "positive";
    }

    // Task 6: Implement success return state
    res.status(200).json({
      sentimentScore: analysisResult,
      sentiment: sentiment,
    });
  } catch (error) {
    // Task 7: Implement error return state
    console.error(error);
    res.status(500).json({
      error: "An error occurred while analyzing sentiment",
      details: error.message,
    });
  }
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Sentiment Analysis server running on port ${PORT}`);
});
