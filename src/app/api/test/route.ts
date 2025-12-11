import { NextResponse } from "next/server";

export async function GET() {
  const key = process.env.OPENAI_API_KEY;
  return NextResponse.json({ key: key ? "found" : "missing" });
}