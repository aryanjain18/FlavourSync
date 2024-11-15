import './UserDashboard.css';

function UserDashboard() {
  const user = {
    name: 'John Doe',
    badges: ['Spicy Adventurer', 'Sweet Tooth'],
    savedRecipes: [
      { name: 'Spicy Ramen' },
      { name: 'Chocolate Lava Cake' },
      // ... more recipes
    ],
  };

  return (
    <section className="user-dashboard">
      <h1>Welcome, {user.name}</h1>
      <h2>My Badges</h2>
      <div className="user-dashboard__badges">
        {user.badges.map((badge, index) => (
          <div key={index} className="user-dashboard__badge">
            {badge}
          </div>
        ))}
      </div>
      <h2>Saved Recipes</h2>
      <ul className="user-dashboard__recipes">
        {user.savedRecipes.map((recipe, index) => (
          <li key={index}>{recipe.name}</li>
        ))}
      </ul>
      {/* Community features would be added here */}
    </section>
  );
}

export default UserDashboard;
