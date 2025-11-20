// Centralized Rashi translation utility
export const translateRashi = (rashiName, language = 'en') => {
  if (!rashiName) return 'Unknown';
  
  // Comprehensive Rashi mapping for both directions
  const rashiMap = {
    // English to Hindi
    'aries': 'मेष',
    'taurus': 'वृषभ', 
    'gemini': 'मिथुन',
    'cancer': 'कर्क',
    'leo': 'सिंह',
    'virgo': 'कन्या',
    'libra': 'तुला',
    'scorpio': 'वृश्चिक',
    'sagittarius': 'धनु',
    'capricorn': 'मकर',
    'aquarius': 'कुम्भ',
    'pisces': 'मीन',
    
    // Proper case English to Hindi
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
    
    // Special cases
    'unknown': 'अज्ञात',
    'Unknown': 'Unknown',
    'unknown sign': 'अज्ञात राशि'
  };
  
  // If Hindi mode and we have a translation, return Hindi version
  if (language === 'hi' && rashiMap[rashiName]) {
    return rashiMap[rashiName];
  }
  
  // Otherwise return original
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