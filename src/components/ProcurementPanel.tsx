import { CheckCircle2, Ship, Sparkles, Trophy } from 'lucide-react';
import type { ProcurementPick } from '@/lib/analytics';
import { formatFullCurrency } from '@/lib/analytics';

interface ProcurementPanelProps {
  pick: ProcurementPick | null;
  quantity: number;
  origin: string;
  destination: string;
}

export function ProcurementPanel({ pick, quantity, origin, destination }: ProcurementPanelProps) {
  if (!pick) return null;

  return (
    <div className="card card-hover relative overflow-hidden p-5">
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-teal-500/[0.06] blur-3xl" />

      <div className="relative">
        {/* Header */}
        <div className="mb-5 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-500/10">
            <Sparkles className="h-4 w-4 text-teal-400" />
          </div>
          <div>
            <h2 className="section-title">Procurement Recommendation</h2>
            <p className="section-sub mt-0.5">Optimal vessel and booking window</p>
          </div>
        </div>

        {/* Highlight box */}
        <div className="rounded-lg border border-teal-400/20 bg-teal-500/[0.05] p-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Recommended vessel */}
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-500/15">
                <Ship className="h-6 w-6 text-teal-400" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-teal-400/80">
                  Recommended Vessel
                </p>
                <p className="text-lg font-bold text-white">{pick.vessel}</p>
              </div>
            </div>

            {/* Lowest freight rate */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                Lowest Freight Rate
              </p>
              <p className="mt-1 font-mono text-lg font-bold text-teal-300">
                ${pick.freightRate.toFixed(2)}
                <span className="text-xs font-normal text-slate-500">/t</span>
              </p>
            </div>

            {/* Estimated total cost */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                Estimated Total Cost
              </p>
              <p className="mt-1 font-mono text-lg font-bold text-amber-300">
                {formatFullCurrency(pick.totalCost)}
              </p>
            </div>

            {/* Best month */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                Best Cost Month
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-lg font-bold text-white">
                <Trophy className="h-4 w-4 text-teal-400" />
                {pick.month}
              </p>
            </div>
          </div>
        </div>

        {/* Explanation */}
        <div className="mt-4 rounded-lg border border-white/[0.06] bg-navy-925/50 p-4">
          <p className="text-sm leading-relaxed text-slate-300">
            <span className="font-semibold text-white">{pick.vessel}</span> is the most cost-effective
            option for shipping <span className="font-semibold text-white">{quantity.toLocaleString()} tonnes</span>{' '}
            from <span className="font-semibold text-white">{origin}</span> to{' '}
            <span className="font-semibold text-white">{destination}</span> in{' '}
            <span className="font-semibold text-white">{pick.month}</span>. At a freight rate of{' '}
            <span className="font-mono text-teal-300">${pick.freightRate.toFixed(2)}/t</span> and bunker
            fuel at <span className="font-mono text-amber-300">${pick.bunkerPrice.toFixed(2)}/t</span>,
            the estimated total logistics cost is{' '}
            <span className="font-mono font-semibold text-teal-300">
              {formatFullCurrency(pick.totalCost)}
            </span>
            . Booking this vessel class during this window minimizes spend across the forecast horizon.
          </p>
        </div>

        <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
          <CheckCircle2 className="h-3.5 w-3.5 text-teal-500" />
          Recommendation generated from a 5-month predictive horizon.
        </div>
      </div>
    </div>
  );
}
