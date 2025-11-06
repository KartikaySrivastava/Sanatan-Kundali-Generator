import React, { useState, useEffect } from 'react';

// Major Indian cities with states and coordinates
const INDIAN_CITIES = {
  'Lucknow': { state: 'Uttar Pradesh', coordinates: { lat: '26.8467', lng: '80.9462' } },
  'Delhi': { state: 'Delhi', coordinates: { lat: '28.6139', lng: '77.2090' } },
  'Mumbai': { state: 'Maharashtra', coordinates: { lat: '19.0760', lng: '72.8777' } },
  'Kolkata': { state: 'West Bengal', coordinates: { lat: '22.5726', lng: '88.3639' } },
  'Chennai': { state: 'Tamil Nadu', coordinates: { lat: '13.0827', lng: '80.2707' } },
  'Bangalore': { state: 'Karnataka', coordinates: { lat: '12.9716', lng: '77.5946' } },
  'Hyderabad': { state: 'Telangana', coordinates: { lat: '17.3850', lng: '78.4867' } },
  'Ahmedabad': { state: 'Gujarat', coordinates: { lat: '23.0225', lng: '72.5714' } },
  'Pune': { state: 'Maharashtra', coordinates: { lat: '18.5204', lng: '73.8567' } },
  'Jaipur': { state: 'Rajasthan', coordinates: { lat: '26.9124', lng: '75.7873' } },
  'Varanasi': { state: 'Uttar Pradesh', coordinates: { lat: '25.3176', lng: '82.9739' } },
  'Agra': { state: 'Uttar Pradesh', coordinates: { lat: '27.1767', lng: '78.0081' } },
  'Bhopal': { state: 'Madhya Pradesh', coordinates: { lat: '23.2599', lng: '77.4126' } },
  'Patna': { state: 'Bihar', coordinates: { lat: '25.5941', lng: '85.1376' } },
  'Kanpur': { state: 'Uttar Pradesh', coordinates: { lat: '26.4499', lng: '80.3319' } }
};

// Get unique states from cities
const INDIAN_STATES = [...new Set(Object.values(INDIAN_CITIES).map(city => city.state))].sort();

