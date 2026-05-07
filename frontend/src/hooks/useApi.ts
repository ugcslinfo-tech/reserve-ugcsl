import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api';
const FALLBACK_URLS = (import.meta.env.VITE_API_FALLBACK_URLS ?? '').split(',').filter(Boolean);

const api = axios.create({ baseURL: API_BASE, withCredentials: true });

let csrfToken: string | null = null;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.code === 'ERR_NETWORK' && FALLBACK_URLS.length > 0) {
      for (const fallbackURL of FALLBACK_URLS) {
        try {
          const response = await axios({ ...error.config, baseURL: fallbackURL, withCredentials: true });
          api.defaults.baseURL = fallbackURL;
          return response;
        } catch { /* try next */ }
      }
    }
    throw error;
  }
);

async function getCsrfToken(): Promise<string> {
  if (csrfToken) return csrfToken;
  try {
    const res = await api.get<{ csrfToken: string }>('/csrf-token');
    csrfToken = res.data.csrfToken;
    return csrfToken;
  } catch (err) {
    csrfToken = null;
    throw err;
  }
}

export function useFetch<T>(endpoint: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .get<T>(endpoint)
      .then((res) => setData(res.data))
      .catch(() => setError('Failed to load data'))
      .finally(() => setLoading(false));
  }, [endpoint]);

  return { data, loading, error };
}

export async function submitContact(form: object) {
  const token = await getCsrfToken();
  const res = await api.post('/contact', form, {
    headers: { 'x-csrf-token': token },
  });
  csrfToken = null;
  return res.data;
}
