
import React, { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { translateRashi } from "../utils/astrologyTranslations";

const GemstoneRecommendation = () => {
  const { language, isHindi } = useLanguage();
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

  const getDisplayName = (rashiName) => {
    const translatedRashi = translateRashi(rashiName, language);
    if (isHindi) {
      return `${translatedRashi} (${translatedRashi})`;
    }
    return `${rashiName} (${translatedRashi})`;
  };

  const gemstoneDetails = {
    aries: {
      gemstone: "Red Coral (लाल मूंगा)",
      reason:
        "Red Coral enhances courage, confidence, and vitality, aligning with Aries' ruling planet Mars. It helps balance impulsiveness and boosts focus.",
      tips: "Wear on the ring finger in gold or copper for best results.",
    },
    taurus: {
      gemstone: "Emerald (पन्ना)",
      reason:
        "Emerald promotes creativity, stability, and prosperity. Ruled by Venus, Taurus benefits from its calming energy and focus-enhancing properties.",
      tips: "Wear on the little finger for financial growth.",
    },
    gemini: {
      gemstone: "Emerald (पन्ना)",
      reason:
        "Emerald sharpens intellect and enhances communication skills, resonating with Gemini’s ruler Mercury. It also promotes focus and clarity.",
      tips: "Ideal for students and professionals who need focus.",
    },
    cancer: {
      gemstone: "Pearl (मोती)",
      reason:
        "Pearl soothes emotions and brings mental peace, harmonizing with Cancer’s ruling planet Moon. It fosters a sense of calm and nurtures relationships.",
      tips: "Wear on the little finger for emotional stability.",
    },
    leo: {
      gemstone: "Ruby (माणिक)",
      reason:
        "Ruby enhances leadership qualities, self-confidence, and vitality, resonating with Leo’s ruler Sun. It helps achieve goals with determination.",
      tips: "Wear on the ring finger in gold for maximum impact.",
    },
    virgo: {
      gemstone: "Emerald (पन्ना)",
      reason:
        "Emerald aids Virgo’s analytical nature, enhancing creativity and decision-making skills. It aligns with Mercury’s influence on intellect.",
      tips: "Best suited for professionals in intellectual fields.",
    },
    libra: {
      gemstone: "Diamond (हीरा)",
      reason:
        "Diamond enhances Libra’s natural charm, creativity, and balance, resonating with Venus’ energy. It promotes harmony and financial stability.",
      tips: "Wear on the middle finger to attract prosperity.",
    },
    scorpio: {
      gemstone: "Red Coral (लाल मूंगा)",
      reason:
        "Red Coral boosts inner strength and resilience, harmonizing with Scorpio’s ruling planet Mars. It also helps navigate intense emotions.",
      tips: "Wear on the ring finger for enhanced willpower.",
    },
    sagittarius: {
      gemstone: "Yellow Sapphire (पुखराज)",
      reason:
        "Yellow Sapphire promotes wisdom and spiritual growth, aligning with Jupiter, the ruler of Sagittarius. It also supports financial gains.",
      tips: "Wear on the index finger for better opportunities.",
    },
    capricorn: {
      gemstone: "Blue Sapphire (नीलम)",
      reason:
        "Blue Sapphire enhances discipline, focus, and stability, resonating with Saturn’s energy. It helps Capricorns achieve long-term goals.",
      tips: "Wear only after testing suitability to avoid side effects.",
    },
    aquarius: {
      gemstone: "Blue Sapphire (नीलम)",
      reason:
        "Blue Sapphire aligns with Saturn, aiding Aquarius in focus and innovative thinking. It enhances stability and clarity.",
      tips: "Wear on the middle finger for intellectual pursuits.",
    },
    pisces: {
      gemstone: "Yellow Sapphire (पुखराज)",
      reason:
        "Yellow Sapphire boosts intuition, spiritual growth, and prosperity, aligning with Pisces’ ruler Jupiter.",
      tips: "Wear on the index finger for wisdom and clarity.",
    },
  };

  const currentGemstone = selectedRashi
    ? gemstoneDetails[selectedRashi]
    : {
        gemstone: "Select a Rashi to see the recommended gemstone.",
        reason: "Select a Rashi to see why this gemstone is beneficial.",
        tips: "Select a Rashi to see tips for wearing the gemstone.",
      };

  return (
    <div className="flex flex-col items-center p-6 bg-[#FBF5DD] min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Gemstone Recommendations 💎
      </h1>
      <div className="flex space-x-4 mb-6">
        <select
          value={selectedRashi}
          onChange={(e) => setSelectedRashi(e.target.value)}
          className="p-2 border rounded shadow-md focus:outline-none focus:ring-2 focus:ring-teal-400"
        >
          <option value="">Select Rashi</option>
          {rashis.map((rashi) => (
            <option key={rashi.value} value={rashi.value}>
              {getDisplayName(rashi.name)}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full bg-gradient-to-br from-white to-teal-100 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-teal-800 mb-4 text-center">
            {selectedRashi
              ? getDisplayName(rashis.find((r) => r.value === selectedRashi).name)
              : "Welcome"}
          </h2>
          <div className="bg-teal-50 p-4 rounded-lg">
            <p className="mb-4">
              <strong className="text-teal-800">💎 Gemstone:</strong>{" "}
              {currentGemstone.gemstone}
            </p>
            <p className="mb-4">
              <strong className="text-teal-800">🔍 Reason:</strong>{" "}
              {currentGemstone.reason}
            </p>
            <p>
              <strong className="text-teal-800">✨ Tips:</strong>{" "}
              {currentGemstone.tips}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GemstoneRecommendation;

