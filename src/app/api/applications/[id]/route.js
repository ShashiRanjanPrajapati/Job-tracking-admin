import { NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const targetUrl = `${BACKEND_URL}/api/applications/${id}`;

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

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json().catch(() => ({}));
    const targetUrl = `${BACKEND_URL}/api/applications/${id}`;

    const res = await fetch(targetUrl, {
      method: "PUT",
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

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const targetUrl = `${BACKEND_URL}/api/applications/${id}`;

    const res = await fetch(targetUrl, {
      method: "DELETE",
    });

    if (res.status === 204) {
      return new NextResponse(null, { status: 204 });
    }

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
