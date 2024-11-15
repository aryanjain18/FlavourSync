// src/components/CountryCultureSelector.js
import  { useState } from 'react';
import './CountryCultureSelector.css';
import japanImage from '../assets/japan.jpg';
import medievalImage from '../assets/medieval.jpg';
import italyImage from '../assets/italy.jpg';

function CountryCultureSelector() {
  const [selected, setSelected] = useState(null);
  const options = [
    { name: 'Japanese Kaiseki', image: japanImage },
    { name: 'Medieval Europe', image: medievalImage },
    { name: 'Italian Renaissance', image: italyImage },
  ];

  const handleSelect = (option) => {
    setSelected(option);
    // Additional logic to update background or fetch data
  };

  return (
    <section className="country-culture-selector">
      {options.map((option, index) => (
        <div
          key={index}
          className="country-culture-selector__option"
          onClick={() => handleSelect(option)}
          style={{
            backgroundImage: `url(${option.image})`,
          }}
        >
          <div className="country-culture-selector__overlay">
            <h3>{option.name}</h3>
          </div>
        </div>
      ))}
    </section>
  );
}

export default CountryCultureSelector;
