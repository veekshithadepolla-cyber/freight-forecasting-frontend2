import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { ForecastPoint } from '@/types';

interface ForecastChartProps {
  data: ForecastPoint[];
}

interface TooltipPayloadItem {
  value: number;
  name: string;
  color: string;
  dataKey: string;
}

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}) {
  if (!active || !payload || payload.length === 0) return null;
  const freight = payload.find((p) => p.dataKey === 'freight_rate');
  const bunker = payload.find((p) => p.dataKey === 'bunker_price');
  return (
    <div className="rounded-lg border border-white/10 bg-navy-900/95 px-3.5 py-2.5 text-xs shadow-card">
      <p className="mb-2 font-semibold text-white">{label}</p>
      {freight && (
        <div className="flex items-center justify-between gap-6">
          <span className="flex items-center gap-1.5 text-slate-400">
            <span className="h-2 w-2 rounded-full" style={{ background: '#22d3ee' }} />
            Freight Rate
          </span>
          <span className="font-mono font-semibold text-teal-300">
            ${freight.value.toFixed(2)}/t
          </span>
        </div>
      )}
      {bunker && (
        <div className="mt-1 flex items-center justify-between gap-6">
          <span className="flex items-center gap-1.5 text-slate-400">
            <span className="h-2 w-2 rounded-full" style={{ background: '#fbbf24' }} />
            Bunker Price
          </span>
          <span className="font-mono font-semibold text-amber-300">
            ${bunker.value.toFixed(2)}/t
          </span>
        </div>
      )}
    </div>
  );
}

export function ForecastChart({ data }: ForecastChartProps) {
  return (
    <div className="card card-hover p-5">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="section-title">5-Month Freight Rate Forecast</h2>
          <p className="section-sub mt-0.5">
            Predicted freight rate and bunker price ($/tonne) across the forecast horizon
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5 text-slate-400">
            <span className="h-2.5 w-2.5 rounded-full bg-teal-400" /> Freight Rate
          </span>
          <span className="flex items-center gap-1.5 text-slate-400">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" /> Bunker Price
          </span>
        </div>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 8, right: 16, left: -4, bottom: 0 }}>
            <defs>
              <linearGradient id="freightGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.18} />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              axisLine={{ stroke: 'rgba(255,255,255,0.08)' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={52}
              tickFormatter={(v: number) => `$${v.toFixed(0)}`}
            />
            <Tooltip content={<ChartTooltip />} />
            <Area
              type="monotone"
              dataKey="freight_rate"
              fill="url(#freightGradient)"
              stroke="none"
              dot={false}
              activeDot={false}
            />
            <Line
              type="monotone"
              dataKey="freight_rate"
              name="Freight Rate"
              stroke="#22d3ee"
              strokeWidth={2.5}
              dot={{ r: 4, fill: '#0c1628', stroke: '#22d3ee', strokeWidth: 2 }}
              activeDot={{ r: 6, fill: '#22d3ee', strokeWidth: 2, stroke: '#0c1628' }}
            />
            <Line
              type="monotone"
              dataKey="bunker_price"
              name="Bunker Price"
              stroke="#fbbf24"
              strokeWidth={2}
              strokeDasharray="5 4"
              dot={{ r: 3, fill: '#0c1628', stroke: '#fbbf24', strokeWidth: 1.5 }}
              activeDot={{ r: 5, fill: '#fbbf24', strokeWidth: 2, stroke: '#0c1628' }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
