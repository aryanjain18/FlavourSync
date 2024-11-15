
import './IngredientCarousel.css';

function IngredientCarousel() {
  const alternatives = [
    {
      name: 'Quinoa',
      description: 'An ancient grain from the Andes',
    },
    {
      name: 'Amaranth',
      description: 'A nutritious grain used by the Aztecs',
    },
    // ... more ingredients
  ];

  return (
    <section className="ingredient-carousel">
      {alternatives.map((ingredient, index) => (
        <div key={index} className="ingredient-carousel__card">
          <h3>{ingredient.name}</h3>
          <p>{ingredient.description}</p>
        </div>
      ))}
    </section>
  );
}

export default IngredientCarousel;
