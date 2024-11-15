// src/components/CompatibilityChecker.js
import { useState } from 'react';
import './CompatibilityChecker.css';

function CompatibilityChecker() {
  const [recipe, setRecipe] = useState('');
  const [score, setScore] = useState(null);

  const handleCheck = () => {
    // Logic to calculate suitability score
    const calculatedScore = Math.random(); // Placeholder
    setScore(calculatedScore);
  };

  const getColor = (score) => {
    if (score > 0.7) return 'green';
    if (score > 0.4) return 'orange';
    return 'red';
  };

  return (
    <section className="compatibility-checker">
      <input
        type="text"
        placeholder="Enter recipe or ingredient"
        value={recipe}
        onChange={(e) => setRecipe(e.target.value)}
        className="compatibility-checker__input"
      />
      <button onClick={handleCheck} className="compatibility-checker__button">
        Check Suitability
      </button>
      {score !== null && (
        <div
          className="compatibility-checker__score"
          style={{ color: getColor(score) }}
        >
          Suitability Score: {(score * 100).toFixed(0)}%
        </div>
      )}
    </section>
  );
}

export default CompatibilityChecker;
