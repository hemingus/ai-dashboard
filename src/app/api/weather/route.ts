export async function GET() {
  const res = await fetch('https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=19.91&lon=10.75', {
    headers: {
      'User-Agent': 'ai-dashboard/1.0 heming.hanevik@gmail.com'
    }
  });

  const data = await res.json();

  return Response.json(data);
}