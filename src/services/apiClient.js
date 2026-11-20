const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export async function apiClient(endpoint, options = {}) {
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const base = BASE_URL.replace(/\/+$/, "");
  const url = `${base}${cleanEndpoint}`;

  const config = {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  try {
    const res = await fetch(url, config);

    if (res.status === 204) {
      return null;
    }

    const data = await res.json().catch(() => ({}));

    if (!res.ok || (data && data.success === false)) {
      const errorMsg = data.error || `HTTP error! status: ${res.status}`;
      throw new Error(errorMsg);
    }

    return data.data !== undefined ? data.data : data;
  } catch (error) {
    if (error.name === "TypeError" && error.message.includes("fetch")) {
      throw new Error(
        "Could not connect to backend. Please ensure the Express server is running on http://localhost:3001."
      );
    }
    throw error;
  }
}
