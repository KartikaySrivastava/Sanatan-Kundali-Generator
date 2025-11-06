
import React, { useState } from "react";

const Meditation = () => {
  const [selectedRashi, setSelectedRashi] = useState("");

  const rashis = [
    { name: "Aries", value: "aries" },
    { name: "Taurus", value: "taurus" },
    { name: "Gemini", value: "gemini" },
    { name: "Cancer", value: "cancer" },
    { name: "Leo", value: "leo" },
    { name: "Virgo", value: "virgo" },
    { name: "Libra", value: "libra" },
    { name: "Scorpio", value: "scorpio" },
    { name: "Sagittarius", value: "sagittarius" },
    { name: "Capricorn", value: "capricorn" },
    { name: "Aquarius", value: "aquarius" },
    { name: "Pisces", value: "pisces" },
  ];

  const rashiDetails = {
    aries: {
      pooja: "Perform Surya Namaskar and offer water to the Sun every morning.",
      remedies: "Wear a red coral gemstone and chant the Hanuman Chalisa daily.",
      lifestyle: "Adopt a disciplined exercise routine and focus on reducing impulsive decisions.",
    },
    taurus: {
      pooja: "Worship Goddess Lakshmi and offer lotus flowers on Fridays.",
      remedies: "Donate food to the needy and wear a white opal gemstone.",
      lifestyle: "Maintain a balanced diet and prioritize financial planning.",
    },
    gemini: {
      pooja: "Worship Lord Ganesha and chant 'Om Gan Ganapataye Namah'.",
      remedies: "Wear a green emerald gemstone and avoid unnecessary arguments.",
      lifestyle: "Practice mindfulness and avoid multitasking.",
    },
    cancer: {
      pooja: "Offer milk to Lord Shiva on Mondays.",
      remedies: "Keep a silver ornament and donate white items like rice or milk.",
      lifestyle: "Focus on emotional stability and spend time with loved ones.",
    },
    leo: {
      pooja: "Perform aarti to Lord Surya every morning.",
      remedies: "Wear a ruby gemstone and avoid ego clashes.",
      lifestyle: "Engage in leadership roles and practice humility.",
    },
    virgo: {
      pooja: "Offer prayers to Goddess Saraswati and chant 'Om Aim Saraswatyai Namah'.",
      remedies: "Wear a green jade gemstone and donate green items like spinach.",
      lifestyle: "Stay organized and embrace meditation for mental clarity.",
    },
    libra: {
      pooja: "Worship Goddess Durga and offer red flowers.",
      remedies: "Donate sweets to children and wear a diamond gemstone.",
      lifestyle: "Strive for balance in personal and professional life.",
    },
    scorpio: {
      pooja: "Offer water to the Shivling every morning.",
      remedies: "Keep a piece of silver with you and avoid revengeful thoughts.",
      lifestyle: "Practice patience and control intense emotions.",
    },
    sagittarius: {
      pooja: "Offer yellow flowers to Lord Vishnu and chant 'Om Namo Bhagavate Vasudevaya'.",
      remedies: "Wear a yellow sapphire gemstone and avoid overeating.",
      lifestyle: "Focus on expanding knowledge and embrace outdoor activities.",
    },
    capricorn: {
      pooja: "Worship Lord Shani and offer black sesame seeds on Saturdays.",
      remedies: "Keep an iron ring and chant 'Om Shanishcharaya Namah'.",
      lifestyle: "Set long-term goals and avoid overworking.",
    },
    aquarius: {
      pooja: "Worship Lord Shiva and chant 'Om Namah Shivaya'.",
      remedies: "Keep a blue sapphire gemstone and avoid procrastination.",
      lifestyle: "Engage in humanitarian activities and maintain a healthy sleep cycle.",
    },
    pisces: {
      pooja: "Offer yellow sweets to Lord Vishnu on Thursdays.",
      remedies: "Wear a yellow topaz gemstone and avoid overthinking.",
      lifestyle: "Focus on creativity and practice deep breathing exercises.",
    },
  };

  const currentRashi = selectedRashi
    ? rashiDetails[selectedRashi]
    : {
        pooja: "Select a Rashi to see the pooja recommendations.",
        remedies: "Select a Rashi to view remedies for daily life.",
        lifestyle: "Select a Rashi to get lifestyle advice.",
      };

  return (
    <div className="flex flex-col items-center p-6 bg-light-cream min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Pooja's, Lifestyle & Remedies</h1>
      <div className="flex space-x-4 mb-6">
        <select
          value={selectedRashi}
          onChange={(e) => setSelectedRashi(e.target.value)}
          className="p-2 border rounded shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select Rashi</option>
          {rashis.map((rashi) => (
            <option key={rashi.value} value={rashi.value}>
              {rashi.name}
            </option>
          ))}
        </select>
      </div>
      <div className="max-w-lg w-full bg-gradient-to-br from-white to-blue-100 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4 text-center">
            {selectedRashi ? rashis.find((r) => r.value === selectedRashi).name : "Welcome"}
          </h2>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="mb-4">
              <strong className="text-blue-800">🛕 Pooja:</strong> {currentRashi.pooja}
            </p>
            <p className="mb-4">
              <strong className="text-blue-800">🔮 Remedies:</strong> {currentRashi.remedies}
            </p>
            <p>
              <strong className="text-blue-800">🌟 Lifestyle Changes:</strong> {currentRashi.lifestyle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Meditation;

