import React from "react";

const AstroChart = ({ result, summaryText }) => {
  if (!result) return null;

  // Safe data extraction with fallbacks
  const houseRashis = result.house_rashis || {};
  const planetHousePositions = result.planet_house_positions || {};

  // Planet short codes for AstroSage style
  const planetCodes = {
    'Sun': 'Su',
    'Moon': 'Mo', 
    'Mars': 'Ma',
    'Mercury': 'Me',
    'Jupiter': 'Ju',
    'Venus': 'Ve',
    'Saturn': 'Sa',
    'Rahu': 'Ra',
    'Ketu': 'Ke'
  };

  // Planet colors matching AstroSage
  const planetColors = {
    'Su': '#FF6B35', // Sun - Orange Red
    'Mo': '#4ECDC4', // Moon - Teal
    'Ma': '#E74C3C', // Mars - Red
    'Me': '#2ECC71', // Mercury - Green
    'Ju': '#9B59B6', // Jupiter - Purple
    'Ve': '#F39C12', // Venus - Yellow
    'Sa': '#3498DB', // Saturn - Blue
    'Ra': '#E67E22', // Rahu - Orange
    'Ke': '#95A5A6'  // Ketu - Gray
  };

  const planetHouseMapping = {};
  const planetDegrees = {};

  // Map planets to houses and degrees with safety checks
  Object.entries(planetHousePositions).forEach(([planet, data]) => {
    if (data && typeof data === 'object' && data.house) {
      const house = data.house;
      if (!planetHouseMapping[house]) {
        planetHouseMapping[house] = [];
      }
      planetHouseMapping[house].push(planet);
      
      // Store planet degrees for display with safety checks
      if (data.degrees !== undefined && data.degrees !== null) {
        planetDegrees[planet] = {
          degrees: data.degrees,
          rashi: data.rashi || 'Unknown'
        };
      }
    }
  });

  const houseCoordinates = {
    1: { x: "100", y: "50" },
    2: { x: "54", y: "32" },
    3: { x: "32", y: "50" },
    4: { x: "54", y: "100" },
    5: { x: "20", y: "144" },
    6: { x: "54", y: "170" },
    7: { x: "100", y: "140" },
    8: { x: "144", y: "170" },
    9: { x: "170", y: "144" },
    10: { x: "144", y: "100" },
    11: { x: "170", y: "50" },
    12: { x: "144", y: "32" },
  };

  // Generate comprehensive astrological data tables
  const generatePlanetAnalysisTable = () => {
    // Get planets data from result
    const planetsData = result.planets || {};
    
    return Object.entries(planetHousePositions).map(([planet, houseData]) => {
      const planetCode = planetCodes[planet] || planet.substring(0, 2);
      const strengths = {
        'Sun': ['Charisma', 'Leadership', 'Creativity', 'Vitality'],
        'Moon': ['Emotions', 'Intuition', 'Nurturing', 'Mental Strength'],
        'Mars': ['Energy', 'Courage', 'Action', 'Assertiveness'],
        'Mercury': ['Communication', 'Intelligence', 'Adaptability', 'Learning'],
        'Jupiter': ['Wisdom', 'Growth', 'Prosperity', 'Expansion'],
        'Venus': ['Love', 'Beauty', 'Harmony', 'Artistic Expression'],
        'Saturn': ['Discipline', 'Persistence', 'Structure', 'Long-term Vision'],
        'Rahu': ['Innovation', 'Technology', 'Spirituality', 'Transformation'],
        'Ketu': ['Spirituality', 'Introspection', 'Liberation', 'Meditation']
      };
      
      // Get planet data from the planets section
      const planetData = planetsData[planet] || {};
      
      return {
        planet,
        code: planetCode,
        color: planetColors[planetCode] || '#2C3E50',
        house: houseData.house || 'N/A',
        rashi: planetData.rashi || 'Unknown',
        degrees: planetData.degrees || 'N/A',
        strengths: strengths[planet] || ['General Influence'],
        significances: [
          `Ruling ${houseData.house ? ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'][houseData.house - 1] : 'Unknown'} house matters`,
          `Governs ${planetData.rashi || 'unknown sign'} characteristics`,
          `Position: ${planetData.degrees || 'N/A'} degrees`
        ]
      };
    });
  };

  const generateHouseAnalysisTable = () => {
    const houseMeanings = {
      1: 'Personality, Physical Body, General Fortunes',
      2: 'Wealth, Family, Food, Speech',
      3: 'Courage, Siblings, Communication, Initiative',
      4: 'Mother, Home, Property, Emotional Security',
      5: 'Children, Education, Romance, Creativity',
      6: 'Health, Enemies, Legal Matters, Service',
      7: 'Marriage, Partnership, Business, Spouse',
      8: 'Longevity, Transformation, Secrets, Inheritance',
      9: 'Luck, Religion, Father, Higher Learning',
      10: 'Career, Reputation, Authority, Public Life',
      11: 'Gains, Friends, Hopes, Ambitions',
      12: 'Loss, Expenses, Spirituality, Foreign Matters'
    };
    
    return Object.entries(houseCoordinates).map(([house, coords]) => ({
      house: parseInt(house),
      rashi: houseRashis[house] || 'Unknown',
      meaning: houseMeanings[house] || 'General Life Matters',
      planets: planetHouseMapping[house] || [],
      strength: planetHouseMapping[house]?.length > 0 ? 'Strong' : 'Neutral',
      influence: planetHouseMapping[house]?.length > 1 ? 'Multiple Planetary Influence' : 'Single Planetary Influence'
    }));
  };

  const planetAnalysisData = generatePlanetAnalysisTable();
  const houseAnalysisData = generateHouseAnalysisTable();

  return (
    <div className="w-full">
      {/* Chart Container - Centered and Large */}
      <div className="flex justify-center mb-8">
        <div className="w-full max-w-5xl bg-white rounded-xl shadow-xl p-8 border-2 border-blue-200">
          <div className="flex flex-col lg:flex-row gap-8 justify-center">
            {/* Lagna Chart (D1) */}
            <div className="flex-1">
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Lagna Chart (D1)</h3>
              </div>
              <svg 
                viewBox="0 0 200 200" 
                className="w-full h-auto max-w-lg mx-auto" 
                style={{ aspectRatio: "1" }}
              >
                {/* Outer Square */}
                <rect x="10" y="10" width="180" height="180" fill="none" stroke="#2C3E50" strokeWidth="2" />
                
                {/* Diamond Inside */}
                <polygon points="100,10 190,100 100,190 10,100" fill="none" stroke="#2C3E50" strokeWidth="2" />
                
                {/* Rotated Cross */}
                <line x1="10" y1="10" x2="190" y2="190" stroke="#2C3E50" strokeWidth="1.5" />
                <line x1="10" y1="190" x2="190" y2="10" stroke="#2C3E50" strokeWidth="1.5" />

                {/* House Numbers, Rashi Names, and Planet Data */}
                {Object.entries(houseCoordinates).map(([house, { x, y }]) => (
                  <g key={house}>
                    {/* House Number */}
                    <text
                      x={x}
                      y={parseFloat(y) - 16}
                      textAnchor="middle"
                      fontSize="8"
                      fill="#2C3E50"
                      fontWeight="bold"
                    >
                      {house}
                    </text>

                    {/* Rashi Name with fallback */}
                    <text
                      x={x}
                      y={parseFloat(y) - 8}
                      textAnchor="middle"
                      fontSize="6"
                      fill="#2980B9"
                      fontWeight="600"
                    >
                      {houseRashis[house] || 'Unknown'}
                    </text>

                    {/* Planet Names with degrees */}
                    {planetHouseMapping[house]?.map((planet, index) => {
                      const planetCode = planetCodes[planet] || planet.substring(0, 2);
                      const planetData = planetDegrees[planet];
                      const planetY = parseFloat(y) + (index * 12) + 8;
                      
                      return (
                        <text
                          key={planet}
                          x={x}
                          y={planetY}
                          textAnchor="middle"
                          fontSize="8"
                          fill={planetColors[planetCode] || '#2C3E50'}
                          fontWeight="bold"
                        >
                          {planetCode}
                          {planetData && planetData.degrees && (
                            <tspan fontSize="5" fontWeight="normal" fill="#555">
                              {typeof planetData.degrees === 'number' ? planetData.degrees.toFixed(1) : planetData.degrees}°
                            </tspan>
                          )}
                        </text>
                      );
                    }) || null}
                  </g>
                ))}
              </svg>
            </div>

            {/* Navamsa Chart (D9) */}
            <div className="flex-1">
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Navamsa (D9)</h3>
              </div>
              <svg 
                viewBox="0 0 200 200" 
                className="w-full h-auto max-w-lg mx-auto"
                style={{ aspectRatio: "1" }}
              >
                {/* Outer Square */}
                <rect x="10" y="10" width="180" height="180" fill="none" stroke="#8B4513" strokeWidth="2" />
                
                {/* Diamond Inside */}
                <polygon points="100,10 190,100 100,190 10,100" fill="none" stroke="#8B4513" strokeWidth="2" />
                
                {/* Rotated Cross */}
                <line x1="10" y1="10" x2="190" y2="190" stroke="#8B4513" strokeWidth="1.5" />
                <line x1="10" y1="190" x2="190" y2="10" stroke="#8B4513" strokeWidth="1.5" />

                {/* Display Navamsa data if available */}
                {Object.entries(houseCoordinates).map(([house, { x, y }]) => {
                  const navamsaRashi = result.navamsa_houses?.[house] || houseRashis[house] || 'Unknown';
                  return (
                    <g key={`navamsa-${house}`}>
                      {/* House Number */}
                      <text
                        x={x}
                        y={parseFloat(y) - 16}
                        textAnchor="middle"
                        fontSize="8"
                        fill="#8B4513"
                        fontWeight="bold"
                      >
                        {house}
                      </text>

                      {/* Navamsa Rashi */}
                      <text
                        x={x}
                        y={parseFloat(y) - 8}
                        textAnchor="middle"
                        fontSize="6"
                        fill="#A0522D"
                        fontWeight="600"
                      >
                        {navamsaRashi}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Analysis Tables - Below Chart */}
      <div className="w-full mt-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Comprehensive Astrological Analysis</h2>
          <p className="text-gray-600">Detailed breakdown of planetary positions and their influences</p>
        </div>

        {/* Detailed Planet Analysis Table */}
        <div className="mb-16 bg-white rounded-xl shadow-lg border-2 border-gray-300 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-8">
            <p className="text-purple-100 text-xl font-bold px-4 py-2 my-4">Complete planetary positions, strengths, and significances</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wider border border-gray-400">Planet</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wider border border-gray-400">Position</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wider border border-gray-400">Rashi</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wider border border-gray-400">Degrees</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wider border border-gray-400">Key Strengths</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wider border border-gray-400">Significances</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {planetAnalysisData.map((planetData, index) => (
                  <tr key={planetData.planet} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4 whitespace-nowrap border border-gray-400">
                      <div className="flex items-center">
                        <div 
                          className="w-4 h-4 rounded-full mr-3 border-2 border-gray-300"
                          style={{ backgroundColor: planetData.color }}
                        ></div>
                        <div>
                          <div className="text-base font-medium text-gray-900">{planetData.planet}</div>
                          <div className="text-sm text-gray-500">({planetData.code})</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-base text-gray-900 border border-gray-400">
                      House {planetData.house}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-base text-gray-900 border border-gray-400">
                      {planetData.rashi}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-base text-gray-900 border border-gray-400">
                      {typeof planetData.degrees === 'number' ? `${planetData.degrees.toFixed(1)}°` : planetData.degrees}
                    </td>
                    <td className="px-6 py-4 text-base text-gray-900 border border-gray-400">
                      <div className="flex flex-wrap gap-1">
                        {planetData.strengths.map((strength, idx) => (
                          <span key={idx} className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded">
                            {strength}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-base text-gray-900 border border-gray-400">
                      <div className="space-y-1">
                        {planetData.significances.map((sig, idx) => (
                          <div key={idx} className="text-sm text-gray-700">• {sig}</div>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* House Analysis Table */}
        <div className="mb-16 bg-white rounded-xl shadow-lg border-2 border-gray-300 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-8">
            <p className="text-emerald-100 text-xl font-bold px-4 py-2 my-4">Lunar house meanings and planetary influences</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wider border border-gray-400">House</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wider border border-gray-400">Rashi</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wider border border-gray-400">Meaning</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wider border border-gray-400">Planets</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wider border border-gray-400">Influence</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wider border border-gray-400">Strength</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {houseAnalysisData.map((houseData, index) => (
                  <tr key={houseData.house} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4 whitespace-nowrap border border-gray-400">
                      <div className="text-base font-bold text-gray-900">House {houseData.house}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-base text-gray-900 border border-gray-400">
                      {houseData.rashi}
                    </td>
                    <td className="px-6 py-4 text-base text-gray-900 border border-gray-400">
                      <div className="max-w-xs">{houseData.meaning}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-base text-gray-900 border border-gray-400">
                      {houseData.planets.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {houseData.planets.map((planet, idx) => {
                            const code = planetCodes[planet] || planet.substring(0, 2);
                            return (
                              <span 
                                key={idx} 
                                className="inline-block w-8 h-8 rounded-full text-white text-sm font-bold flex items-center justify-center"
                                style={{ backgroundColor: planetColors[code] || '#2C3E50' }}
                              >
                                {code}
                              </span>
                            );
                          })}
                        </div>
                      ) : (
                        <span className="text-gray-400">No planets</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-base text-gray-900 border border-gray-400">
                      {houseData.influence}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border border-gray-400">
                      <span className={`inline-flex px-3 py-2 text-sm font-semibold rounded-full ${
                        houseData.strength === 'Strong' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {houseData.strength}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Reference Table */}
        <div className="mt-16 bg-white rounded-xl shadow-lg border-2 border-gray-300 overflow-hidden">
          <div className="bg-gradient-to-r from-amber-600 to-orange-600 px-6 py-8">
            <p className="text-black text-xl font-bold px-4 py-2 my-4">Essential astrological information at a glance</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Planet Quick Info */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Planets & Their Meanings</h4>
                <div className="space-y-2">
                  {Object.entries(planetCodes).map(([fullName, code]) => (
                    <div key={fullName} className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: planetColors[code] || '#2C3E50' }}
                      ></div>
                      <span className="text-sm text-gray-700">{fullName} ({code})</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* House Categories */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3">House Categories</h4>
                <div className="space-y-2 text-sm text-gray-700">
                  <div><strong>Kendra (1,4,7,10):</strong> Cardinal houses - Personal growth</div>
                  <div><strong>Trikona (1,5,9):</strong> Trinal houses - Dharma & purpose</div>
                  <div><strong>Dusthana (6,8,12):</strong> Dust houses - Challenges & obstacles</div>
                  <div><strong>Upachaya (3,6,10,11):</strong> Growing houses - Improvement</div>
                </div>
              </div>

              {/* Planetary Strength */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Strength Indicators</h4>
                <div className="space-y-2 text-sm text-gray-700">
                  <div><strong>Exaltation:</strong> Peak strength - Maximum positive influence</div>
                  <div><strong>Moolatrikona:</strong> Own sign - Strong natural position</div>
                  <div><strong>Swakshetra:</strong> Own house - Good strength</div>
                  <div><strong>Neecha:</strong> Debilitated - Weak position</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AstroChart;