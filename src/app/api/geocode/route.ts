export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const place = searchParams.get("place");

  if (!place) {
    return new Response("Missing 'place' query parameter", { status: 400 });
  }

  const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}`, {
    headers: {
      'User-Agent': 'ai-dashboard/1.0 heming.hanevik@gmail.com'
    }
  });

  if (!response.ok) {
    return new Response("Failed to fetch coordinates", { status: 500 });
  }

  const data = await response.json();

  if (!data.length) {
    return new Response("No results found", { status: 404 });
  }

  const { lat, lon, display_name } = data[0];

  return Response.json({ lat, lon, name: display_name });
}