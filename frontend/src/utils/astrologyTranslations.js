// Centralized Rashi translation utility
export const translateRashi = (rashiName, language = 'en') => {
  if (!rashiName) return 'Unknown';

  // Comprehensive Rashi mapping
  const rashiMap = {
    // Sanskrit names from backend to English
    'Mesha': 'Aries',
    'Vrishabha': 'Taurus',
    'Mithuna': 'Gemini',
    'Karka': 'Cancer',
    'Simha': 'Leo',
    'Kanya': 'Virgo',
    'Tula': 'Libra',
    'Vrishchika': 'Scorpio',
    'Dhanu': 'Sagittarius',
    'Makara': 'Capricorn',
    'Kumbha': 'Aquarius',
    'Meena': 'Pisces',

    // English names (already English)
    'Aries': 'Aries',
    'Taurus': 'Taurus',
    'Gemini': 'Gemini',
    'Cancer': 'Cancer',
    'Leo': 'Leo',
    'Virgo': 'Virgo',
    'Libra': 'Libra',
    'Scorpio': 'Scorpio',
    'Sagittarius': 'Sagittarius',
    'Capricorn': 'Capricorn',
    'Aquarius': 'Aquarius',
    'Pisces': 'Pisces',

    // Lowercase English to English
    'aries': 'Aries',
    'taurus': 'Taurus',
    'gemini': 'Gemini',
    'cancer': 'Cancer',
    'leo': 'Leo',
    'virgo': 'Virgo',
    'libra': 'Libra',
    'scorpio': 'Scorpio',
    'sagittarius': 'Sagittarius',
    'capricorn': 'Capricorn',
    'aquarius': 'Aquarius',
    'pisces': 'Pisces',

    // Special cases
    'unknown': 'Unknown',
    'Unknown': 'Unknown',
    'unknown sign': 'Unknown'
  };

  // For English, return English name
  if (language === 'en') {
    return rashiMap[rashiName] || rashiName;
  }

  // For Hindi, use the Hindi translations
  const hindiMap = {
    'Mesha': 'मेष',
    'Vrishabha': 'वृषभ',
    'Mithuna': 'मिथुन',
    'Karka': 'कर्क',
    'Simha': 'सिंह',
    'Kanya': 'कन्या',
    'Tula': 'तुला',
    'Vrishchika': 'वृश्चिक',
    'Dhanu': 'धनु',
    'Makara': 'मकर',
    'Kumbha': 'कुम्भ',
    'Meena': 'मीन',
    'Aries': 'मेष',
    'Taurus': 'वृषभ',
    'Gemini': 'मिथुन',
    'Cancer': 'कर्क',
    'Leo': 'सिंह',
    'Virgo': 'कन्या',
    'Libra': 'तुला',
    'Scorpio': 'वृश्चिक',
    'Sagittarius': 'धनु',
    'Capricorn': 'मकर',
    'Aquarius': 'कुम्भ',
    'Pisces': 'मीन',
    'unknown': 'अज्ञात',
    'Unknown': 'अज्ञात',
    'unknown sign': 'अज्ञात राशि'
  };

  if (language === 'hi') {
    return hindiMap[rashiName] || rashiName;
  }

  // Default fallback
  return rashiName;
};

// Export planet translations as well for consistency
export const translatePlanet = (planetName, language = 'en') => {
  if (!planetName) return planetName;
  
  const planetMap = {
    'Sun': language === 'hi' ? 'सूर्य' : 'Sun',
    'Moon': language === 'hi' ? 'चंद्र' : 'Moon',
    'Mars': language === 'hi' ? 'मंगल' : 'Mars',
    'Mercury': language === 'hi' ? 'बुध' : 'Mercury',
    'Jupiter': language === 'hi' ? 'बृहस्पति' : 'Jupiter',
    'Venus': language === 'hi' ? 'शुक्र' : 'Venus',
    'Saturn': language === 'hi' ? 'शनि' : 'Saturn',
    'Rahu': language === 'hi' ? 'राहु' : 'Rahu',
    'Ketu': language === 'hi' ? 'केतु' : 'Ketu'
  };
  
  return planetMap[planetName] || planetName;
};