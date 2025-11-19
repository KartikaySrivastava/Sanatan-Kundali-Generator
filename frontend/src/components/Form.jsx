import React, { useState, useEffect, useRef } from 'react';

// Comprehensive Indian cities with states and coordinates
const INDIAN_CITIES = {
  // Andaman and Nicobar Islands
  'Port Blair': { state: 'Andaman and Nicobar Islands', coordinates: { lat: '11.6234', lng: '92.7265' } },
  
  // Andhra Pradesh
  'Visakhapatnam': { state: 'Andhra Pradesh', coordinates: { lat: '17.6868', lng: '83.2185' } },
  'Vijayawada': { state: 'Andhra Pradesh', coordinates: { lat: '16.5062', lng: '80.6480' } },
  'Guntur': { state: 'Andhra Pradesh', coordinates: { lat: '16.3067', lng: '80.4365' } },
  'Nellore': { state: 'Andhra Pradesh', coordinates: { lat: '14.4426', lng: '79.9865' } },
  'Kurnool': { state: 'Andhra Pradesh', coordinates: { lat: '15.8281', lng: '78.0373' } },
  'Tirupati': { state: 'Andhra Pradesh', coordinates: { lat: '13.6288', lng: '79.4192' } },
  'Rajahmundry': { state: 'Andhra Pradesh', coordinates: { lat: '17.0005', lng: '81.8040' } },
  'Kadapa': { state: 'Andhra Pradesh', coordinates: { lat: '14.4673', lng: '78.8242' } },
  'Eluru': { state: 'Andhra Pradesh', coordinates: { lat: '16.7107', lng: '81.0647' } },
  'Anantapur': { state: 'Andhra Pradesh', coordinates: { lat: '14.6819', lng: '77.6006' } },
  
  // Arunachal Pradesh
  'Itanagar': { state: 'Arunachal Pradesh', coordinates: { lat: '27.0844', lng: '93.6053' } },
  'Naharlagun': { state: 'Arunachal Pradesh', coordinates: { lat: '27.0975', lng: '93.6051' } },
  
  // Assam
  'Guwahati': { state: 'Assam', coordinates: { lat: '26.1445', lng: '91.7362' } },
  'Dibrugarh': { state: 'Assam', coordinates: { lat: '27.4728', lng: '94.9120' } },
  'Jorhat': { state: 'Assam', coordinates: { lat: '26.7509', lng: '94.2037' } },
  'Silchar': { state: 'Assam', coordinates: { lat: '24.8333', lng: '92.7789' } },
  'Nagaon': { state: 'Assam', coordinates: { lat: '26.3500', lng: '92.6833' } },
  'Tinsukia': { state: 'Assam', coordinates: { lat: '27.4833', lng: '95.3667' } },
  
  // Bihar
  'Patna': { state: 'Bihar', coordinates: { lat: '25.5941', lng: '85.1376' } },
  'Gaya': { state: 'Bihar', coordinates: { lat: '24.7914', lng: '85.0002' } },
  'Bhagalpur': { state: 'Bihar', coordinates: { lat: '25.2425', lng: '86.9842' } },
  'Muzaffarpur': { state: 'Bihar', coordinates: { lat: '26.1209', lng: '85.3647' } },
  'Darbhanga': { state: 'Bihar', coordinates: { lat: '26.1542', lng: '85.8918' } },
  'Bihar Sharif': { state: 'Bihar', coordinates: { lat: '25.2000', lng: '85.5167' } },
  'Purnia': { state: 'Bihar', coordinates: { lat: '25.7831', lng: '87.4753' } },
  'Katihar': { state: 'Bihar', coordinates: { lat: '25.5333', lng: '87.5833' } },
  
  // Chandigarh
  'Chandigarh': { state: 'Chandigarh', coordinates: { lat: '30.7333', lng: '76.7794' } },
  
  // Chhattisgarh
  'Raipur': { state: 'Chhattisgarh', coordinates: { lat: '21.2514', lng: '81.6296' } },
  'Bilaspur': { state: 'Chhattisgarh', coordinates: { lat: '22.0797', lng: '82.1409' } },
  'Durg': { state: 'Chhattisgarh', coordinates: { lat: '21.1900', lng: '81.2849' } },
  'Korba': { state: 'Chhattisgarh', coordinates: { lat: '22.3595', lng: '82.7501' } },
  'Raigarh': { state: 'Chhattisgarh', coordinates: { lat: '21.9000', lng: '83.4000' } },
  
  // Delhi
  'Delhi': { state: 'Delhi', coordinates: { lat: '28.6139', lng: '77.2090' } },
  'New Delhi': { state: 'Delhi', coordinates: { lat: '28.6139', lng: '77.2090' } },
  
  // Goa
  'Panaji': { state: 'Goa', coordinates: { lat: '15.5954', lng: '73.7440' } },
  'Margao': { state: 'Goa', coordinates: { lat: '15.5833', lng: '73.7440' } },
  'Vasco da Gama': { state: 'Goa', coordinates: { lat: '15.3967', lng: '73.8098' } },
  
  // Gujarat
  'Ahmedabad': { state: 'Gujarat', coordinates: { lat: '23.0225', lng: '72.5714' } },
  'Surat': { state: 'Gujarat', coordinates: { lat: '21.1702', lng: '72.8311' } },
  'Vadodara': { state: 'Gujarat', coordinates: { lat: '22.3072', lng: '73.1812' } },
  'Rajkot': { state: 'Gujarat', coordinates: { lat: '22.3039', lng: '70.8022' } },
  'Jamnagar': { state: 'Gujarat', coordinates: { lat: '22.4697', lng: '70.0577' } },
  'Bhavnagar': { state: 'Gujarat', coordinates: { lat: '21.7645', lng: '72.1519' } },
  'Junagadh': { state: 'Gujarat', coordinates: { lat: '21.5222', lng: '70.4579' } },
  'Gandhinagar': { state: 'Gujarat', coordinates: { lat: '23.2156', lng: '72.6369' } },
  'Anand': { state: 'Gujarat', coordinates: { lat: '22.5667', lng: '72.9333' } },
  'Bharuch': { state: 'Gujarat', coordinates: { lat: '21.7051', lng: '72.9959' } },
  
  // Haryana
  'Gurgaon': { state: 'Haryana', coordinates: { lat: '28.4595', lng: '77.0266' } },
  'Faridabad': { state: 'Haryana', coordinates: { lat: '28.4089', lng: '77.3178' } },
  'Rohtak': { state: 'Haryana', coordinates: { lat: '28.8955', lng: '76.6066' } },
  'Hisar': { state: 'Haryana', coordinates: { lat: '29.1492', lng: '75.7217' } },
  'Panipat': { state: 'Haryana', coordinates: { lat: '29.3909', lng: '76.9635' } },
  'Karnal': { state: 'Haryana', coordinates: { lat: '29.6857', lng: '76.9905' } },
  'Sonipat': { state: 'Haryana', coordinates: { lat: '28.9931', lng: '77.0151' } },
  
  // Himachal Pradesh
  'Shimla': { state: 'Himachal Pradesh', coordinates: { lat: '31.1048', lng: '77.1734' } },
  'Dharamshala': { state: 'Himachal Pradesh', coordinates: { lat: '32.2190', lng: '76.3234' } },
  'Mandi': { state: 'Himachal Pradesh', coordinates: { lat: '31.7077', lng: '76.9319' } },
  
  // Jammu and Kashmir
  'Srinagar': { state: 'Jammu and Kashmir', coordinates: { lat: '34.0837', lng: '74.7973' } },
  'Jammu': { state: 'Jammu and Kashmir', coordinates: { lat: '32.7266', lng: '74.8570' } },
  
  // Jharkhand
  'Jamshedpur': { state: 'Jharkhand', coordinates: { lat: '22.8046', lng: '86.2029' } },
  'Dhanbad': { state: 'Jharkhand', coordinates: { lat: '23.7957', lng: '86.4304' } },
  'Ranchi': { state: 'Jharkhand', coordinates: { lat: '23.3441', lng: '85.3096' } },
  'Bokaro Steel City': { state: 'Jharkhand', coordinates: { lat: '23.6693', lng: '85.9606' } },
  
  // Karnataka
  'Bangalore': { state: 'Karnataka', coordinates: { lat: '12.9716', lng: '77.5946' } },
  'Mysore': { state: 'Karnataka', coordinates: { lat: '12.2958', lng: '76.6394' } },
  'Hubli': { state: 'Karnataka', coordinates: { lat: '15.3647', lng: '75.1240' } },
  'Mangalore': { state: 'Karnataka', coordinates: { lat: '12.9141', lng: '74.8560' } },
  'Belgaum': { state: 'Karnataka', coordinates: { lat: '15.8497', lng: '74.4977' } },
  'Gulbarga': { state: 'Karnataka', coordinates: { lat: '17.3297', lng: '76.8343' } },
  'Davangere': { state: 'Karnataka', coordinates: { lat: '14.4644', lng: '75.9217' } },
  'Bellary': { state: 'Karnataka', coordinates: { lat: '15.1394', lng: '76.9214' } },
  'Bijapur': { state: 'Karnataka', coordinates: { lat: '16.8302', lng: '75.7100' } },
  'Shimoga': { state: 'Karnataka', coordinates: { lat: '13.9299', lng: '75.5681' } },
  
  // Kerala
  'Kochi': { state: 'Kerala', coordinates: { lat: '9.9312', lng: '76.2673' } },
  'Thiruvananthapuram': { state: 'Kerala', coordinates: { lat: '8.5241', lng: '76.9366' } },
  'Kozhikode': { state: 'Kerala', coordinates: { lat: '11.2588', lng: '75.7804' } },
  'Kollam': { state: 'Kerala', coordinates: { lat: '8.8932', lng: '76.6141' } },
  'Thrissur': { state: 'Kerala', coordinates: { lat: '10.5276', lng: '76.2144' } },
  'Alappuzha': { state: 'Kerala', coordinates: { lat: '9.4981', lng: '76.3388' } },
  'Palakkad': { state: 'Kerala', coordinates: { lat: '10.7867', lng: '76.6548' } },
  'Kottayam': { state: 'Kerala', coordinates: { lat: '9.5916', lng: '76.5222' } },
  
  // Madhya Pradesh
  'Indore': { state: 'Madhya Pradesh', coordinates: { lat: '22.7196', lng: '75.8577' } },
  'Bhopal': { state: 'Madhya Pradesh', coordinates: { lat: '23.2599', lng: '77.4126' } },
  'Jabalpur': { state: 'Madhya Pradesh', coordinates: { lat: '23.1815', lng: '79.9864' } },
  'Gwalior': { state: 'Madhya Pradesh', coordinates: { lat: '26.2183', lng: '78.1828' } },
  'Ujjain': { state: 'Madhya Pradesh', coordinates: { lat: '23.1765', lng: '75.7885' } },
  'Sagar': { state: 'Madhya Pradesh', coordinates: { lat: '23.8333', lng: '78.7167' } },
  
  // Maharashtra
  'Mumbai': { state: 'Maharashtra', coordinates: { lat: '19.0760', lng: '72.8777' } },
  'Pune': { state: 'Maharashtra', coordinates: { lat: '18.5204', lng: '73.8567' } },
  'Nagpur': { state: 'Maharashtra', coordinates: { lat: '21.1458', lng: '79.0882' } },
  'Aurangabad': { state: 'Maharashtra', coordinates: { lat: '19.8762', lng: '75.3433' } },
  'Nashik': { state: 'Maharashtra', coordinates: { lat: '19.9975', lng: '73.7898' } },
  'Solapur': { state: 'Maharashtra', coordinates: { lat: '17.6599', lng: '75.9064' } },
  'Amravati': { state: 'Maharashtra', coordinates: { lat: '20.9319', lng: '77.7523' } },
  'Kolhapur': { state: 'Maharashtra', coordinates: { lat: '16.7050', lng: '74.2433' } },
  'Ahmednagar': { state: 'Maharashtra', coordinates: { lat: '19.0833', lng: '74.7306' } },
  'Dhule': { state: 'Maharashtra', coordinates: { lat: '20.9002', lng: '74.7770' } },
  
  // Manipur
  'Imphal': { state: 'Manipur', coordinates: { lat: '24.8072', lng: '93.9441' } },
  
  // Meghalaya
  'Shillong': { state: 'Meghalaya', coordinates: { lat: '25.5788', lng: '91.8933' } },
  
  // Mizoram
  'Aizawl': { state: 'Mizoram', coordinates: { lat: '23.7271', lng: '92.7176' } },
  
  // Nagaland
  'Kohima': { state: 'Nagaland', coordinates: { lat: '25.6746', lng: '94.1110' } },
  
  // Odisha
  'Bhubaneswar': { state: 'Odisha', coordinates: { lat: '20.2961', lng: '85.8245' } },
  'Cuttack': { state: 'Odisha', coordinates: { lat: '20.4625', lng: '85.8828' } },
  'Rourkela': { state: 'Odisha', coordinates: { lat: '22.2604', lng: '84.8536' } },
  'Sambalpur': { state: 'Odisha', coordinates: { lat: '21.4669', lng: '83.9812' } },
  'Puri': { state: 'Odisha', coordinates: { lat: '19.8135', lng: '85.8312' } },
  
  // Puducherry
  'Puducherry': { state: 'Puducherry', coordinates: { lat: '11.9416', lng: '79.8083' } },
  
  // Punjab
  'Ludhiana': { state: 'Punjab', coordinates: { lat: '30.9010', lng: '75.8573' } },
  'Amritsar': { state: 'Punjab', coordinates: { lat: '31.6340', lng: '74.8723' } },
  'Jalandhar': { state: 'Punjab', coordinates: { lat: '31.3260', lng: '75.5762' } },
  'Patiala': { state: 'Punjab', coordinates: { lat: '30.3398', lng: '76.3869' } },
  
  // Rajasthan
  'Jaipur': { state: 'Rajasthan', coordinates: { lat: '26.9124', lng: '75.7873' } },
  'Jodhpur': { state: 'Rajasthan', coordinates: { lat: '26.2389', lng: '73.0243' } },
  'Kota': { state: 'Rajasthan', coordinates: { lat: '25.2138', lng: '75.8648' } },
  'Bikaner': { state: 'Rajasthan', coordinates: { lat: '28.0229', lng: '73.3119' } },
  'Ajmer': { state: 'Rajasthan', coordinates: { lat: '26.4499', lng: '74.6399' } },
  'Udaipur': { state: 'Rajasthan', coordinates: { lat: '24.5854', lng: '73.7125' } },
  'Alwar': { state: 'Rajasthan', coordinates: { lat: '27.5530', lng: '76.6346' } },
  
  // Sikkim
  'Gangtok': { state: 'Sikkim', coordinates: { lat: '27.3389', lng: '88.6065' } },
  
  // Tamil Nadu
  'Chennai': { state: 'Tamil Nadu', coordinates: { lat: '13.0827', lng: '80.2707' } },
  'Coimbatore': { state: 'Tamil Nadu', coordinates: { lat: '11.0168', lng: '76.9558' } },
  'Tiruchirappalli': { state: 'Tamil Nadu', coordinates: { lat: '10.7905', lng: '78.7047' } },
  'Madurai': { state: 'Tamil Nadu', coordinates: { lat: '9.9252', lng: '78.1198' } },
  'Salem': { state: 'Tamil Nadu', coordinates: { lat: '11.6643', lng: '78.1460' } },
  'Tirunelveli': { state: 'Tamil Nadu', coordinates: { lat: '8.7139', lng: '77.7567' } },
  'Erode': { state: 'Tamil Nadu', coordinates: { lat: '11.3410', lng: '77.7172' } },
  'Vellore': { state: 'Tamil Nadu', coordinates: { lat: '12.9165', lng: '79.1325' } },
  
  // Telangana
  'Hyderabad': { state: 'Telangana', coordinates: { lat: '17.3850', lng: '78.4867' } },
  'Warangal': { state: 'Telangana', coordinates: { lat: '17.9689', lng: '79.5941' } },
  'Nizamabad': { state: 'Telangana', coordinates: { lat: '18.6725', lng: '78.0941' } },
  
  // Tripura
  'Agartala': { state: 'Tripura', coordinates: { lat: '23.8315', lng: '91.2868' } },
  
  // Uttar Pradesh
  'Lucknow': { state: 'Uttar Pradesh', coordinates: { lat: '26.8467', lng: '80.9462' } },
  'Varanasi': { state: 'Uttar Pradesh', coordinates: { lat: '25.3176', lng: '82.9739' } },
  'Agra': { state: 'Uttar Pradesh', coordinates: { lat: '27.1767', lng: '78.0081' } },
  'Kanpur': { state: 'Uttar Pradesh', coordinates: { lat: '26.4499', lng: '80.3319' } },
  'Allahabad': { state: 'Uttar Pradesh', coordinates: { lat: '25.4358', lng: '81.8463' } },
  'Bareilly': { state: 'Uttar Pradesh', coordinates: { lat: '28.3670', lng: '79.4304' } },
  'Aligarh': { state: 'Uttar Pradesh', coordinates: { lat: '27.8974', lng: '78.0880' } },
  'Moradabad': { state: 'Uttar Pradesh', coordinates: { lat: '28.8386', lng: '78.7733' } },
  'Saharanpur': { state: 'Uttar Pradesh', coordinates: { lat: '29.9680', lng: '77.5552' } },
  'Gorakhpur': { state: 'Uttar Pradesh', coordinates: { lat: '26.7606', lng: '83.3732' } },
  'Noida': { state: 'Uttar Pradesh', coordinates: { lat: '28.5355', lng: '77.3910' } },
  'Ghaziabad': { state: 'Uttar Pradesh', coordinates: { lat: '28.6692', lng: '77.4538' } },
  'Mathura': { state: 'Uttar Pradesh', coordinates: { lat: '27.4924', lng: '77.6737' } },
  'Firozabad': { state: 'Uttar Pradesh', coordinates: { lat: '27.1592', lng: '78.3957' } },
  
  // Uttarakhand
  'Dehradun': { state: 'Uttarakhand', coordinates: { lat: '30.3165', lng: '78.0322' } },
  'Haridwar': { state: 'Uttarakhand', coordinates: { lat: '29.9457', lng: '78.1342' } },
  'Roorkee': { state: 'Uttarakhand', coordinates: { lat: '29.8664', lng: '77.8911' } },
  
  // West Bengal
  'Kolkata': { state: 'West Bengal', coordinates: { lat: '22.5726', lng: '88.3639' } },
  'Howrah': { state: 'West Bengal', coordinates: { lat: '22.5958', lng: '88.2636' } },
  'Durgapur': { state: 'West Bengal', coordinates: { lat: '23.5204', lng: '87.3119' } },
  'Asansol': { state: 'West Bengal', coordinates: { lat: '23.6739', lng: '86.9524' } },
  'Siliguri': { state: 'West Bengal', coordinates: { lat: '26.7271', lng: '88.3953' } },
  'Malda': { state: 'West Bengal', coordinates: { lat: '25.0000', lng: '88.5000' } },
  'Bardhaman': { state: 'West Bengal', coordinates: { lat: '23.2324', lng: '87.8615' } }
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
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [citySearchTerm, setCitySearchTerm] = useState('');
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsCityDropdownOpen(false);
        setCitySearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
    
    // Check if it's a predefined city
    const cityInfo = INDIAN_CITIES[cityName];
    if (cityInfo) {
      // Use predefined coordinates for instant response
      setFormData(prev => ({
        ...prev,
        city: cityName,
        state: cityInfo.state
      }));
      setCoordinates(cityInfo.coordinates);
      console.log(`Set predefined city ${cityName} data:`, cityInfo);
    } else {
      // For non-predefined cities, fetch coordinates
      setFormData(prev => ({
        ...prev,
        city: cityName,
        state: stateName
      }));
      fetchCoordinates(cityName, stateName);
    }
    
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
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Use Current Location</span>
                  </>
                )}
              </button>
            </div>
          </label>
          
          {/* Beautiful City Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
              className="w-full px-4 py-3 pr-12 border-2 border-amber-200 rounded-xl focus:border-amber-400 focus:ring-4 focus:ring-amber-100 transition-all duration-200 bg-white/90 backdrop-blur-sm text-left flex items-center justify-between"
            >
              <span className={formData.city ? 'text-amber-900' : 'text-amber-400'}>
                {formData.city || 'Select your city'}
              </span>
              <svg 
                className={`w-5 h-5 text-amber-400 transition-transform duration-200 ${isCityDropdownOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Dropdown Menu */}
            {isCityDropdownOpen && (
              <div className="absolute z-50 w-full mt-1 bg-white border border-amber-200 rounded-xl shadow-xl max-h-80 overflow-hidden">
                {/* Search Input */}
                <div className="p-3 border-b border-amber-100">
                  <input
                    type="text"
                    value={citySearchTerm}
                    onChange={(e) => setCitySearchTerm(e.target.value)}
                    placeholder="🔍 Search cities..."
                    className="w-full px-3 py-2 border border-amber-200 rounded-lg focus:border-amber-400 focus:ring-2 focus:ring-amber-100 text-sm"
                    autoFocus
                  />
                </div>
                
                {/* Cities List */}
                <div className="max-h-64 overflow-y-auto">
                  {Object.entries(INDIAN_CITIES)
                    .filter(([cityName]) => 
                      cityName.toLowerCase().includes(citySearchTerm.toLowerCase())
                    )
                    .sort(([a], [b]) => a.localeCompare(b))
                    .map(([cityName, cityInfo]) => (
                      <div
                        key={cityName}
                        className="px-4 py-3 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 cursor-pointer border-b border-amber-100 last:border-b-0 transition-all duration-150"
                        onClick={() => {
                          handleCitySelect(cityName, cityInfo.state);
                          setIsCityDropdownOpen(false);
                          setCitySearchTerm('');
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                          <div className="font-semibold text-amber-900">{cityName}</div>
                          <div className="text-sm text-amber-600">{cityInfo.state}</div>
                        </div>
                          {formData.city === cityName && (
                            <div className="text-green-500">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
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
            {formData.state && INDIAN_CITIES[formData.city] && (
              <span className="ml-2 px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full border border-green-200">
                Auto-selected
              </span>
            )}
          </label>
          <select
            value={formData.state}
            onChange={(e) => handleInputChange('state', e.target.value)}
            required
            className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-amber-100 transition-all duration-200 bg-white/90 backdrop-blur-sm appearance-none ${
              formData.state && INDIAN_CITIES[formData.city] 
                ? 'border-green-300 bg-green-50' 
                : 'border-amber-200 focus:border-amber-400'
            }`}
            style={{ 
              backgroundImage: "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='rgb(217, 119, 6)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e\")",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 1rem center",
              backgroundSize: "1.5em 1.5em",
              paddingRight: "3rem"
            }}
          >
            <option value="">Select State</option>
            {INDIAN_STATES.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
          {formData.state && INDIAN_CITIES[formData.city] && (
            <p className="text-xs text-green-600 flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              State automatically selected based on chosen city
            </p>
          )}
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