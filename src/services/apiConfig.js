/**
 * Backend base URL configuration. Vite exposes only VITE_-prefixed env
 * vars via import.meta.env (process.env.REACT_APP_* from the old CRA app
 * does not work here) — see .env.example.
 */
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
