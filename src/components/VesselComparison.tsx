import { Ship, Trophy } from 'lucide-react';
import type { VesselSummary } from '@/lib/analytics';
import { formatFullCurrency } from '@/lib/analytics';

interface VesselComparisonProps {
  vessels: VesselSummary[];
}

export function VesselComparison({ vessels }: VesselComparisonProps) {
  if (vessels.length === 0) return null;

  const maxCost = Math.max(...vessels.map((v) => v.totalCost));

  return (
    <div className="card card-hover p-5">
      <div className="mb-5 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-800">
          <Ship className="h-4 w-4 text-slate-400" />
        </div>
        <div>
          <h2 className="section-title">Vessel Comparison</h2>
          <p className="section-sub mt-0.5">All predicted vessels ranked by total cost</p>
        </div>
      </div>

      <div className="space-y-3">
        {vessels.map((v) => (
          <div
            key={v.vessel}
            className={`rounded-lg border p-4 transition-colors ${
              v.cheapest
                ? 'border-teal-400/30 bg-teal-500/[0.06]'
                : 'border-white/[0.06] bg-navy-925/40 hover:border-white/10'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    v.cheapest ? 'bg-teal-500/15' : 'bg-navy-800/60'
                  }`}
                >
                  {v.cheapest ? (
                    <Trophy className="h-4 w-4 text-teal-400" />
                  ) : (
                    <Ship className="h-4 w-4 text-slate-400" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white">{v.vessel}</span>
                    {v.cheapest && (
                      <span className="chip bg-teal-500/15 text-teal-300">Cheapest</span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Best month: {v.month} · Avg rate ${v.avgFreightRate.toFixed(2)}/t
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="font-mono text-sm font-bold text-white">
                  {formatFullCurrency(v.totalCost)}
                </p>
                <p className="text-[11px] text-slate-500">total cost</p>
              </div>
            </div>

            {/* Cost bar */}
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-navy-800/60">
              <div
                className={`h-full rounded-full transition-all ${
                  v.cheapest ? 'bg-teal-400' : 'bg-slate-600'
                }`}
                style={{ width: `${(v.totalCost / maxCost) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
