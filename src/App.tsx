import { useMemo, useState } from 'react';
import { Header } from '@/components/Header';
import { InputPanel } from '@/components/InputPanel';
import { KpiCards } from '@/components/KpiCards';
import { ForecastChart } from '@/components/ForecastChart';
import { ForecastTable } from '@/components/ForecastTable';
import { ProcurementPanel } from '@/components/ProcurementPanel';
import { VesselComparison } from '@/components/VesselComparison';
import { EmptyState, ErrorState, LoadingState } from '@/components/States';
import { fetchForecast } from '@/api';
import type { ForecastPoint, PredictRequest } from '@/types';
import { cheapestVessel, computeKpis, vesselComparison } from '@/lib/analytics';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function App() {
  const [status, setStatus] = useState<Status>('idle');
  const [forecast, setForecast] = useState<ForecastPoint[]>([]);
  const [error, setError] = useState('');
  const [lastRequest, setLastRequest] = useState<PredictRequest | null>(null);

  async function handlePredict(req: PredictRequest) {
    setStatus('loading');
    setError('');
    setLastRequest(req);
    try {
      const data = await fetchForecast(req);
      setForecast(data.forecast);
      setStatus('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong while fetching the forecast.');
      setStatus('error');
    }
  }

  const kpis = useMemo(() => (forecast.length ? computeKpis(forecast) : null), [forecast]);
  const pick = useMemo(() => (forecast.length ? cheapestVessel(forecast) : null), [forecast]);
  const vessels = useMemo(() => (forecast.length ? vesselComparison(forecast) : []), [forecast]);

  return (
    <div className="min-h-screen bg-navy-975 text-slate-200">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-20 h-96 w-96 rounded-full bg-teal-500/[0.04] blur-[140px]" />
        <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-teal-600/[0.03] blur-[140px]" />
      </div>

      <div className="relative">
        <Header />

        <main className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
          {/* Hero section */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Freight Rate Forecast
            </h1>
            <p className="mt-1.5 max-w-2xl text-sm text-slate-400">
              Forecast freight costs and identify the most economical vessel for your cargo.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[380px_1fr]">
            {/* Left: input panel */}
            <div className="lg:sticky lg:top-[80px] lg:self-start">
              <InputPanel onPredict={handlePredict} loading={status === 'loading'} />
            </div>

            {/* Right: results */}
            <div className="flex flex-col gap-6">
              {status === 'idle' && <EmptyState />}
              {status === 'loading' && <LoadingState />}
              {status === 'error' && <ErrorState message={error} />}

              {status === 'success' && kpis && (
                <>
                  <KpiCards kpis={kpis} />
                  <ForecastChart data={forecast} />
                  <ForecastTable data={forecast} cheapestMonth={pick?.month ?? null} />
                  <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                    {pick && lastRequest && (
                      <ProcurementPanel
                        pick={pick}
                        quantity={lastRequest.quantity}
                        origin={lastRequest.origin}
                        destination={lastRequest.destination}
                      />
                    )}
                    <VesselComparison vessels={vessels} />
                  </div>
                </>
              )}
            </div>
          </div>

          <footer className="mt-12 border-t border-white/[0.04] pt-6 text-center text-xs text-slate-600">
            FreightAI · Freight Rate Forecasting &amp; Procurement Intelligence
          </footer>
        </main>
      </div>
    </div>
  );
}
