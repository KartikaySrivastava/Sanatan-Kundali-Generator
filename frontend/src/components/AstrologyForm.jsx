import React, { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { translate } from "../translations/translations";
import LanguageToggle from "./LanguageToggle";

const AstrologyForm = ({ setResult, setSummaryText }) => {
  const { language } = useLanguage();
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [tob, setTob] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = {
      name,
      dateOfBirth: dob,
      timeOfBirth: tob,
      city,
      state,
    };

    try {
      // Fetch Kundali Data
      const response = await fetch("http://127.0.0.1:5001", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch Kundali data");
      }

      const data = await response.json();
      setResult(data.kundali); // Update Kundali result in parent state

      // Fetch Additional Analysis
      const calculateResponse = await fetch("http://127.0.0.1:5001/calculate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!calculateResponse.ok) {
        throw new Error("Failed to fetch additional analysis");
      }

      const calculateData = await calculateResponse.json();
      setSummaryText(calculateData.summary_text); // Update summary_text in parent state
    } catch (error) {
      console.error("Error submitting form data:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCitySuggestions = async (input) => {
    if (input.trim() === "") {
      setCitySuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${input}&limit=5`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
            "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const suggestions = data.data.map((city) => ({
          cityName: city.name,
          stateName: city.region,
        }));
        setCitySuggestions(suggestions);
      }
    } catch (error) {
      console.error("Error fetching city suggestions:", error);
    }
  };

  const fetchCoordinates = async (cityName, stateName) => {
    try {
      const query = `${cityName}, ${stateName}`;
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=1&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY || 'demo'}`
      );
      
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          setCoordinates({
            lat: data[0].lat.toFixed(6),
            lng: data[0].lon.toFixed(6)
          });
        } else {
          setCoordinates({ lat: null, lng: null });
        }
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      setCoordinates({ lat: null, lng: null });
    }
  };

  const handleCityChange = (e) => {
    const input = e.target.value;
    setCity(input);
    fetchCitySuggestions(input);
    
    // Clear coordinates when city changes manually
    if (input.trim() === '') {
      setCoordinates({ lat: null, lng: null });
    } else if (input.length > 2) {
      // Try to fetch coordinates for typed city
      fetchCoordinates(input, state);
    }
  };

  const handleStateChange = (e) => {
    setState(e.target.value);
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-teal-700">
          {translate('🔮 Astrology Form', language)}
        </h2>
        <LanguageToggle />
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">{translate('Name 📝:', language)}</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">{translate('Date of Birth 📅:', language)}</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">
            {translate('Time of Birth ⏰ (HH:MM:SS):', language)}
          </label>
          <input
            type="time"
            step="1"
            value={tob}
            onChange={(e) => setTob(e.target.value)}
            required
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">{translate('City 🏙:', language)}</label>
          <input
            type="text"
            value={city}
            onChange={handleCityChange}
            required
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500"
          />
          {coordinates.lat && coordinates.lng && (
            <div id="latlng" className="mt-2 text-sm text-gray-600">
              📍 {translate('Coordinates:', language)} {coordinates.lat}, {coordinates.lng}
            </div>
          )}
          {citySuggestions.length > 0 && (
            <ul className="bg-white border rounded-lg mt-2 shadow-lg max-h-40 overflow-y-auto">
              {citySuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-teal-100 cursor-pointer"
                  onClick={() => {
                    setCity(suggestion.cityName);
                    setState(suggestion.stateName);
                    fetchCoordinates(suggestion.cityName, suggestion.stateName);
                    setCitySuggestions([]);
                  }}
                >
                  {suggestion.cityName}, {suggestion.stateName}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <label className="block font-semibold mb-1">{translate('State 🌆:', language)}</label>
          <input
            type="text"
            value={state}
            onChange={handleStateChange}
            required
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-2 rounded-lg shadow-lg hover:bg-teal-700"
        >
          {isLoading ? translate('Calculating...', language) : translate('🌟 Get Analysis', language)}
        </button>
      </form>
    </div>
  );
};

export default AstrologyForm;
