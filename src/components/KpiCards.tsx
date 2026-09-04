import { DollarSign, Fuel, Ship, TrendingUp } from 'lucide-react';
import type { Kpis } from '@/lib/analytics';
import { formatCurrency } from '@/lib/analytics';

interface KpiCardsProps {
  kpis: Kpis;
}

interface KpiConfig {
  label: string;
  value: string;
  sub: string;
  icon: React.ReactNode;
  iconClass: string;
  valueClass: string;
}

export function KpiCards({ kpis }: KpiCardsProps) {
  const cards: KpiConfig[] = [
    {
      label: 'Forecast Freight Rate',
      value: `$${kpis.avgFreightRate.toFixed(2)}`,
      sub: 'per tonne · 5-month avg',
      icon: <DollarSign className="h-5 w-5" />,
      iconClass: 'text-teal-400 bg-teal-500/10',
      valueClass: 'text-teal-300',
    },
    {
      label: 'Bunker Price',
      value: `$${kpis.avgBunkerPrice.toFixed(2)}`,
      sub: 'per tonne · 5-month avg',
      icon: <Fuel className="h-5 w-5" />,
      iconClass: 'text-teal-300 bg-teal-500/[0.07]',
      valueClass: 'text-white',
    },
    {
      label: 'Recommended Vessel',
      value: kpis.recommendedVessel,
      sub: 'optimal class for route',
      icon: <Ship className="h-5 w-5" />,
      iconClass: 'text-amber-400 bg-amber-500/10',
      valueClass: 'text-white',
    },
    {
      label: 'Projected Total Cost',
      value: formatCurrency(kpis.totalLogisticsCost),
      sub: '5-month logistics spend',
      icon: <TrendingUp className="h-5 w-5" />,
      iconClass: 'text-amber-400 bg-amber-500/10',
      valueClass: 'text-amber-300',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((c) => (
        <div key={c.label} className="card card-hover p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-925/60">
              <span className={c.iconClass + ' flex h-full w-full items-center justify-center rounded-lg'}>
                {c.icon}
              </span>
            </div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              {c.label}
            </p>
          </div>
          <p className={`mt-4 font-mono text-2xl font-semibold tracking-tight ${c.valueClass}`}>
            {c.value}
          </p>
          <p className="mt-1 text-xs text-slate-500">{c.sub}</p>
        </div>
      ))}
    </div>
  );
}
