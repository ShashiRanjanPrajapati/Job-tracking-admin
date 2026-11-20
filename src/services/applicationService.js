import { apiClient } from "./apiClient";

export const applicationService = {
  /**
   * Get applications with optional status, sort, page, limit
   */
  async getAll(query = {}) {
    const params = new URLSearchParams();
    if (query.status && query.status !== "all") params.append("status", query.status);
    if (query.sort) params.append("sort", query.sort);
    if (query.page) params.append("page", query.page);
    if (query.limit) params.append("limit", query.limit);

    const qs = params.toString();
    return apiClient(`/applications${qs ? `?${qs}` : ""}`);
  },

  /**
   * Get single application by ID
   */
  async getById(id) {
    return apiClient(`/applications/${id}`);
  },

  /**
   * Get stats (total & count by status)
   */
  async getStats() {
    return apiClient("/applications/stats");
  },

  /**
   * Create a new application
   */
  async create(payload) {
    return apiClient("/applications", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  /**
   * Update an existing application (partial or full)
   */
  async update(id, payload) {
    return apiClient(`/applications/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  },

  /**
   * Delete an application
   */
  async delete(id) {
    return apiClient(`/applications/${id}`, {
      method: "DELETE",
    });
  },
};
