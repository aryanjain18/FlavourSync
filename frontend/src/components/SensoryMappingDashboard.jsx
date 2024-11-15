// src/components/SensoryMappingDashboard.js
import { useState } from 'react';
import './SensoryMappingDashboard.css';

function SensoryMappingDashboard() {
  const [settings, setSettings] = useState({
    sweetness: 50,
    spiciness: 50,
    ambiance: 'Neutral',
  });

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
    // Logic to update sensory previews
  };

  return (
    <section className="sensory-mapping-dashboard">
      <h2>Sensory Experience Designer</h2>
      <div className="sensory-mapping-dashboard__control">
        <label>Sweetness:</label>
        <input
          type="range"
          name="sweetness"
          min="0"
          max="100"
          value={settings.sweetness}
          onChange={handleChange}
        />
        <span>{settings.sweetness}%</span>
      </div>
      <div className="sensory-mapping-dashboard__control">
        <label>Spiciness:</label>
        <input
          type="range"
          name="spiciness"
          min="0"
          max="100"
          value={settings.spiciness}
          onChange={handleChange}
        />
        <span>{settings.spiciness}%</span>
      </div>
      <div className="sensory-mapping-dashboard__control">
        <label>Ambiance:</label>
        <select
          name="ambiance"
          value={settings.ambiance}
          onChange={handleChange}
        >
          <option value="Neutral">Neutral</option>
          <option value="Romantic">Romantic</option>
          <option value="Energetic">Energetic</option>
        </select>
      </div>
      {/* Preview components would go here */}
    </section>
  );
}

export default SensoryMappingDashboard;
