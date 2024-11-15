import './MoodWheel.css';

function MoodWheel() {
  const moods = [
    { name: 'Energetic', angle: 22.5, icon: '⚡' },
    { name: 'Comforting', angle: 67.5, icon: '🛋️' },
    { name: 'Romantic', angle: 112.5, icon: '❤️' },
    { name: 'Adventurous', angle: 157.5, icon: '🧭' },
    { name: 'Relaxed', angle: 202.5, icon: '🌿' },
    { name: 'Focused', angle: 247.5, icon: '🎯' },
    { name: 'Cheerful', angle: 292.5, icon: '😊' },
    { name: 'Creative', angle: 337.5, icon: '🎨' },
  ];

  const handleMoodClick = (mood) => {
    alert(`You selected: ${mood}`);
  };

  return (
    <div className="mood-wheel-container">
      <div className="mood-wheel">
        <div className="mood-wheel__center">
          {moods.map((mood, index) => (
            <div
              key={index}
              className="mood-wheel__option"
              style={{
                transform: `rotate(${mood.angle}deg) translate(130px) rotate(-${mood.angle}deg)`,
              }}
            >
              <button
                className="mood-wheel__button"
                onClick={() => handleMoodClick(mood.name)}
                aria-label={mood.name}
              >
                <span className="mood-wheel__icon">{mood.icon}</span>
                <span className="mood-wheel__text">{mood.name}</span>
              </button>
            </div>
          ))}
        </div>
        <div className="mood-wheel__dividers">
          {moods.map((_, index) => (
            <div
              key={index}
              className="mood-wheel__divider"
              style={{
                transform: `rotate(${index * 45}deg)`,
              }}
            />
          ))}
        </div>
      </div>
      <div className="mood-wheel__label">How are you feeling today?</div>
    </div>
  );
}

export default MoodWheel;
