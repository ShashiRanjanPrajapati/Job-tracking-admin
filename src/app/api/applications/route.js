import { NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();
    const targetUrl = `${BACKEND_URL}/api/applications${queryString ? `?${queryString}` : ""}`;

    const res = await fetch(targetUrl, {
      cache: "no-store",
    });

    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: `Failed to connect to backend at ${BACKEND_URL}. Ensure Express is running with 'npm run backend' (port 5000).`,
      },
      { status: 502 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const targetUrl = `${BACKEND_URL}/api/applications`;

    const res = await fetch(targetUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: `Failed to connect to backend at ${BACKEND_URL}. Ensure Express is running with 'npm run backend' (port 5000).`,
      },
      { status: 502 }
    );
  }
}
