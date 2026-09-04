import type { PredictRequest, PredictResponse } from '@/types';
import { API_URL } from '@/types';

export async function fetchForecast(req: PredictRequest): Promise<PredictResponse> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 60000);

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req),
      signal: controller.signal,
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`Server returned ${res.status}. ${text.slice(0, 200)}`);
    }

    const data = (await res.json()) as PredictResponse;
    if (!data.forecast || !Array.isArray(data.forecast) || data.forecast.length === 0) {
      throw new Error('The forecast response was empty or malformed.');
    }
    return data;
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw new Error(
  'The forecast server took too long to respond. Render may be waking up the backend. Please try again.'
);
    }
    if (err instanceof TypeError) {
      throw new Error(
        'Could not reach the forecast server at 127.0.0.1:8000. Make sure the FastAPI backend is running and allows cross-origin requests.',
      );
    }
    throw err;
  } finally {
    clearTimeout(timeout);
  }
}