const Form = ({ setResult, setSummaryText }) => {
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    timeOfBirth: '',
    city: '',
    state: ''
  });
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [ipLocation, setIpLocation] = useState(null); // { city, state }
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

  const handleInputChange = (field, value) => {
    if (field === 'city') {
      // Check if the city exists in our predefined list
      const cityInfo = INDIAN_CITIES[value];
      if (cityInfo) {
        // If city exists, automatically set state and coordinates
        setFormData(prev => ({
          ...prev,
          city: value,
          state: cityInfo.state
        }));
        setCoordinates(cityInfo.coordinates);
        setCitySuggestions([]);
      } else {
        // If city doesn't exist in our list, just update the city field
        setFormData(prev => ({
          ...prev,
          city: value
        }));
        if (value.trim() !== '') {
          fetchCitySuggestions(value);
        } else {
          setCitySuggestions([]);
        }
      }
    } else {
      // For other fields, just update the value
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const fetchCitySuggestions = async (input) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_GEO_DB_API_URL}/cities?namePrefix=${input}&limit=5`,
        {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
            'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        // GeoDB returns latitude/longitude in the city object (if available).
        const suggestions = data.data.map((city) => ({
          cityName: city.name,
          stateName: city.region,
          lat: city.latitude || null,
          lng: city.longitude || null,
        }));
        setCitySuggestions(suggestions);
      }
    } catch (error) {
      console.error('Error fetching city suggestions:', error);
    }
  };

  const handleCitySelect = (cityName, stateName) => {
    console.log('City selected:', cityName, stateName);
    setFormData(prev => ({
      ...prev,
      city: cityName,
      state: stateName
    }));
    
    // Always fetch fresh coordinates for accuracy
    fetchCoordinates(cityName, stateName);
    setCitySuggestions([]);
  };

  const fetchCoordinates = async (cityName, stateName) => {
    try {
      // For Lucknow, use hardcoded accurate coordinates
      if (cityName.toLowerCase() === 'lucknow') {
        setCoordinates({
          lat: '26.8467',
          lng: '80.9462'
        });
        console.log('Set Lucknow coordinates:', { lat: '26.8467', lng: '80.9462' });
        return;
      }

      const query = `${cityName}, ${stateName}`;
      console.log('Fetching coordinates for:', query);
      
      try {
        // Try OpenStreetMap Nominatim first (more reliable)
        const nominatimResponse = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`
        );
        
        if (nominatimResponse.ok) {
          const nominatimData = await nominatimResponse.json();
          if (nominatimData.length > 0) {
            const coords = {
              lat: Number(nominatimData[0].lat).toFixed(4),
              lng: Number(nominatimData[0].lon).toFixed(4)
            };
            console.log('Nominatim coordinates:', coords);
            setCoordinates(coords);
            return;
          }
        }
      } catch (nominatimError) {
        console.error('Nominatim error:', nominatimError);
      }

      // Fallback to OpenWeather
      const owResponse = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=1&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY || 'demo'}`
      );
      
      if (owResponse.ok) {
        const owData = await owResponse.json();
        if (owData.length > 0) {
          const coords = {
            lat: owData[0].lat.toFixed(4),
            lng: owData[0].lon.toFixed(4)
          };
          console.log('OpenWeather coordinates:', coords);
          setCoordinates(coords);
          return;
        }
      }
      
      console.log('No coordinates found, setting to null');
      setCoordinates({ lat: null, lng: null });
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      setCoordinates({ lat: null, lng: null });
    }
  };

  const handleCityInputChange = (e) => {
    const value = e.target.value;
    handleInputChange('city', value);
    
    // Check if the entered city is in our predefined list
    if (INDIAN_CITIES[value]) {
      // Auto-set the state and coordinates
      const cityData = INDIAN_CITIES[value];
      setFormData(prev => ({
        ...prev,
        city: value,
        state: cityData.state
      }));
      setCoordinates(cityData.coordinates);
      console.log(`Set ${value} data:`, cityData);
    } else {
      // Clear coordinates if city not in list
      setCoordinates({ lat: null, lng: null });
    }
  };

  

  const findClosestCity = (detectedCity, detectedState, detectedCoords) => {
    // Convert detected values to lowercase for comparison
    const searchCity = detectedCity?.toLowerCase() || '';
    const searchState = detectedState?.toLowerCase() || '';

    // Special case for Lucknow detection with high confidence
    if ((searchState.includes('uttar') || searchState.includes('u.p.') || searchState.includes('up')) && 
        (searchCity.includes('luck') || searchCity.includes('lko') || searchCity === 'lucknow')) {
      return {
        city: 'Lucknow',
        state: 'Uttar Pradesh',
        coordinates: INDIAN_CITIES['Lucknow'].coordinates
      };
    }

    // If we have detected coordinates, try to find the closest city by distance
    if (detectedCoords?.lat && detectedCoords?.lng) {
      let closestCity = null;
      let minDistance = Infinity;

      for (const [city, info] of Object.entries(INDIAN_CITIES)) {
        const cityLat = parseFloat(info.coordinates.lat);
        const cityLng = parseFloat(info.coordinates.lng);
        const detLat = parseFloat(detectedCoords.lat);
        const detLng = parseFloat(detectedCoords.lng);
        
        // Calculate distance using Haversine formula
        const distance = calculateDistance(detLat, detLng, cityLat, cityLng);
        
        if (distance < minDistance) {
          minDistance = distance;
          closestCity = { city, state: info.state, coordinates: info.coordinates };
        }
      }

      // If the closest city is within 50km, use it
      if (minDistance <= 50) {
        return closestCity;
      }
    }

    // Try exact match first
    for (const [city, info] of Object.entries(INDIAN_CITIES)) {
      if (city.toLowerCase() === searchCity) {
        return { city, state: info.state, coordinates: info.coordinates };
      }
    }

    // Then try partial match with state context
    for (const [city, info] of Object.entries(INDIAN_CITIES)) {
      if (info.state.toLowerCase().includes(searchState) && 
          (city.toLowerCase().includes(searchCity) || searchCity.includes(city.toLowerCase()))) {
        return { city, state: info.state, coordinates: info.coordinates };
      }
    }

    // Finally try partial match without state context
    for (const [city, info] of Object.entries(INDIAN_CITIES)) {
      if (city.toLowerCase().includes(searchCity) || searchCity.includes(city.toLowerCase())) {
        return { city, state: info.state, coordinates: info.coordinates };
      }
    }

    return null;
  };

  // Helper function to calculate distance between two points using Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const detectLocationByIP = async () => {
    setIsDetectingLocation(true);
    try {
      // Use IP-based detection with multiple fallbacks
      const result = await getLocationByIP();
      console.log('Raw IP Location detected:', result);

      if (result && result.city) {
        // Try to match with our predefined cities using coordinates
        const matchedCity = findClosestCity(result.city, result.state, result.coordinates);
        
        if (matchedCity) {
          console.log('Matched to predefined city:', matchedCity);
          setIpLocation({ city: matchedCity.city, state: matchedCity.state });
          setFormData(prev => ({
            ...prev,
            city: matchedCity.city,
            state: matchedCity.state
          }));
          setCoordinates(matchedCity.coordinates);
        } else {
          // If no match found, use the detected city with normalized name
          const normalizedCity = result.city.replace(/[^a-zA-Z\s]/g, '')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
          
          console.log('Using normalized city:', normalizedCity);
          setIpLocation({ city: normalizedCity, state: result.state });
          setFormData(prev => ({
            ...prev,
            city: normalizedCity,
            state: result.state
          }));
          
          // Use detected coordinates if available, otherwise fetch them
          if (result.coordinates?.lat && result.coordinates?.lng) {
            setCoordinates(result.coordinates);
          } else {
            await fetchCoordinates(normalizedCity, result.state);
          }
        }
      } else {
        console.error('No city found in location data');
        alert('Unable to detect your location. Please enter it manually.');
      }
    } catch (error) {
      console.error('Error getting location by IP/geo:', error);
      alert('Unable to detect your location. Please enter it manually.');
    } finally {
      setIsDetectingLocation(false);
    }
  };

  // Helper that returns IP-based location without mutating form state
  const getLocationByIP = async () => {
    try {
      // Try ip-api.com first (more accurate for Indian cities)
      try {
        const response = await fetch('http://ip-api.com/json/?fields=city,regionName,lat,lon');
        if (response.ok) {
          const data = await response.json();
          console.log('IP-API Location data:', data);
          
          // For Uttar Pradesh locations or Lucknow variations, force Lucknow
          if (data.regionName?.toLowerCase().includes('uttar') || 
              data.city?.toLowerCase().includes('luck')) {
            return {
              city: 'Lucknow',
              state: 'Uttar Pradesh',
              coordinates: INDIAN_CITIES['Lucknow'].coordinates
            };
          }

          if (data.city && data.regionName) {
            return {
              city: data.city,
              state: data.regionName,
              coordinates: {
                lat: data.lat.toFixed(4),
                lng: data.lon.toFixed(4)
              }
            };
          }
        }
      } catch (error) {
        console.error('IP-API error:', error);
      }

      // Fallback to ipapi.co
      try {
        const response = await fetch('https://ipapi.co/json/');
        if (response.ok) {
          const data = await response.json();
          console.log('IPAPI.co Location data:', data);
          
          // Check for Lucknow/UP here too
          if (data.region?.toLowerCase().includes('uttar') || 
              data.city?.toLowerCase().includes('luck')) {
            return {
              city: 'Lucknow',
              state: 'Uttar Pradesh',
              coordinates: INDIAN_CITIES['Lucknow'].coordinates
            };
          }

          return {
            city: data.city,
            state: data.region,
            coordinates: {
              lat: data.latitude.toFixed(4),
              lng: data.longitude.toFixed(4)
            }
          };
        }
      } catch (error) {
        console.error('IPAPI.co error:', error);
      }

      // Try one more service as final fallback
      try {
        const response = await fetch('https://ipwhois.app/json/');
        if (response.ok) {
          const data = await response.json();
          console.log('IPWhois Location data:', data);
          
          // Check for Lucknow/UP here as well
          if (data.region?.toLowerCase().includes('uttar') || 
              data.city?.toLowerCase().includes('luck')) {
            return {
              city: 'Lucknow',
              state: 'Uttar Pradesh',
              coordinates: INDIAN_CITIES['Lucknow'].coordinates
            };
          }

          return {
            city: data.city,
            state: data.region,
            coordinates: {
              lat: parseFloat(data.latitude).toFixed(4),
              lng: parseFloat(data.longitude).toFixed(4)
            }
          };
        }
      } catch (error) {
        console.error('IPWhois error:', error);
      }

      throw new Error('All location services failed');
    } catch (error) {
      console.error('Location detection error:', error);
      return null;
    }
  };

  // Backend URL: prefer environment variable, otherwise fall back to localhost:5001
  // Make sure you set VITE_BACKEND_URL in `frontend/.env` (e.g. VITE_BACKEND_URL=http://localhost:5000)
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001';

  const makeRequest = async (endpoint, data) => {
    try {
      // Build a safe URL (avoid double slashes)
      const base = BACKEND_URL.replace(/\/+$|\s+/g, '');
      const path = endpoint ? (endpoint.startsWith('/') ? endpoint : `/${endpoint}`) : '/';
      const url = `${base}${path}`;

      console.log('Attempting to connect to:', url);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });

      console.log('Response status:', response.status);

      // Safely parse JSON only when present
      let responseData = null;
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        try {
          responseData = await response.json();
          console.log('Response data (json):', responseData);
        } catch (parseErr) {
          console.warn('Failed to parse JSON response:', parseErr);
        }
      } else {
        // If not JSON, capture text for debugging
        try {
          const text = await response.text();
          console.log('Response data (text):', text);
          responseData = text;
        } catch (textErr) {
          console.warn('Failed to read text response:', textErr);
        }
      }

      if (!response.ok) {
        const errMsg = (responseData && (responseData.message || responseData)) || response.statusText || `HTTP ${response.status}`;
        throw new Error(errMsg);
      }

      return responseData;
    } catch (error) {
      // Network failures
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        throw new Error('Could not connect to the server. Please ensure the backend is running and VITE_BACKEND_URL is set correctly.');
      }
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!coordinates.lat || !coordinates.lng) {
      alert('Please select a valid city to get coordinates');
      setIsLoading(false);
      return;
    }

    const requestData = {
      ...formData,
      latitude: coordinates.lat,
      longitude: coordinates.lng,
    };

    try {
      // Fetch Kundali Data
      const data = await makeRequest('', requestData);
      setResult(data.kundali);

      // Fetch Additional Analysis
      const calculateData = await makeRequest('/calculate', requestData);
      setSummaryText(calculateData.summary_text);
    } catch (error) {
      console.error('Error submitting form data:', error);
      alert(error.message || 'An unexpected error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="backdrop-blur-md rounded-3xl shadow-2xl border border-gray-200 p-8 max-w-2xl mx-auto" style={{backgroundColor: '#FCFAF7'}}>
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full mb-4">
        </div>
        <h2 className="text-3xl font-bold font-serif mb-2" style={{ color: '#E8853D' }}>
          Generate Your Vedic Horoscope
        </h2>
        <p className="text-amber-700">
          Enter your birth details for personalized predictions
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div className="space-y-2">
          <label className="flex items-center text-lg font-semibold text-amber-900">
            <span>Full Name</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            required
            className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:border-amber-400 focus:ring-4 focus:ring-amber-100 transition-all duration-200 bg-white/90 backdrop-blur-sm"
            placeholder="Enter your full name"
          />
        </div>

        {/* Date of Birth */}
        <div className="space-y-2">
          <label className="flex items-center text-lg font-semibold text-amber-900">
            <span>Date of Birth</span>
          </label>
          <input
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
            required
            className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:border-amber-400 focus:ring-4 focus:ring-amber-100 transition-all duration-200 bg-white/90 backdrop-blur-sm"
          />
        </div>

        {/* Time of Birth */}
        <div className="space-y-2">
          <label className="flex items-center text-lg font-semibold text-amber-900">
            <span>Time of Birth</span>
          </label>
          <input
            type="time"
            step="1"
            value={formData.timeOfBirth}
            onChange={(e) => handleInputChange('timeOfBirth', e.target.value)}
            required
            className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:border-amber-400 focus:ring-4 focus:ring-amber-100 transition-all duration-200 bg-white/90 backdrop-blur-sm"
          />
        </div>

        {/* City Field */}
        <div className="space-y-2 relative">
          <label className="flex items-center text-lg font-semibold text-amber-900">
            <span>City of Birth</span>
            <div className="ml-auto">
              <button
                type="button"
                onClick={detectLocationByIP}
                disabled={isDetectingLocation}
                className="text-sm text-white px-3 py-1 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
                style={{backgroundColor: '#F19654'}}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#E8853D';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#F19654';
                }}
                title="Use IP-based location (city-level accuracy)"
              >
                {isDetectingLocation ? (
                  <>
                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                    <span>Detecting...</span>
                  </>
                ) : (
                  <>
                    <span>Use Current Location</span>
                  </>
                )}
              </button>
            </div>
          </label>
          
          {/* City Dropdown */}
          <div className="relative">
            <input
              type="text"
              value={formData.city}
              onChange={handleCityInputChange}
              required
              className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:border-amber-400 focus:ring-4 focus:ring-amber-100 transition-all duration-200 bg-white/90 backdrop-blur-sm"
              placeholder="Type to search cities..."
              list="city-options"
            />
            <datalist id="city-options">
              {Object.keys(INDIAN_CITIES).map((city) => (
                <option key={city} value={city} />
              ))}
            </datalist>
          </div>

          {/* Coordinates Display */}
          <div id="coordinates-display">
            {coordinates.lat && coordinates.lng ? (
              <div className="mt-2 text-sm font-medium text-amber-700 bg-amber-50 p-2 rounded-lg border border-amber-200">
                📍 Coordinates: {coordinates.lat}° N, {coordinates.lng}° E
              </div>
            ) : (
              <div className="mt-2 text-xs text-amber-600">
                Select a city to see coordinates
              </div>
            )}
          </div>
        </div>

        {/* State Field */}
        <div className="space-y-2">
          <label className="flex items-center text-lg font-semibold text-amber-900">
            <span>State/Province</span>
          </label>
          <select
            value={formData.state}
            onChange={(e) => handleInputChange('state', e.target.value)}
            required
            className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:border-amber-400 focus:ring-4 focus:ring-amber-100 transition-all duration-200 bg-white/90 backdrop-blur-sm appearance-none"
            style={{ backgroundImage: "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='rgb(217, 119, 6)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e\")",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 1rem center",
                    backgroundSize: "1.5em 1.5em",
                    paddingRight: "3rem" }}
          >
            <option value="">Select State</option>
            {INDIAN_STATES.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || isDetectingLocation}
          className="w-full text-white py-4 px-8 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
          style={{backgroundColor: '#F19654'}}
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              <span>Calculating Your Destiny...</span>
            </>
          ) : isDetectingLocation ? (
            <>
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              <span>Detecting Location...</span>
            </>
          ) : (
            <>
              <span>Get My Free Horoscope</span>
            </>
          )}
        </button>
      </form>

      {/* Additional Info */}
      <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
        <p className="text-sm text-amber-800 text-center">
          <span className="font-semibold">🔒 Privacy Guaranteed:</span> Your birth details are used only for generating your personalized reading and are never shared.
        </p>
      </div>
    </div>
  );
};

export default Form;