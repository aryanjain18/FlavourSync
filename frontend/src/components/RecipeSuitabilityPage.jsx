// src/pages/RecipeSuitabilityPage.js
import { useState } from 'react';
import CompatibilityChecker from '../components/CompatibilityChecker';
import IngredientCarousel from '../components/IngredientCarousel';
import FlavourIntensityDial from '../components/FlavourIntensityDial';
// import './RecipeSuitabilityPage.css'; // Uncomment this if you have styles defined for this page

function RecipeSuitabilityPage() {
  const [alternatives, setAlternatives] = useState([]);
  const [intensity, setIntensity] = useState(50); // Default flavor intensity

  // Fetch recipe ingredients from the backend
  const fetchRecipeIngredients = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/recipe-ingredients');
      const data = await response.json();
      return data.ingredients;
    } catch (error) {
      console.error('Error fetching recipe ingredients:', error);
      return [];
    }
  };

  // Fetch alternatives for missing ingredients from the backend
  const fetchAlternatives = async (missingIngredients) => {
    try {
      const response = await fetch('http://localhost:5000/api/alternatives', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients: missingIngredients }),
      });
      const data = await response.json();
      return data.alternatives;
    } catch (error) {
      console.error('Error fetching alternatives:', error);
      return [];
    }
  };

  // Handle compatibility check
  const handleCheck = async (userIngredients) => {
    const recipeIngredients = await fetchRecipeIngredients();

    // Find missing ingredients
    const missingIngredients = recipeIngredients.filter(
      (ingredient) => !userIngredients.includes(ingredient.toLowerCase()) // Ensure case-insensitivity
    );

    if (missingIngredients.length === 0) {
      alert('You have all the ingredients for the recipe!');
      setAlternatives([]);
      return;
    }

    const alternativeSuggestions = await fetchAlternatives(missingIngredients);
    setAlternatives(alternativeSuggestions);
  };

  // Handle flavor intensity adjustment
  const handleIntensityChange = (newIntensity) => {
    setIntensity(newIntensity);
    console.log(`Flavor intensity adjusted to: ${newIntensity}%`);
    // You can add logic here to adjust the alternatives or results based on intensity
  };

  return (
    <main>
      <CompatibilityChecker onCheck={handleCheck} />
      {alternatives.length > 0 && <IngredientCarousel alternatives={alternatives} />}
      <FlavourIntensityDial intensity={intensity} onIntensityChange={handleIntensityChange} />
    </main>
  );
}

export default RecipeSuitabilityPage;
