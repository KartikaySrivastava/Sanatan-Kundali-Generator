from flask import Flask, request, jsonify
from flask_cors import CORS
import math
from datetime import datetime, timedelta
import swisseph as swe
import logging
from geopy.geocoders import Nominatim
from geopy.exc import GeocoderTimedOut, GeocoderUnavailable

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = Flask(__name__)
# Configure CORS properly
CORS(app, origins=["http://localhost:5173", "http://127.0.0.1:5173"],
     methods=["GET", "POST", "OPTIONS"],
     allow_headers=["Content-Type", "Accept"],
     max_age=3600)

@app.route('/', methods=['OPTIONS'])
def handle_options():
    response = app.make_default_options_response()
    return response

def get_coordinates(city, state):
    """
    Get latitude and longitude coordinates for a given city and state.
    """
    try:
        geolocator = Nominatim(user_agent="vedic_kundali_app")
        location = geolocator.geocode(f"{city}, {state}")
        
        if location is None:
            raise ValueError(f"Unable to find coordinates for {city}, {state}")
            
        logger.info(f"Retrieved coordinates for {city}, {state}: {location.latitude}, {location.longitude}")
        return location.latitude, location.longitude
        
    except (GeocoderTimedOut, GeocoderUnavailable) as e:
        logger.error(f"Geocoding error: {str(e)}")
        raise ValueError(f"Unable to geocode location: {str(e)}")

