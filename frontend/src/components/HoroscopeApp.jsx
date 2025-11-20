
import React, { useState } from 'react';
import { useLanguage } from "../contexts/LanguageContext";
import { translateRashi } from "../utils/astrologyTranslations";
// import aries from "../assets/aries.webp";
// import taurus from "../assets/taurus.webp";
// import gemini from "../assets/gemini.webp";
// import cancer from "../assets/cancer.webp";
// import leo from '../assets/leo.webp';
// import virgo from '../assets/virgo.webp';
// import libra from '../assets/libra.webp';
// import scorpio from '../assets/scorpio.webp';
// import sagittarius from '../assets/sagittarius.webp';
// import capricorn from '../assets/capricorn.webp';
// import aquarius from '../assets/aquarius.webp';
// import pisces from '../assets/pisces.webp';


const HoroscopeApp = () => {
  const { language, isHindi } = useLanguage();
  const [selectedRashi, setSelectedRashi] = useState('');
  const [horoscopeType, setHoroscopeType] = useState('daily');

  const getDisplayName = (rashiName) => {
    if (isHindi) {
      return translateRashi(rashiName, language);
    }
    return rashiName;
  };

  const rashis = [
    { name: 'Aries', value: 'aries', logo: "" },
    { name: 'Taurus', value: 'taurus', logo: "" },
    { name: 'Gemini', value: 'gemini', logo: "" },
    { name: 'Cancer', value: 'cancer', logo: "" },
    { name: 'Leo', value: 'leo', logo: "" },
    { name: 'Virgo', value: 'virgo', logo: "" },
    { name: 'Libra', value: 'libra', logo: ""},
    { name: 'Scorpio', value: 'scorpio', logo: ""},
    { name: 'Sagittarius', value: 'sagittarius', logo: "" },
    { name: 'Capricorn', value: 'capricorn', logo: "" },
    { name: 'Aquarius', value: 'aquarius', logo: ""},
    { name: 'Pisces', value: 'pisces', logo:  ""},
  ];

  const horoscopes = {
    aries: {
      daily: {
        love: 'Open communication strengthens bonds.',
        money: 'Financial windfalls may come your way.',
        health: 'Take care of your energy levels.',
      },
      monthly: {
        love: 'Focus on personal growth in relationships.',
        money: 'Long-term planning will bring stability.',
        health: 'Consistency in fitness pays off.',
      },
    },
    taurus: {
      daily: {
        love: 'Patience will help resolve conflicts.',
        money: 'Avoid impulsive expenses.',
        health: 'Focus on mental well-being today.',
      },
      monthly: {
        love: 'A new romantic connection might blossom.',
        money: 'Budget for unexpected costs.',
        health: 'Maintain a balanced diet.',
      },
    },
    gemini: {
      daily: {
        love: 'Stay open to new conversations.',
        money: 'Investments might yield returns.',
        health: 'Physical activity will re-energize you.',
      },
      monthly: {
        love: 'Social connections thrive this month.',
        money: 'Savings will support future plans.',
        health: 'Practice mindfulness for mental clarity.',
      },
    },
    cancer: {
      daily: {
        love: 'Emotional understanding is key.',
        money: 'Reassess your budget.',
        health: 'Hydration and rest are vital.',
      },
      monthly: {
        love: 'Family time strengthens relationships.',
        money: 'A stable financial month.',
        health: 'Focus on your emotional health.',
      },
    },
    leo: {
      daily: {
        love: 'Confidence attracts positive energy.',
        money: 'Opportunities for growth arise.',
        health: 'Rest to avoid burnout.',
      },
      monthly: {
        love: 'Passion drives romantic endeavors.',
        money: 'Workplace rewards await.',
        health: 'Regular exercise brings vitality.',
      },
    },
    virgo: {
      daily: {
        love: 'Clarity in communication is essential.',
        money: 'Expenses need careful monitoring.',
        health: 'Focus on self-care routines.',
      },
      monthly: {
        love: 'Deep connections grow stronger.',
        money: 'Plan for long-term goals.',
        health: 'Balanced habits improve health.',
      },
    },
    libra: {
      daily: {
        love: 'Romantic surprises may occur.',
        money: 'Collaborative efforts bring success.',
        health: 'Focus on physical relaxation.',
      },
      monthly: {
        love: 'Harmony defines your relationships.',
        money: 'Shared ventures bring prosperity.',
        health: 'Meditation enhances your wellness.',
      },
    },
    scorpio: {
      daily: {
        love: 'Passion fuels your connections.',
        money: 'Manage investments wisely.',
        health: 'Rejuvenation through rest is vital.',
      },
      monthly: {
        love: 'Intense relationships grow deeper.',
        money: 'New ventures will prove fruitful.',
        health: 'Focus on balanced energy levels.',
      },
    },
    sagittarius: {
      daily: {
        love: 'Adventure awaits in love.',
        money: 'Financial risks may pay off.',
        health: 'Stay active to maintain stamina.',
      },
      monthly: {
        love: 'Exciting opportunities in romance.',
        money: 'Planning ahead benefits investments.',
        health: 'Focus on your mental health.',
      },
    },
    capricorn: {
      daily: {
        love: 'Stability strengthens bonds.',
        money: 'Opportunities for financial security.',
        health: 'Consistency in routines benefits you.',
      },
      monthly: {
        love: 'Long-term relationships grow stronger.',
        money: 'Strategic decisions yield results.',
        health: 'Focus on long-term health goals.',
      },
    },
    aquarius: {
      daily: {
        love: 'Innovative ideas charm your partner.',
        money: 'Unexpected gains may occur.',
        health: 'Hydrate and stay active.',
      },
      monthly: {
        love: 'Creative expressions enhance romance.',
        money: 'Networking boosts income.',
        health: 'Mental agility is your strength.',
      },
    },
    pisces: {
      daily: {
        love: 'Dreamy connections bring joy.',
        money: 'Savings plans come into focus.',
        health: 'Relaxation is key today.',
      },
      monthly: {
        love: 'Imaginative efforts enhance love life.',
        money: 'A financially rewarding month.',
        health: 'Focus on mental peace.',
      },
    },
  };

  const handleRashiChange = (e) => {
    setSelectedRashi(e.target.value);
  };

  const handleHoroscopeTypeChange = (e) => {
    setHoroscopeType(e.target.value);
  };

  const currentHoroscope = selectedRashi
    ? horoscopes[selectedRashi][horoscopeType]
    : null;

  const currentRashi = rashis.find((rashi) => rashi.value === selectedRashi);

  return (
    <div className="flex flex-col items-center p-4 bg-light-cream min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Horoscope</h1>
      <div className="flex space-x-4 mb-6">
        <select
          value={selectedRashi}
          onChange={handleRashiChange}
          className="p-2 border rounded shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select Rashi</option>
          {rashis.map((rashi) => (
            <option key={rashi.value} value={rashi.value}>
              {getDisplayName(rashi.name)}
            </option>
          ))}
        </select>
        <select
          value={horoscopeType}
          onChange={handleHoroscopeTypeChange}
          className="p-2 border rounded shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="daily">Daily</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
      <div className="max-w-md w-full bg-gradient-to-br from-white to-blue-100 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            {selectedRashi ? currentRashi.name : 'Welcome to Horoscope'}
          </h2>
          <h3 className="text-lg font-medium text-gray-700 mb-4 text-center">
            {selectedRashi
              ? `${horoscopeType.charAt(0).toUpperCase() + horoscopeType.slice(1)} Horoscope`
              : 'Select a Rashi to view details'}
          </h3>
          <div className="bg-blue-50 p-4 rounded-lg">
            {selectedRashi ? (
              <>
                <p className="mb-2">
                  <strong className="text-blue-800">Love:</strong> {currentHoroscope.love}
                </p>
                <p className="mb-2">
                  <strong className="text-blue-800">Money:</strong> {currentHoroscope.money}
                </p>
                <p>
                  <strong className="text-blue-800">Health:</strong> {currentHoroscope.health}
                </p>
              </>
            ) : (
              <>
                <p className="mb-4">Select a Rashi and horoscope type to view personalized details!</p>
                <p className="text-gray-600 italic">Tip: Start by choosing Aries or Taurus!</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoroscopeApp;

