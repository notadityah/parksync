const BASE_URL = import.meta.env.VITE_API_GATEWAY_URL;

// In-memory cache to avoid duplicate network calls
let metricsPromise = null;
let metricsCache = null;

// Make sure that the environment is set up correctly
function assertEnv() {
  if (!BASE_URL) {
    throw new Error(
      "VITE_API_GATEWAY_URL is not set. Add it to your .env (VITE_API_GATEWAY_URL=...)"
    );
  }
}

// Add timeout to the promise
function withTimeout(promise, ms = 10000) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error(`Request timed out after ${ms}ms`)), ms)
  );
  return Promise.race([promise, timeout]);
}

// Check if the object has the expected metrics shape
function isMetrics(obj) {
  if (!obj || typeof obj !== "object") return false;
  const keys = [
    "population_2016",
    "population_2021",
    "population_pct_increase_2016_2021",
    "passenger_vehicles_2016",
    "passenger_vehicles_2021",
    "passenger_vehicles_pct_increase_2016_2021",
  ];
  return keys.every((k) => k in obj);
}

// Fetch metrics from the API
export async function fetchMetrics(signal) {
  assertEnv();
  // Ensure base URL has no trailing spaces
  const url = BASE_URL.trim();
  // If the API needs a path like /metrics, append here:
  const endpoint = url; // or `${url.replace(/\/$/, '')}/metrics`

  if (import.meta.env.DEV) {
    // Log request in dev to verify it fires
    console.log("[API] GET", endpoint);
  }

  const res = await withTimeout(
    fetch(endpoint, {
      method: "GET",
      headers: { Accept: "application/json" },
      signal,
    }),
    10000
  );

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API error ${res.status}: ${text || res.statusText}`);
  }

  let data;
  try {
    data = await res.json();
  } catch {
    throw new Error("Failed to parse JSON response");
  }

  if (!isMetrics(data)) {
    throw new Error("Unexpected API response shape");
  }

  if (import.meta.env.DEV) {
    console.log("[API] Response OK", data);
  }

  return data;
}

// Returns cached metrics or in-flight promise; ensures only one network request per session.
export function getMetricsOnce() {
  if (metricsCache) {
    if (import.meta.env.DEV) console.log("[API] getMetricsOnce: cache hit");
    return Promise.resolve(metricsCache);
  }
  if (!metricsPromise) {
    if (import.meta.env.DEV)
      console.log("[API] getMetricsOnce: starting network request");
    metricsPromise = fetchMetrics()
      .then((data) => {
        metricsCache = data;
        return data;
      })
      .catch((err) => {
        // Reset the promise on error so future calls can retry
        metricsPromise = null;
        throw err;
      });
  }
  return metricsPromise;
}

export default { fetchMetrics };
