import { useState, useEffect } from 'react';
import './CompatibilityChecker.css';

function CompatibilityChecker() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState('');
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [checkedIngredients, setCheckedIngredients] = useState({});
  const [ingredientAlternatives, setIngredientAlternatives] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch list of recipes on mount
  useEffect(() => {
    fetch('http://localhost:5000/api/recipes')
      .then((response) => response.json())
      .then((data) => setRecipes(data.recipes))
      .catch((error) => console.error('Error fetching recipes:', error));
  }, []);

  // Fetch ingredients for the selected recipe
  const handleRecipeSelect = (recipe) => {
    setSelectedRecipe(recipe);
    setLoading(true);

    fetch(`http://localhost:5000/api/recipe-ingredients?recipe=${recipe}`)
      .then((response) => response.json())
      .then((data) => {
        setRecipeIngredients(data.ingredients);
        const initialChecked = data.ingredients.reduce((acc, ingredient) => {
          acc[ingredient] = true;
          return acc;
        }, {});
        setCheckedIngredients(initialChecked);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching ingredients:', error);
        setLoading(false);
      });
  };

  const handleIngredientCheck = (ingredient, isChecked) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [ingredient]: isChecked,
    }));
  };

  const handleSubmit = async () => {
    const missingIngredients = Object.keys(checkedIngredients).filter(
      (ingredient) => !checkedIngredients[ingredient]
    );

    try {
      const response = await fetch('http://localhost:5000/api/alternatives', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients: missingIngredients }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch alternatives');
      }

      const data = await response.json();
      setIngredientAlternatives(data.alternatives);
    } catch (error) {
      console.error('Error fetching alternatives:', error);
      alert('Failed to fetch ingredient alternatives. Please try again.');
    }
  };

  return (
    <section className="compatibility-checker">
      <h2>What Are You Cooking?</h2>

      <div className="recipe-select">
        <label htmlFor="recipe">Select a Recipe:</label>
        <select
          id="recipe"
          onChange={(e) => handleRecipeSelect(e.target.value)}
          value={selectedRecipe}
        >
          <option value="">-- Select a Recipe --</option>
          {recipes.map((recipe) => (
            <option key={recipe} value={recipe}>
              {recipe}
            </option>
          ))}
        </select>
      </div>

      <div className="ingredient-checklist">
        <h3>Ingredients</h3>
        {loading ? (
          <p>Loading ingredients...</p>
        ) : recipeIngredients.length > 0 ? (
          recipeIngredients.map((ingredient) => (
            <div key={ingredient} className="ingredient-item">
              <label>
                <input
                  type="checkbox"
                  checked={checkedIngredients[ingredient] || false}
                  onChange={(e) =>
                    handleIngredientCheck(ingredient, e.target.checked)
                  }
                />
                <span>{ingredient}</span>
              </label>
            </div>
          ))
        ) : (
          <p>Select a recipe to view ingredients.</p>
        )}
        <button onClick={handleSubmit} className="submit-button">
          Find Alternatives
        </button>
      </div>

      {ingredientAlternatives.length > 0 && (
        <div className="alternative-suggestions">
          <h3>Alternative Ingredients</h3>
          <div className="alternative-cards">
            {ingredientAlternatives.map((alt, index) => (
              <div key={index} className="alternative-card">
                <h4>For {alt.originalIngredient}</h4>
                <p>{alt.alternativeIngredient}</p>
                <small>{alt.description}</small>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default CompatibilityChecker;
