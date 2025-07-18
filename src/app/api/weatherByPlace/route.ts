export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const place = searchParams.get("place");

  if (!place) {
    return new Response("Missing 'place' query parameter", { status: 400 });
  }

  // Step 1: Geocode
  const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}`, {
    headers: { 'User-Agent': 'ai-dashboard/1.0 heming.hanevik@gmail.com' }
  });

  if (!geoRes.ok) {
    return new Response("Failed to fetch coordinates", { status: 500 });
  }

  const geoData = await geoRes.json();

  if (!geoData.length) {
    return new Response("No results found for place", { status: 404 });
  }

  const { lat, lon } = geoData[0];

  // Step 2: Fetch weather with lat/lon
  const weatherRes = await fetch(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`, {
    headers: { 'User-Agent': 'my-weather-app/1.0 heming.hanevik@gmail.com' }
  });

  if (!weatherRes.ok) {
    return new Response("Failed to fetch weather", { status: 500 });
  }

  const weatherData = await weatherRes.json();

  // Return combined data or just weatherData as needed
  return Response.json({ place, lat, lon, weather: weatherData });
}
