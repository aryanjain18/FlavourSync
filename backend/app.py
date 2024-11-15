from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

# Mock data: Recipes and their ingredients
recipes_data = {
    'Pancakes': ['flour', 'sugar', 'butter', 'eggs', 'milk'],
    'Omelette': ['eggs', 'milk', 'salt', 'pepper'],
    'Salad': ['lettuce', 'tomato', 'cucumber', 'olive oil', 'lemon'],
}

# Alternative ingredients for substitutions
alternative_ingredients = {
    'flour': ['Almond Flour', 'Coconut Flour', 'Oat Flour'],
    'sugar': ['Honey', 'Maple Syrup', 'Agave Nectar'],
    'butter': ['Coconut Oil', 'Olive Oil', 'Ghee'],
    'eggs': ['Applesauce', 'Flaxseed Meal', 'Chia Seeds'],
    'milk': ['Almond Milk', 'Soy Milk', 'Oat Milk'],
    'salt': ['Sea Salt', 'Soy Sauce'],
}

# Endpoint to get the list of recipes
@app.route('/api/recipes', methods=['GET'])
def get_recipes():
    return jsonify({'recipes': list(recipes_data.keys())})

# Endpoint to get ingredients for a specific recipe
@app.route('/api/recipe-ingredients', methods=['GET'])
def get_recipe_ingredients():
    recipe_name = request.args.get('recipe')
    if recipe_name in recipes_data:
        return jsonify({'ingredients': recipes_data[recipe_name]})
    else:
        return jsonify({'error': 'Recipe not found'}), 404

# Endpoint to get alternatives for missing ingredients
@app.route('/api/alternatives', methods=['POST'])
def get_alternatives():
    data = request.get_json()
    ingredients = data.get('ingredients', [])
    alternatives = []

    for ingredient in ingredients:
        alt_list = alternative_ingredients.get(ingredient.lower(), ['No alternative found'])
        alternatives.append({
            'originalIngredient': ingredient,
            'alternativeIngredient': ', '.join(alt_list),
            'description': f"Alternatives for {ingredient}",
        })

    return jsonify({'alternatives': alternatives})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
