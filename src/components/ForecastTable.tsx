import { Ship, Trophy } from 'lucide-react';
import type { ForecastPoint } from '@/types';
import { formatFullCurrency } from '@/lib/analytics';

interface ForecastTableProps {
  data: ForecastPoint[];
  cheapestMonth: string | null;
}

export function ForecastTable({ data, cheapestMonth }: ForecastTableProps) {
  return (
    <div className="card card-hover overflow-hidden">
      <div className="border-b border-white/[0.06] px-5 py-4">
        <h2 className="section-title">Monthly Forecast Breakdown</h2>
        <p className="section-sub mt-0.5">Per-month projection across the 5-month horizon</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/[0.06] text-[11px] uppercase tracking-wider text-slate-500">
              <th className="px-5 py-3 font-semibold">Month</th>
              <th className="px-5 py-3 text-right font-semibold">Bunker Price</th>
              <th className="px-5 py-3 text-right font-semibold">Freight Rate</th>
              <th className="px-5 py-3 font-semibold">Vessel</th>
              <th className="px-5 py-3 text-right font-semibold">Total Cost</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => {
              const isCheapest = cheapestMonth === row.month;
              return (
                <tr
                  key={`${row.month}-${i}`}
                  className={`border-b border-white/[0.04] transition-colors last:border-0 hover:bg-white/[0.02] ${
                    isCheapest ? 'bg-teal-500/[0.04]' : ''
                  }`}
                >
                  <td className="whitespace-nowrap px-5 py-3 font-medium text-white">
                    <div className="flex items-center gap-2">
                      {isCheapest && <Trophy className="h-3.5 w-3.5 text-teal-400" />}
                      {row.month}
                    </div>
                  </td>
                  <td className="px-5 py-3 text-right font-mono text-amber-300/90">
                    ${row.bunker_price.toFixed(2)}
                  </td>
                  <td className="px-5 py-3 text-right font-mono text-teal-300">
                    ${row.freight_rate.toFixed(2)}
                  </td>
                  <td className="px-5 py-3">
                    <span className="chip bg-navy-800/60 text-slate-300">
                      <Ship className="h-3 w-3 text-slate-400" />
                      {row.vessel}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right font-mono font-semibold text-white">
                    {formatFullCurrency(row.total_cost)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
