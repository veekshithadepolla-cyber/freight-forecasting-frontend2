import { AlertTriangle, LineChart, Loader2, Search } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="card flex flex-col items-center justify-center px-6 py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-teal-400/15 bg-teal-500/[0.06]">
        <LineChart className="h-8 w-8 text-teal-400" />
      </div>
      <h3 className="mt-5 text-base font-semibold text-white">No forecast generated yet</h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-400">
        Enter your shipment parameters and click Generate Forecast to see predicted freight rates,
        bunker prices, and a procurement recommendation for the next 5 months.
      </p>
      <div className="mt-6 flex items-center gap-2 rounded-lg border border-white/[0.06] bg-navy-925/50 px-3.5 py-2 text-xs text-slate-500">
        <Search className="h-3.5 w-3.5" />
        Awaiting input from the procurement desk
      </div>
    </div>
  );
}

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="card flex flex-col items-center justify-center border-amber-500/20 bg-amber-500/[0.03] px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-amber-500/20 bg-amber-500/10">
        <AlertTriangle className="h-7 w-7 text-amber-400" />
      </div>
      <h3 className="mt-5 text-base font-semibold text-white">Forecast unavailable</h3>
      <p className="mt-2 max-w-lg text-sm leading-relaxed text-slate-400">{message}</p>
    </div>
  );
}

export function LoadingState() {
  return (
    <div className="card flex flex-col items-center justify-center px-6 py-20">
      <Loader2 className="h-9 w-9 animate-spin text-teal-400" />
      <p className="mt-4 text-sm font-medium text-slate-300">Running the forecasting model…</p>
      <p className="mt-1 text-xs text-slate-500">Analyzing freight rates and bunker prices</p>
    </div>
  );
}
