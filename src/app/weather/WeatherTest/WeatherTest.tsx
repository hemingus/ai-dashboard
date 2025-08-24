'use client';

import { useState } from 'react';
import styles from './WeatherTest.module.css';
import containerStyles from '../../../styles/container.module.css'
import inputStyles from '../../../styles/input.module.css'
import { useVoice } from "../../context/VoiceContext";

export default function WeatherByPlace() {
  const [place, setPlace] = useState('');
  const [placeHeader, setPlaceHeader] = useState('');
  const [weather, setWeather] = useState<any>(null);
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { speak } = useVoice();

  async function fetchWeather() {
    setPlaceHeader(place);
    setLoading(true);
    setError('');
    setWeather(null);
    setSummary('');

    try {
      const res = await fetch(`/api/weatherByPlace?place=${encodeURIComponent(place)}`);
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      const currentEntry = data.weather?.properties?.timeseries?.[0];
      const next1Hour = currentEntry?.data?.next_1_hours;

      const temp = currentEntry.data.instant.details.air_temperature;
      const condition = next1Hour?.summary.symbol_code.replace(/_/g, ' ');
      const wind = currentEntry.data.instant.details.wind_speed;
      const humidity = currentEntry.data.instant.details.relative_humidity;

      const summaryRes = await fetch('/api/weather-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          temperature: temp,
          condition,
          wind,
          humidity,
          location: place,
        }),
      });

      if (summaryRes.ok) {
        const json = await summaryRes.json();
        setSummary(json.summary);
      } else {
        setSummary('(Could not generate summary)');
      }

      setWeather(data.weather);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  function getIconUrl(symbolCode: string) {
    return `https://api.met.no/images/weathericons/svg/${symbolCode}.svg`;
  }

  return (
    <div className={`${containerStyles.container} ${styles.container}`}>
      <h2 className={styles.header}>Weather Forecast</h2>
      <input
        type="text"
        value={place}
        placeholder="Enter a place name"
        onChange={(e) => setPlace(e.target.value)}
        className={inputStyles.input}
      />
      <button
        onClick={fetchWeather}
        disabled={loading || !place.trim()}
        className={styles.button}
      >
        {loading ? 'Loading...' : 'Get Weather'}
      </button>
      

      {error && <p className={styles.error}>{error}</p>}

      {weather && (() => {
        const currentEntry = weather.properties?.timeseries?.[0];
        const next1Hour = currentEntry?.data?.next_1_hours;
        const next6Hours = currentEntry?.data?.next_6_hours;

        return (
          <div className={styles.card}>
            <h3>{placeHeader}</h3>
            <p><strong>Forecast time:</strong> {new Date(currentEntry.time).toLocaleString()}</p>

            <div className={styles.row}>
              <img
                src={getIconUrl(next1Hour?.summary.symbol_code || 'clearsky_day')}
                alt="Weather icon"
                className={styles.icon}
              />
              <p className={styles.heading}>
                {currentEntry.data.instant.details.air_temperature} °C
              </p>
            </div>

            <p><strong>Condition:</strong> {next1Hour?.summary.symbol_code.replace(/_/g, ' ') || 'N/A'}</p>
            <p><strong>Precipitation (1 hr):</strong> {next1Hour?.details.precipitation_amount ?? 0} mm</p>
            <p><strong>Precipitation (6 hrs):</strong> {next6Hours?.details.precipitation_amount ?? 0} mm</p>
            <p><strong>Wind:</strong> {currentEntry.data.instant.details.wind_speed} m/s from {currentEntry.data.instant.details.wind_from_direction}°</p>
            <p><strong>Humidity:</strong> {currentEntry.data.instant.details.relative_humidity} %</p>
            <p><strong>Pressure:</strong> {currentEntry.data.instant.details.pressure_at_sea_level} hPa</p>
            <p><strong>UV Index:</strong> {currentEntry.data.instant.details.ultraviolet_index_clear_sky ?? 'N/A'}</p>

            {summary && (
              <>
                <hr className={styles.divider} />
                <div className={styles.summary}>
                  <p><strong>Summary:</strong> {summary}</p>
                  <button className={styles.speakbutton} onClick={e => speak(summary)}>🔊 Speak</button>
                </div>
                
              </>
            )}
          </div>
        );
      })()}
    </div>
  );
}


