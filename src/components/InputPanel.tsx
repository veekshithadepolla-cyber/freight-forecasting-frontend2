import { useState } from 'react';
import {
  Anchor,
  ArrowRight,
  ArrowDownToLine,
  Calendar,
  Loader2,
  MapPin,
  Package,
  RotateCcw,
  Scale,
  Ship,
  Sparkles,
} from 'lucide-react';
import {
  CARGO_TYPES,
  DESTINATION_PORTS,
  MONTHS,
  ORIGINS,
  type PredictRequest,
} from '@/types';

interface InputPanelProps {
  onPredict: (req: PredictRequest) => void;
  loading: boolean;
}

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 4 }, (_, i) => CURRENT_YEAR + i);

function FieldLabel({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <label className="label-base flex items-center gap-1.5">
      <span className="text-slate-500">{icon}</span>
      {children}
    </label>
  );
}

export function InputPanel({ onPredict, loading }: InputPanelProps) {
  const [origin, setOrigin] = useState(ORIGINS[0]);
const [destination, setDestination] = useState(DESTINATION_PORTS[2]);
  const [cargo, setCargo] = useState(CARGO_TYPES[0]);
  const [quantity, setQuantity] = useState(50000);
  const [month, setMonth] = useState(9);
  const [year, setYear] = useState(2026);

  const samePort = origin === destination;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (samePort || loading) return;
    onPredict({ origin, destination, cargo, quantity, month, year });
  }

  function handleReset() {
    setOrigin(ORIGINS[0]);
setDestination(DESTINATION_PORTS[2]);
    setCargo(CARGO_TYPES[0]);
    setQuantity(50000);
    setMonth(9);
    setYear(2026);
  }

  return (
    <form onSubmit={handleSubmit} className="card card-hover flex flex-col gap-5 p-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-500/10">
            <Ship className="h-4 w-4 text-teal-400" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">Shipment Parameters</h2>
            <p className="text-[11px] text-slate-500">Configure your voyage forecast</p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium text-slate-500 transition hover:bg-white/5 hover:text-slate-300"
        >
          <RotateCcw className="h-3 w-3" /> Reset
        </button>
      </div>

      {/* Route section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-teal-400/80">
          <Anchor className="h-3 w-3" /> Route
        </div>
        <div>
          <FieldLabel icon={<MapPin className="h-3 w-3" />}>Origin Port</FieldLabel>
          <select className="input-base" value={origin} onChange={(e) => setOrigin(e.target.value)}>
            {ORIGINS.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
        <div>
          <FieldLabel icon={<ArrowDownToLine className="h-3 w-3" />}>Destination Port</FieldLabel>
          <select className="input-base" value={destination} onChange={(e) => setDestination(e.target.value)}>
           {DESTINATION_PORTS.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        {samePort && (
          <div className="rounded-md border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-400">
            Origin and destination must be different ports.
          </div>
        )}

        {/* Route visual */}
        <div className="flex items-center gap-2.5 rounded-lg border border-white/[0.06] bg-navy-925/60 px-3 py-2.5 text-xs">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-teal-400/70" />
          <span className="truncate font-medium text-slate-200">{origin}</span>
          <ArrowRight className="h-3.5 w-3.5 shrink-0 text-teal-400" />
          <span className="truncate font-medium text-slate-200">{destination}</span>
          <ArrowDownToLine className="h-3.5 w-3.5 shrink-0 text-teal-400/70" />
        </div>
      </div>

      {/* Cargo section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-teal-400/80">
          <Package className="h-3 w-3" /> Cargo
        </div>
        <div>
          <FieldLabel icon={<Package className="h-3 w-3" />}>Cargo Type</FieldLabel>
          <select className="input-base" value={cargo} onChange={(e) => setCargo(e.target.value)}>
            {CARGO_TYPES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <FieldLabel icon={<Scale className="h-3 w-3" />}>Cargo Quantity (tonnes)</FieldLabel>
          <input
            type="number"
            min={100}
            step={1000}
            className="input-base font-mono"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(0, Number(e.target.value)))}
          />
        </div>
      </div>

      {/* Forecast window */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-teal-400/80">
          <Calendar className="h-3 w-3" /> Forecast Window
        </div>
        <div>
          <FieldLabel icon={<Calendar className="h-3 w-3" />}>Forecast Starting Month</FieldLabel>
          <div className="grid grid-cols-2 gap-3">
            <select className="input-base" value={month} onChange={(e) => setMonth(Number(e.target.value))}>
              {MONTHS.map((m) => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>
            <select className="input-base" value={year} onChange={(e) => setYear(Number(e.target.value))}>
              {YEARS.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* CTA */}
      <button
        type="submit"
        disabled={loading || samePort}
        className="group flex w-full items-center justify-center gap-2 rounded-lg border border-teal-400/30 bg-teal-500/15 px-4 py-3 text-sm font-semibold text-teal-200 transition hover:border-teal-400/50 hover:bg-teal-500/25 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Forecasting…
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4" />
            Generate Forecast
          </>
        )}
      </button>
    </form>
  );
}
