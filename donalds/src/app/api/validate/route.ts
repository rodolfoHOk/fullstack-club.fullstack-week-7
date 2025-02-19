import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");
  const fallback = searchParams.get("fallback");

  if (!url) {
    return NextResponse.json({ error: "url is required" }, { status: 400 });
  }

  if (!fallback) {
    return NextResponse.json(
      { error: "fallback is required" },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(url, { method: "HEAD" });
    if (response.ok) {
      return NextResponse.json({ url });
    } else {
      return NextResponse.json({ url: fallback });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch image", message: (error as Error).message },
      { status: 500 },
    );
  }
}
