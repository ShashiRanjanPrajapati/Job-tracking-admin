const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function fetchApplications(query = {}) {
  const params = new URLSearchParams();
  if (query.status && query.status !== "all") params.append("status", query.status);
  if (query.sort) params.append("sort", query.sort);
  if (query.page) params.append("page", query.page);
  if (query.limit) params.append("limit", query.limit);

  const url = `${API_BASE}/applications${params.toString() ? `?${params.toString()}` : ""}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch applications: ${res.statusText}`);
  const json = await res.json();
  return json.data || [];
}

export async function fetchStats() {
  const res = await fetch(`${API_BASE}/applications/stats`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch stats: ${res.statusText}`);
  const json = await res.json();
  return json.data || { total: 0, byStatus: {} };
}

export async function createApplication(data) {
  const res = await fetch(`${API_BASE}/applications`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.error || "Failed to create application");
  return json.data;
}

export async function updateApplication(id, data) {
  const res = await fetch(`${API_BASE}/applications/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.error || "Failed to update application");
  return json.data;
}

export async function deleteApplication(id) {
  const res = await fetch(`${API_BASE}/applications/${id}`, {
    method: "DELETE",
  });
  if (!res.ok && res.status !== 204) {
    const json = await res.json().catch(() => ({}));
    throw new Error(json.error || "Failed to delete application");
  }
  return true;
}
