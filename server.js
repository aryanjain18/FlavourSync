// Set up a basic Express server and load environment variables.
const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4848;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// FlavourDB API Integration
// Add a route in server.js to fetch data from FlavourDB based on a given ingredient or flavor profile.
// This endpoint (/flavours/:ingredient) fetches information for a given ingredient, such as its taste profile and compatible ingredients.
app.get("/flavours/:ingredient", async (req, res) => {
    const ingredient = req.params.ingredient;
    const flavourDbUrl = `https://api.flavourdb.com/ingredient/${ingredient}`;
  
    try {
      const response = await axios.get(flavourDbUrl, {
        headers: {
          "x-api-key": process.env.FLAVOURDB_API_KEY,
        },
      });
      res.json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch data from FlavourDB" });
    }
  });

// RecipeDB API Integration
// Add another route for fetching recipe information based on specific dietary needs or ingredients.
// Here, /recipes/:query fetches recipes based on the search query (ingredient, type of cuisine, etc.).
app.get("/recipes/:query", async (req, res) => {
const query = req.params.query;
const recipeDbUrl = `https://api.recipedb.com/search?q=${query}`;

try {
    const response = await axios.get(recipeDbUrl, {
    headers: {
        "x-api-key": process.env.RECIPEDB_API_KEY,
    },
    });
    res.json(response.data);
} catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch data from RecipeDB" });
}
});

// MongoDB Connection: In server.js, connect to MongoDB using Mongoose.
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/flavourDBApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

// User Schema: Define a Mongoose schema for storing user preferences, search history, and session data.
const userSchema = new mongoose.Schema({
    username: String,
    preferences: {
      healthConditions: [String],
      favoriteCuisines: [String],
      dietaryRestrictions: [String],
    },
    searchHistory: [
      {
        query: String,
        result: mongoose.Schema.Types.Mixed,
        timestamp: { type: Date, default: Date.now },
      },
    ],
  });
  
  const User = mongoose.model("User", userSchema);

// Add routes to save user preferences and search history, and another to retrieve suggestions based on user settings.
// Save or update user preferences
app.post("/user/preferences", async (req, res) => {
    const { username, preferences } = req.body;
  
    try {
      const user = await User.findOneAndUpdate(
        { username },
        { preferences },
        { new: true, upsert: true }
      );
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update preferences" });
    }
  });
  
  // Get suggestions based on user preferences
  app.get("/user/:username/suggestions", async (req, res) => {
    const username = req.params.username;
  
    try {
      const user = await User.findOne({ username });
      if (!user) return res.status(404).json({ error: "User not found" });
  
      // Example API call based on preferences
      const cuisine = user.preferences.favoriteCuisines[0] || "Italian";
      const recipeDbUrl = `https://api.recipedb.com/search?q=${cuisine}`;
  
      const response = await axios.get(recipeDbUrl, {
        headers: { "x-api-key": process.env.RECIPEDB_API_KEY },
      });
      res.json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch suggestions" });
    }
  });

// Ingredient Alternatives & Historical Suggestions
// Now let’s add a route to retrieve alternative ingredients based on user query and suggest medieval equivalents.
app.get("/alternatives/:ingredient", async (req, res) => {
    const ingredient = req.params.ingredient;
  
    try {
      // Fetch flavor-compatible alternatives from FlavourDB
      const flavourDbUrl = `https://api.flavourdb.com/ingredient/${ingredient}/alternatives`;
      const response = await axios.get(flavourDbUrl, {
        headers: { "x-api-key": process.env.FLAVOURDB_API_KEY },
      });
  
      // Add some hardcoded medieval equivalents for specific ingredients
      const medievalSuggestions = {
        garlic: "wild garlic",
        sugar: "honey",
        butter: "lard",
      };
  
      res.json({
        alternatives: response.data,
        medieval: medievalSuggestions[ingredient] || "unknown",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch alternatives" });
    }
  });

// Sensory Mapping for Restaurant Ambience
// Set up a route to suggest sensory elements, like music or plating styles, based on food taste profiles.
app.get("/sensory/:tasteProfile", async (req, res) => {
    const tasteProfile = req.params.tasteProfile;
  
    // Define sensory elements based on taste profile
    const sensoryMap = {
      savory: { music: "jazz", plating: "minimalist", ambience: "warm lighting" },
      sweet: { music: "classical", plating: "ornate", ambience: "soft lighting" },
      spicy: { music: "upbeat", plating: "bold colors", ambience: "vibrant" },
      // Extend for other taste profiles
    };
  
    res.json(sensoryMap[tasteProfile] || "unknown");
  });  