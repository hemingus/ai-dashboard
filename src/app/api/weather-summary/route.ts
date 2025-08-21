import { NextRequest } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // stored in .env.local
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { temperature, condition, wind, humidity, location } = body;

  const prompt = `Write a concise and friendly weather forecast summary for ${location} in norwegian. 
It's currently ${temperature}°C with ${condition}, wind at ${wind} m/s, and humidity at ${humidity}%.`;

  try {
    const chat = await openai.chat.completions.create({
      model: "gpt-4o", // or 'gpt-3.5-turbo'
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    const summary = chat.choices[0].message.content;
    return Response.json({ summary });
  } catch (error: any) {
    console.error('OpenAI Error:', error);
    return new Response('Failed to generate summary', { status: 500 });
  }
}