class VedicKundali:
    def __init__(self):
        self.ayanamsa = swe.SIDM_LAHIRI
        swe.set_sid_mode(self.ayanamsa)
        
        self.planets = {
            swe.SUN: "Sun",
            swe.MOON: "Moon",
            swe.MARS: "Mars",
            swe.MERCURY: "Mercury",
            swe.JUPITER: "Jupiter",
            swe.VENUS: "Venus",
            swe.SATURN: "Saturn",
            swe.MEAN_NODE: "Rahu",  # North Node
        }
        
        self.rashis = [
            "Mesha", "Vrishabha", "Mithuna", "Karka",
            "Simha", "Kanya", "Tula", "Vrishchika",
            "Dhanu", "Makara", "Kumbha", "Meena"
        ]
        
        self.house_significations = {
            1: "Personality, Physical body",
            2: "Wealth, Family, Speech",
            3: "Siblings, Courage, Communication",
            4: "Mother, Home, Emotions",
            5: "Children, Intelligence, Creative pursuits",
            6: "Enemies, Diseases, Debts",
            7: "Marriage, Partnership, Business",
            8: "Longevity, Obstacles, Hidden things",
            9: "Fortune, Higher learning, Dharma",
            10: "Career, Status, Authority",
            11: "Gains, Income, Aspirations",
            12: "Losses, Liberation, Foreign lands"
        }

    # [Previous methods remain the same]
    def calculate_julian_day(self, date, time_, tz_offset=5.5):
        dt_local = datetime.combine(date, time_)
        delta = timedelta(hours=int(tz_offset), minutes=int((tz_offset % 1) * 60))
        dt_utc = dt_local - delta
        jd = swe.julday(
            dt_utc.year,
            dt_utc.month,
            dt_utc.day,
            dt_utc.hour + dt_utc.minute / 60.0 + dt_utc.second / 3600.0
        )
        return jd

    def get_planet_position(self, julian_day, planet_id):
        planet_calc, _ = swe.calc_ut(julian_day, planet_id, swe.FLG_SIDEREAL)
        longitude = planet_calc[0]
        rashi_index = int(longitude // 30)
        degrees = longitude % 30
        return {
            "longitude": longitude,
            "rashi": self.rashis[rashi_index],
            "degrees": degrees,
            "rashi_number": rashi_index + 1
        }

    def get_moon_longitude(self, julian_day):
        moon_calc, _ = swe.calc_ut(julian_day, swe.MOON, swe.FLG_SIDEREAL)
        return moon_calc[0]

    def calculate_ascendant(self, julian_day, latitude, longitude):
        swe.set_topo(latitude, longitude, 0)
        houses_data = swe.houses_ex(julian_day, latitude, longitude, b'P')
        ascendant = houses_data[1][0]
        ayanamsa = swe.get_ayanamsa_ut(julian_day)
        ascendant = (ascendant - ayanamsa) % 360
        rashi = int(ascendant / 30)
        degrees = ascendant % 30
        return {
            "longitude": ascendant,
            "rashi": self.rashis[rashi],
            "degrees": degrees,
            "rashi_number": rashi + 1
        }

    def find_house(self, planet_longitude, ascendant_longitude):
        distance = (planet_longitude - ascendant_longitude) % 360
        house = int(distance // 30) + 1
        return house

    def determine_house_positions(self, planets_dict, ascendant):
        asc_long = ascendant["longitude"]
        house_positions = {}
        for planet, data in planets_dict.items():
            pl_long = data["longitude"]
            house_positions[planet] = self.find_house(pl_long, asc_long)
        return house_positions

    def calculate_vimshottari_dasha(self, moon_longitude, birth_date):
        # [Method implementation remains the same]
        nakshatras = [
            ("Ketu", 7), ("Venus", 20), ("Sun", 6), ("Moon", 10), ("Mars", 7),
            ("Rahu", 18), ("Jupiter", 16), ("Saturn", 19), ("Mercury", 17)
        ]
        nakshatra_degrees = 360 / 27
        nakshatra_index = int(moon_longitude // nakshatra_degrees) % 27
        nakshatra_start = nakshatra_index * nakshatra_degrees
        nakshatra_position = (moon_longitude - nakshatra_start) / nakshatra_degrees
        
        remaining_years = nakshatras[nakshatra_index % len(nakshatras)][1] * (1 - nakshatra_position)
        
        dasha_sequence = []
        current_date = birth_date
        
        logger.info(f"\n{'='*50}")
        logger.info(f"Birth Moon Longitude: {moon_longitude:.2f}°")
        logger.info(f"Nakshatra Index: {nakshatra_index}")
        logger.info(f"Position in Nakshatra: {nakshatra_position:.2%}")
        logger.info(f"{'='*50}")
        logger.info("\nVIMSHOTTARI MAHA DASHA SEQUENCE:")
        logger.info(f"{'='*50}")
        logger.info(f"{'Lord':<10} {'Start Date':<12} {'End Date':<12} {'Duration (Years)':<15}")
        logger.info(f"{'-'*50}")
        
        for i in range(len(nakshatras)):
            lord, full_years = nakshatras[(nakshatra_index + i) % len(nakshatras)]
            dasha_years = remaining_years if i == 0 else full_years
            dasha_end_date = current_date + timedelta(days=dasha_years * 365.25)
            
            logger.info(f"{lord:<10} {current_date.strftime('%Y-%m-%d'):<12} "
                       f"{dasha_end_date.strftime('%Y-%m-%d'):<12} {dasha_years:>14.2f}")
            
            dasha_sequence.append({
                "lord": lord,
                "start_date": current_date.strftime("%Y-%m-%d"),
                "end_date": dasha_end_date.strftime("%Y-%m-%d"),
                "duration": round(dasha_years, 2)
            })
            current_date = dasha_end_date
            remaining_years = 0
        
        logger.info(f"{'='*50}\n")
        return dasha_sequence

    def generate_complete_kundali(self, birth_date, birth_time, latitude, longitude, tz_offset=5.5):
        # [Method implementation remains the same]
        julian_day = self.calculate_julian_day(birth_date, birth_time, tz_offset)
        ascendant = self.calculate_ascendant(julian_day, latitude, longitude)
        planet_positions = {name: self.get_planet_position(julian_day, pid) for pid, name in self.planets.items()}
        moon_longitude = self.get_moon_longitude(julian_day)

        rahu_long = planet_positions["Rahu"]["longitude"]
        ketu_long = (rahu_long + 180) % 360
        ketu_rashi_index = int(ketu_long // 30)
        planet_positions["Ketu"] = {
            "longitude": ketu_long,
            "rashi": self.rashis[ketu_rashi_index],
            "degrees": ketu_long % 30,
            "rashi_number": ketu_rashi_index + 1
        }

        planet_house_positions = self.determine_house_positions(planet_positions, ascendant)

        house_rashis = {}
        for house in range(1, 13):
            house_longitude = (ascendant["longitude"] + (house - 1) * 30) % 360
            rashi_index = int(house_longitude // 30)
            house_rashis[house] = self.rashis[rashi_index]

        birth_datetime = datetime.combine(birth_date, birth_time)
        dasha_sequence = self.calculate_vimshottari_dasha(moon_longitude, birth_datetime)

        kundali = {
            "birth_details": {
                "date": birth_date.strftime("%Y-%m-%d"),
                "time": birth_time.strftime("%H:%M:%S"),
                "latitude": latitude,
                "longitude": longitude,
                "tz_offset": tz_offset
            },
            "ascendant": ascendant,
            "planets": planet_positions,
            "planet_house_positions": {
                planet: {
                    "house": house,
                    "significance": self.house_significations[house]
                } for planet, house in planet_house_positions.items()
            },
            "house_rashis": house_rashis,
            "vimshottari_dasha": dasha_sequence
        }
        return kundali
   


@app.route("/", methods=["POST", "OPTIONS"])
@app.route("/calculate", methods=["POST", "OPTIONS"])
def calculate_kundali():
    if request.method == "OPTIONS":
        response = app.make_default_options_response()
        response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        return response

    try:
        data = request.json
        name = data.get("name")
        city = data.get("city")
        state = data.get("state")

        if not city or not state:
            return jsonify({"error": "City and state are required"}), 400

        date_of_birth = datetime.strptime(data.get("dateOfBirth"), "%Y-%m-%d").date()
        time_of_birth_str = data.get("timeOfBirth")

        if len(time_of_birth_str) == 5:
            time_of_birth = datetime.strptime(time_of_birth_str, "%H:%M").time()
        elif len(time_of_birth_str) == 8:
            time_of_birth = datetime.strptime(time_of_birth_str, "%H:%M:%S").time()
        else:
            return jsonify({"error": "Invalid time format. Use HH:MM or HH:MM:SS"}), 400

        # Get coordinates from city and state
        try:
            latitude, longitude = get_coordinates(city, state)
        except ValueError as e:
            return jsonify({"error": str(e)}), 400

        tz_offset = 5.64  # Indian Standard Time

        calculator = VedicKundali()
        kundali = calculator.generate_complete_kundali(
            date_of_birth, 
            time_of_birth, 
            latitude, 
            longitude, 
            tz_offset
        )

        # Generate text summary
        kundali_summary = format_kundali_summary(kundali)

        response = jsonify({
            "name": name,
            "location": {
                "city": city,
                "state": state,
                "latitude": latitude,
                "longitude": longitude
            },
            "kundali": kundali,
            "summary_text": kundali_summary  # Include text summary in response
        })

        response.headers.add('Access-Control-Allow-Origin', '*')
        logger.info("Kundali calculation completed successfully\n")
        return response

    except Exception as e:
        logger.error(f"Error calculating kundali: {str(e)}")
        error_response = jsonify({"error": str(e)})
        error_response.headers.add('Access-Control-Allow-Origin', '*')
        return error_response, 500
    
def format_kundali_summary(kundali):
    
        summary = []

        # Add Birth Details
        birth_details = kundali['birth_details']
        summary.append("=== Kundali Summary ===")
        summary.append(f"Date of Birth: {birth_details['date']}")
        summary.append(f"Time of Birth: {birth_details['time']}")
        summary.append(f"Location: {birth_details['latitude']}, {birth_details['longitude']} (TZ Offset: {birth_details['tz_offset']})")
        summary.append("\n=== Ascendant ===")
        ascendant = kundali['ascendant']
        summary.append(f"Rashi: {ascendant['rashi']} ({ascendant['rashi_number']})")
        summary.append(f"Degrees: {ascendant['degrees']:.2f}\n")

        # Add Planets' Details
        summary.append("=== Planets ===")
        for planet, details in kundali['planets'].items():
            summary.append(f"{planet}: Rashi: {details['rashi']} ({details['rashi_number']}), Degrees: {details['degrees']:.2f}")

        # Add Planets' House Positions
        summary.append("\n=== Planet House Positions ===")
        for planet, house_details in kundali['planet_house_positions'].items():
            summary.append(f"{planet}: House {house_details['house']} ({house_details['significance']})")

        # Add Vimshottari Dasha Details
        summary.append("\n=== Vimshottari Dasha ===")
        for dasha in kundali['vimshottari_dasha']:
            summary.append(f"{dasha['lord']}: {dasha['start_date']} to {dasha['end_date']} ({dasha['duration']} years)")

        return "\n".join(summary)

@app.errorhandler(500)
def handle_500_error(error):
    logger.error(f"Internal server error: {error}")
    return jsonify({"error": "Internal server error", "message": str(error)}), 500

@app.errorhandler(404)
def handle_404_error(error):
    logger.error(f"Not found error: {error}")
    return jsonify({"error": "Not found", "message": str(error)}), 404

if __name__ == "__main__":
    # Run on port 5001 explicitly to match frontend expectations
    try:
        logger.info("Starting Flask server on port 5001...")
        app.run(debug=True, host='0.0.0.0', port=5001)
    except Exception as e:
        logger.error(f"Failed to start server: {e}")
        raise