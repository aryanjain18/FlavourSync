
import CompatibilityChecker from './CompatibilityChecker';
import IngredientCarousel from './IngredientCarousel';
import FlavorIntensityDial from './FlavourIntensityDial';

function RecipeSuitabilityPage() {
  return (
    <main>
      <CompatibilityChecker />
      <IngredientCarousel />
      <FlavorIntensityDial />
    </main>
  );
}

export default RecipeSuitabilityPage;
