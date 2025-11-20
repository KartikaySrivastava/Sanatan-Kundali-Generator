
import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { translateRashi } from "../utils/astrologyTranslations";

const TraditionalChart = ({ result }) => {
  const { language } = useLanguage();
  
  if (!result) return null;

  const houseRashis = result.house_rashis; // Rashi names for each house
  const planetHouseMapping = {};

  // Map planets to houses
  Object.entries(result.planet_house_positions).forEach(([planet, data]) => {
    const house = data.house;
    if (!planetHouseMapping[house]) {
      planetHouseMapping[house] = [];
    }
    planetHouseMapping[house].push(planet);
  });

  const houseCoordinates = {
    1: { x: "50%", y: "25%" },
    2: { x: "27%", y: "16%" },
    3: { x: "16%", y: "25%" },
    4: { x: "27%", y: "50%" },
    5: { x: "10%", y: "72%" },
    6: { x: "27%", y: "85%" },
    7: { x: "50%", y: "70%" },
    8: { x: "72%", y: "85%" },
    9: { x: "85%", y: "72%" },
    10: { x: "72%", y: "50%" },
    11: { x: "85%", y: "25%" },
    12: { x: "72%", y: "16%" },
  };

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" style={{ maxWidth: "400px", margin: "auto" }}>
      {/* Outer Square */}
      <rect x="5" y="5" width="90" height="90" fill="none" stroke="black" strokeWidth="0.5" />
      {/* Diamond Inside */}
      <polygon points="50,5 95,50 50,95 5,50" fill="none" stroke="black" strokeWidth="0.5" />
      {/* Rotated Cross */}
      <line x1="5" y1="5" x2="95" y2="95" stroke="black" strokeWidth="0.5" />
      <line x1="5" y1="95" x2="95" y2="5" stroke="black" strokeWidth="0.5" />

      {/* House Numbers, Rashi Names, and Planet Data */}
      {Object.entries(houseCoordinates).map(([house, { x, y }]) => (
        <g key={house}>
          {/* Rashi Name (Small Text) */}
          <text
            x={x}
            y={parseFloat(y) - 4 + "%"} // Position above planets
            textAnchor="middle"
            fontSize="2" // Smaller font size for Rashi name
            fill="blue"
          >
            {translateRashi(houseRashis[house] || 'Unknown', language)}
          </text>

          {/* Planet Names (Large Text) */}
          <text
            x={x}
            y={y}
            textAnchor="middle"
            fontSize="2.5" // Larger font size for Planet names
            fill="black"
          >
            {planetHouseMapping[house]?.join(", ") || ""}
          </text>
        </g>
      ))}
    </svg>
  );
};

export default TraditionalChart;

