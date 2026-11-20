import { NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

export async function GET() {
  try {
    const targetUrl = `${BACKEND_URL}/api/applications/stats`;

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
