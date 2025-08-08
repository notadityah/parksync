/**
 * ParkSync API Service
 * Handles all API communications with the FastAPI backend
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

class ParkingAPI {
  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  /**
   * Generic request handler with error handling
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.detail || `API request failed: ${response.status}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error);
      throw error;
    }
  }

  /**
   * Get all streets parking data
   */
  async getAllStreets() {
    return this.request("/api/parking/streets");
  }

  /**
   * Get specific street details
   * @param {string} streetName - Name of the street (e.g., 'Collins', 'Bourke')
   * @param {boolean} includeBays - Whether to include individual bay details
   */
  async getStreetDetail(streetName, includeBays = false) {
    const params = includeBays ? "?include_bays=true" : "";
    return this.request(`/api/parking/street/${streetName}${params}`);
  }

  /**
   * Trigger manual data refresh
   */
  async refreshData() {
    return this.request("/api/parking/refresh", { method: "POST" });
  }

  /**
   * Get system status and statistics
   */
  async getSystemStatus() {
    return this.request("/api/parking/status");
  }

  /**
   * Test API connection
   */
  async testConnection() {
    return this.request("/api/parking/test");
  }

  /**
   * Health check
   */
  async healthCheck() {
    return this.request("/api/health");
  }

  /**
   * Get availability status color based on percentage
   */
  getStatusColor(status) {
    const colors = {
      Good: "#28a745", // Green
      Limited: "#ffc107", // Yellow
      "Very Limited": "#dc3545", // Red
    };
    return colors[status] || "#6c757d"; // Default gray
  }

  /**
   * Format last updated time
   */
  formatLastUpdated(isoString) {
    if (!isoString) return "Never updated";

    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return "Just updated";
    if (diffMins < 60) return `${diffMins} min ago`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;

    return date.toLocaleDateString();
  }

  /**
   * Get occupancy level description
   */
  getOccupancyDescription(percentage) {
    if (percentage >= 90) return "Nearly Full";
    if (percentage >= 70) return "Busy";
    if (percentage >= 50) return "Moderate";
    if (percentage >= 30) return "Available";
    return "Plenty Available";
  }
}

// Create and export a singleton instance
export const parkingApi = new ParkingAPI();
export default parkingApi;
