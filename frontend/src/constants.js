/**
 * @type {Record<string, string>}
 */
export const env = {
  VITE_API_ENDPOINT: import.meta.env.VITE_API_ENDPOINT,
};

export const FETCH_OPTIONS = {
  method: "GET",
  credentials: "include",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": true,
  },
};
