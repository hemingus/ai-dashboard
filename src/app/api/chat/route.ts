import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // IMPORTANT: no NEXT_PUBLIC
});

export async function POST(req: Request) {
try {
  const { message } = await req.json();
    if (!message) {
    return NextResponse.json(
    { error: "Missing 'message' in request body." },
    { status: 400 }
    );
    }

  const completion = await client.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "user", content: message }
    ]
  });
    return NextResponse.json({
    response: completion.choices[0].message.content,
  });
    } catch (err: any) {
        console.error("API ERROR:", err);

        return NextResponse.json(
        { error: "Internal server error." },
        { status: 500 }
        );
    }



}
