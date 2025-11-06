from datetime import datetime, timedelta
import swisseph as swe

class VedicKundali:
    def __init__(self):
        self.ayanamsa = swe.SIDM_LAHIRI
        swe.set_sid_mode(self.ayanamsa)

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
        return longitude


def calculate_vimshottari_dasha(moon_longitude):
    # Nakshatras and their lords (in sequence)
    nakshatras = [
        ("Ketu", 7), ("Venus", 20), ("Sun", 6), ("Moon", 10), ("Mars", 7),
        ("Rahu", 18), ("Jupiter", 16), ("Saturn", 19), ("Mercury", 17)
    ]

    nakshatra_degrees = 360 / 27  # Each Nakshatra spans 13.3333 degrees
    nakshatra_index = int(moon_longitude // nakshatra_degrees) % 27
    nakshatra_start = nakshatra_index * nakshatra_degrees
    nakshatra_position = (moon_longitude - nakshatra_start) / nakshatra_degrees  # Fraction of the Nakshatra passed

    dasha_list = []
    remaining_years = nakshatras[nakshatra_index % len(nakshatras)][1] * (1 - nakshatra_position)

    # Create the Dasha sequence
    for i in range(len(nakshatras)):
        lord, full_years = nakshatras[(nakshatra_index + i) % len(nakshatras)]
        dasha_years = remaining_years if i == 0 else full_years
        dasha_list.append((lord, dasha_years))
        remaining_years = 0  # After the first Dasha, use full years

    return dasha_list


def calculate_dasha_within_limit(vimshottari_dasha, birth_date, limit_years=100):
    levels = {}
    current_date = birth_date
    total_years = 0

    for maha_dasha in vimshottari_dasha:
        maha_lord, maha_duration = maha_dasha

        # Stop calculation if exceeding the limit
        if total_years + maha_duration > limit_years:
            maha_duration = limit_years - total_years

        maha_end = current_date + timedelta(days=maha_duration * 365.25)
        levels[maha_lord] = {"start": current_date, "end": maha_end, "antar_dashas": {}}

        # Calculate Antar Dashas
        antar_start = current_date
        for antar_dasha in vimshottari_dasha:
            antar_lord, antar_fraction = antar_dasha
            antar_duration = maha_duration * (antar_fraction / 120)  # Total Vimshottari Dasha is 120 years
            antar_end = antar_start + timedelta(days=antar_duration * 365.25)

            if antar_end > maha_end:  # Prevent Antar Dasha from exceeding Maha Dasha
                break

            levels[maha_lord]["antar_dashas"][antar_lord] = {
                "start": antar_start,
                "end": antar_end,
                "pratyantar_dashas": {}
            }

            # Calculate Pratyantar Dashas
            pratyantar_start = antar_start
            for pratyantar_dasha in vimshottari_dasha:
                pratyantar_lord, pratyantar_fraction = pratyantar_dasha
                pratyantar_duration = antar_duration * (pratyantar_fraction / 120)
                pratyantar_end = pratyantar_start + timedelta(days=pratyantar_duration * 365.25)

                if pratyantar_end > antar_end:  # Prevent Pratyantar Dasha from exceeding Antar Dasha
                    break

                levels[maha_lord]["antar_dashas"][antar_lord]["pratyantar_dashas"][
                    pratyantar_lord
                ] = {
                    "start": pratyantar_start,
                    "end": pratyantar_end,
                }
                pratyantar_start = pratyantar_end
            antar_start = antar_end

        current_date = maha_end
        total_years += maha_duration

        if total_years >= limit_years:
            break

    return levels


# Sample Input
birth_date = datetime(2003, 3, 25, 17, 55)  # 25th March 2003, 17:55
latitude = 28.6139  # Example: Delhi
longitude = 77.2090
tz_offset = 5.5324

# Test Calculation
calculator = VedicKundali()
julian_day = calculator.calculate_julian_day(birth_date.date(), birth_date.time(), tz_offset)
moon_longitude = calculator.get_planet_position(julian_day, swe.MOON)

# Debugging logs
print(f"Julian Day: {julian_day}")
print(f"Moon Longitude: {moon_longitude:.2f}°")

# Calculate Vimshottari Dasha
vimshottari_dasha = calculate_vimshottari_dasha(moon_longitude)
print("\nVimshottari Dasha Sequence:")
for dasha in vimshottari_dasha:
    print(f"Lord: {dasha[0]}, Duration: {dasha[1]:.2f} years")

# Calculate Dasha Levels up to 100 years
dasha_levels = calculate_dasha_within_limit(vimshottari_dasha, birth_date, limit_years=100)
print("\nOngoing and Upcoming Dashas within 100 years:")
for maha_lord, maha_data in dasha_levels.items():
    print(f"\nMaha Dasha: {maha_lord}")
    print(f"  Start: {maha_data['start']}, End: {maha_data['end']}")
    for antar_lord, antar_data in maha_data["antar_dashas"].items():
        print(f"    Antar Dasha: {antar_lord}")
        print(f"      Start: {antar_data['start']}, End: {antar_data['end']}")
