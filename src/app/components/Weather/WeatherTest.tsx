'use client';

import { useState } from 'react';
import styles from './WeatherTest.module.css';

export default function WeatherByPlace() {
  const [place, setPlace] = useState('');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function fetchWeather() {
    setLoading(true);
    setError('');
    setWeatherData(null);

    try {
      const res = await fetch(`/api/weatherByPlace?place=${encodeURIComponent(place)}`);
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setWeatherData(data.weather);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function getIconUrl(symbolCode: string) {
    return `https://api.met.no/images/weathericons/svg/${symbolCode}.svg`;
  }

  const currentEntry = weatherData?.properties?.timeseries?.[0];
  const next1Hour = currentEntry?.data?.next_1_hours;
  const next6Hours = currentEntry?.data?.next_6_hours;

  return (
    <div className={styles.container}>
      <h2>Weather Forecast</h2>
      <input
        type="text"
        value={place}
        placeholder="Enter a place name"
        onChange={(e) => setPlace(e.target.value)}
        className={styles.input}
      />
      <button
        onClick={fetchWeather}
        disabled={loading || !place.trim()}
        className={styles.button}
      >
        {loading ? 'Loading...' : 'Get Weather'}
      </button>

      {error && <p className={styles.error}>{error}</p>}

      {weatherData && currentEntry && (
        <div className={styles.card}>
          <h3>{weatherData.place || place}</h3>
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
        </div>
      )}
    </div>
  );
}

