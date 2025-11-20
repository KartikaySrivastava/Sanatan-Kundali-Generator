import React from "react";
import {jsPDF} from "jspdf";
import html2canvas from "html2canvas";
import { useLanguage } from "../contexts/LanguageContext";
import { translate } from "../translations/translations";
import { translateRashi, translatePlanet } from "../utils/astrologyTranslations";
import LanguageToggle from "./LanguageToggle";

const AstroChart = ({ result, summaryText }) => {
  const { language, isHindi } = useLanguage();
  
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

  // Translate planet names
  const translatePlanet = (planetName) => {
    return translate(planetName, language, planetName);
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
      
      // Translate strengths
      const translatedStrengths = (strengths[planet] || ['General Influence']).map(strength => 
        translate(strength, language, strength)
      );
      
      // Translate house matters text
      const houseNumber = houseData.house ? ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'][houseData.house - 1] : 'Unknown';
      const translatedHouseNumber = translate(houseNumber, language, houseNumber);
      
      // Translate other terms
      const rulingText = `${translate('Ruling', language, 'Ruling')} ${translatedHouseNumber} ${translate('house matters', language, 'house matters')}`;
      const governsText = `${translate('Governs', language, 'Governs')} ${translateRashi(planetData.rashi || 'unknown sign', language)} ${translate('characteristics', language, 'characteristics')}`;
      const positionText = `${translate('Position:', language, 'Position:')} ${planetData.degrees || 'N/A'} ${translate('degrees', language, 'degrees')}`;
      
      return {
        planet,
        code: planetCode,
        color: planetColors[planetCode] || '#2C3E50',
        house: houseData.house || 'N/A',
        rashi: translateRashi(planetData.rashi || 'Unknown', language),
        degrees: planetData.degrees || 'N/A',
        strengths: translatedStrengths,
        significances: [rulingText, governsText, positionText]
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
      rashi: translateRashi(houseRashis[house] || 'Unknown'),
      meaning: translate(houseMeanings[house] || 'General Life Matters', language, houseMeanings[house] || 'General Life Matters'),
      planets: planetHouseMapping[house] || [],
      strength: translate(planetHouseMapping[house]?.length > 0 ? 'Strong' : 'Neutral', language, planetHouseMapping[house]?.length > 0 ? 'Strong' : 'Neutral'),
      influence: translate(planetHouseMapping[house]?.length > 1 ? 'Multiple Planetary Influence' : 'Single Planetary Influence', language, planetHouseMapping[house]?.length > 1 ? 'Multiple Planetary Influence' : 'Single Planetary Influence')
    }));
  };

  const planetAnalysisData = generatePlanetAnalysisTable();
  const houseAnalysisData = generateHouseAnalysisTable();

  const downloadPDF = async () => {
    // Capture the entire report (chart + analysis) for comprehensive PDF
    const completeReportElement = document.getElementById('complete-report-section');
    const analysisElement = document.getElementById('analysis-section');
    
    if (!completeReportElement) return;

    try {
      // Show loading state
      const loadingText = document.createElement('div');
      loadingText.innerHTML = 'Generating PDF...';
      loadingText.style.position = 'fixed';
      loadingText.style.top = '50%';
      loadingText.style.left = '50%';
      loadingText.style.transform = 'translate(-50%, -50%)';
      loadingText.style.backgroundColor = '#4F46E5';
      loadingText.style.color = 'white';
      loadingText.style.padding = '20px';
      loadingText.style.borderRadius = '8px';
      loadingText.style.zIndex = '10000';
      loadingText.style.fontSize = '18px';
      loadingText.style.fontWeight = 'bold';
      document.body.appendChild(loadingText);

      // Create a temporary container to combine chart, analysis, and text summary for PDF
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-9999px';
      tempContainer.style.top = '0';
      tempContainer.style.width = '1200px';
      tempContainer.style.backgroundColor = '#ffffff';
      tempContainer.style.padding = '20px';
      tempContainer.style.fontFamily = 'Arial, sans-serif';
      
      // Clone chart section
      const chartClone = completeReportElement.cloneNode(true);
      tempContainer.appendChild(chartClone);
      
      // Add text summary if available
      if (summaryText) {
        const summaryDiv = document.createElement('div');
        summaryDiv.style.marginTop = '30px';
        summaryDiv.style.padding = '20px';
        summaryDiv.style.backgroundColor = '#f8f9fa';
        summaryDiv.style.border = '1px solid #dee2e6';
        summaryDiv.style.borderRadius = '8px';
        
        const summaryTitle = document.createElement('h2');
        summaryTitle.textContent = 'Comprehensive Analysis Summary';
        summaryTitle.style.color = '#2c3e50';
        summaryTitle.style.marginBottom = '15px';
        summaryTitle.style.fontSize = '18px';
        summaryTitle.style.fontWeight = 'bold';
        
        const summaryContent = document.createElement('pre');
        summaryContent.textContent = summaryText;
        
        // If in Hindi mode, try to translate common Rashi names in summary
        if (isHindi && summaryText) {
          let translatedSummary = summaryText;
          // Translate common Rashi names in the summary
          Object.entries(planetCodes).forEach(([englishName, code]) => {
            const hindiName = translate(englishName, language, englishName);
            if (hindiName !== englishName) {
              const regex = new RegExp(`\\b${englishName}\\b`, 'gi');
              translatedSummary = translatedSummary.replace(regex, hindiName);
            }
          });
          summaryContent.textContent = translatedSummary;
        }
        summaryContent.style.whiteSpace = 'pre-wrap';
        summaryContent.style.fontFamily = 'monospace';
        summaryContent.style.fontSize = '12px';
        summaryContent.style.lineHeight = '1.4';
        summaryContent.style.color = '#34495e';
        
        summaryDiv.appendChild(summaryTitle);
        summaryDiv.appendChild(summaryContent);
        tempContainer.appendChild(summaryDiv);
      }
      
      // Clone analysis section if available
      const analysisClone = analysisElement ? analysisElement.cloneNode(true) : null;
      if (analysisClone) {
        tempContainer.appendChild(analysisClone);
      }
      
      document.body.appendChild(tempContainer);
      
      // Capture the combined content as canvas
      const canvas = await html2canvas(tempContainer, {
        scale: 1.5,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 1200,
        height: tempContainer.scrollHeight
      });
      
      // Clean up temporary container
      document.body.removeChild(tempContainer);

      // Create PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // Calculate dimensions to fit on A4
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      // Add title page
      pdf.setFontSize(20);
      pdf.setTextColor(76, 77, 79);
      pdf.text('Astrological Chart Report', 105, 30, { align: 'center' });
      
      pdf.setFontSize(12);
      pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, 45, { align: 'center' });
      
      if (result.name) {
        pdf.text(`Name: ${result.name}`, 105, 55, { align: 'center' });
      }
      if (result.birth_date) {
        pdf.text(`Birth Date: ${result.birth_date}`, 105, 65, { align: 'center' });
      }
      if (result.birth_time) {
        pdf.text(`Birth Time: ${result.birth_time}`, 105, 75, { align: 'center' });
      }
      if (result.birth_place) {
        pdf.text(`Birth Place: ${result.birth_place}`, 105, 85, { align: 'center' });
      }

      // Add new page for chart
      pdf.addPage();
      position = 0;

      // Add the chart image
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add remaining pages if content is longer than one page
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Save the PDF
      const fileName = `complete-astrology-report-${result.name || 'report'}-${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);

      // Remove loading text
      document.body.removeChild(loadingText);

    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
      // Remove loading text if it exists
      const loadingText = document.querySelector('[innerHTML="Generating PDF..."]');
      if (loadingText) {
        document.body.removeChild(loadingText);
      }
    }
  };

  return (
    <div className="w-full">
      {/* Language Toggle and Download PDF Button */}
      <div className="flex justify-center items-center gap-4 mb-6">
        <LanguageToggle />
        <button
          onClick={downloadPDF}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          {translate('Download PDF Report', language)}
        </button>
      </div>
      {/* Chart Container - Centered and Large */}
      <div className="flex justify-center mb-8">
        <div id="complete-report-section" className="w-full max-w-5xl bg-white rounded-xl shadow-xl p-8 border-2 border-blue-200">
          <div className="flex flex-col lg:flex-row gap-8 justify-center">
            {/* Lagna Chart (D1) */}
            <div className="flex-1">
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">{translate('Lagna Chart (D1)', language)}</h3>
              </div>
              <svg
                viewBox="0 0 200 200"
                className="w-[300px] h-[300px] mx-auto"
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
                      {translateRashi(houseRashis[house] || 'Unknown')}
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
                <h3 className="text-xl font-bold text-gray-800">{translate('Navamsa (D9)', language)}</h3>
              </div>
              <svg
                viewBox="0 0 200 200"
                className="w-[300px] h-[300px] mx-auto"
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
                  const navamsaRashi = translateRashi(result.navamsa_houses?.[house] || houseRashis[house] || 'Unknown');
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
      <div className="w-full mt-12" id="analysis-section">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{translate('Comprehensive Astrological Analysis', language)}</h2>
          <p className="text-gray-600">{translate('Detailed breakdown of planetary positions and their influences', language)}</p>
        </div>

        {/* Detailed Planet Analysis Table */}
        <div className="mb-16 bg-white rounded-xl shadow-lg border-2 border-gray-300 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-8">
            <p className="text-purple-100 text-xl font-bold px-4 py-2 my-4">{translate('Complete planetary positions, strengths, and significances', language)}</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wider border border-gray-400">{translate('Planet', language)}</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wider border border-gray-400">{translate('Position', language)}</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wider border border-gray-400">{translate('Rashi', language)}</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wider border border-gray-400">{translate('Degrees', language)}</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wider border border-gray-400">{translate('Key Strengths', language)}</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wider border border-gray-400">{translate('Significances', language)}</th>
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
                          <div className="text-base font-medium text-gray-900">{translatePlanet(planetData.planet)}</div>
                          <div className="text-sm text-gray-500">({planetData.code})</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-base text-gray-900 border border-gray-400">
                      {translate('House', language)} {planetData.house}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-base text-gray-900 border border-gray-400">
                      {translateRashi(planetData.rashi || 'Unknown', language)}
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
            <p className="text-emerald-100 text-xl font-bold px-4 py-2 my-4">{translate('Lunar house meanings and planetary influences', language)}</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wider border border-gray-400">{translate('House', language)}</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wider border border-gray-400">{translate('Rashi', language)}</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wider border border-gray-400">{translate('Meaning', language)}</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wider border border-gray-400">{translate('Planets', language)}</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wider border border-gray-400">{translate('Influence', language)}</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wider border border-gray-400">{translate('Strength', language)}</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {houseAnalysisData.map((houseData, index) => (
                  <tr key={houseData.house} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4 whitespace-nowrap border border-gray-400">
                      <div className="text-base font-bold text-gray-900">{translate('House', language)} {houseData.house}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-base text-gray-900 border border-gray-400">
                      {translateRashi(houseData.rashi || 'Unknown', language)}
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
                        <span className="text-gray-400">{translate('No planets', language)}</span>
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
            <p className="text-black text-xl font-bold px-4 py-2 my-4">{translate('Essential astrological information at a glance', language)}</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Planet Quick Info */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3">{translate('Planets & Their Meanings', language)}</h4>
                <div className="space-y-2">
                  {Object.entries(planetCodes).map(([fullName, code]) => (
                    <div key={fullName} className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: planetColors[code] || '#2C3E50' }}
                      ></div>
                      <span className="text-sm text-gray-700">{translatePlanet(fullName)} ({code})</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* House Categories */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3">{translate('House Categories', language)}</h4>
                <div className="space-y-2 text-sm text-gray-700">
                  <div><strong>{translate('Kendra (1,4,7,10):', language)}</strong> {translate('Cardinal houses - Personal growth', language)}</div>
                  <div><strong>{translate('Trikona (1,5,9):', language)}</strong> {translate('Trinal houses - Dharma & purpose', language)}</div>
                  <div><strong>{translate('Dusthana (6,8,12):', language)}</strong> {translate('Dust houses - Challenges & obstacles', language)}</div>
                  <div><strong>{translate('Upachaya (3,6,10,11):', language)}</strong> {translate('Growing houses - Improvement', language)}</div>
                </div>
              </div>

              {/* Planetary Strength */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3">{translate('Strength Indicators', language)}</h4>
                <div className="space-y-2 text-sm text-gray-700">
                  <div><strong>{translate('Exaltation:', language)}</strong> {translate('Peak strength - Maximum positive influence', language)}</div>
                  <div><strong>{translate('Moolatrikona:', language)}</strong> {translate('Own sign - Strong natural position', language)}</div>
                  <div><strong>{translate('Swakshetra:', language)}</strong> {translate('Own house - Good strength', language)}</div>
                  <div><strong>{translate('Neecha:', language)}</strong> {translate('Debilitated - Weak position', language)}</div>
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