import type { ForecastPoint } from '@/types';

export interface Kpis {
  avgFreightRate: number;
  avgBunkerPrice: number;
  totalLogisticsCost: number;
  recommendedVessel: string;
}

export function computeKpis(forecast: ForecastPoint[]): Kpis {
  const avgFreightRate =
    forecast.reduce((sum, f) => sum + f.freight_rate, 0) / forecast.length;
  const avgBunkerPrice =
    forecast.reduce((sum, f) => sum + f.bunker_price, 0) / forecast.length;
  const totalLogisticsCost = forecast.reduce((sum, f) => sum + f.total_cost, 0);

  // Recommended vessel = vessel used most frequently across the forecast
  const counts: Record<string, number> = {};
  for (const f of forecast) {
    counts[f.vessel] = (counts[f.vessel] ?? 0) + 1;
  }
  const recommendedVessel =
    Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? forecast[0]?.vessel ?? '—';

  return { avgFreightRate, avgBunkerPrice, totalLogisticsCost, recommendedVessel };
}

export interface ProcurementPick {
  vessel: string;
  month: string;
  totalCost: number;
  freightRate: number;
  bunkerPrice: number;
}

export function cheapestVessel(forecast: ForecastPoint[]): ProcurementPick | null {
  if (forecast.length === 0) return null;
  const cheapest = forecast.reduce((min, f) => (f.total_cost < min.total_cost ? f : min), forecast[0]);
  return {
    vessel: cheapest.vessel,
    month: cheapest.month,
    totalCost: cheapest.total_cost,
    freightRate: cheapest.freight_rate,
    bunkerPrice: cheapest.bunker_price,
  };
}

export interface VesselSummary {
  vessel: string;
  avgFreightRate: number;
  avgBunkerPrice: number;
  totalCost: number;
  cheapest: boolean;
  month: string;
}

export function vesselComparison(forecast: ForecastPoint[]): VesselSummary[] {
  const byVessel: Record<string, ForecastPoint[]> = {};
  for (const f of forecast) {
    (byVessel[f.vessel] ??= []).push(f);
  }
  const summaries = Object.entries(byVessel).map(([vessel, points]) => {
    const avgFreightRate = points.reduce((s, p) => s + p.freight_rate, 0) / points.length;
    const avgBunkerPrice = points.reduce((s, p) => s + p.bunker_price, 0) / points.length;
    const totalCost = points.reduce((s, p) => s + p.total_cost, 0);
    const cheapestPoint = points.reduce((min, p) => (p.total_cost < min.total_cost ? p : min), points[0]);
    return {
      vessel,
      avgFreightRate,
      avgBunkerPrice,
      totalCost,
      cheapest: false,
      month: cheapestPoint.month,
    };
  });
  const minTotal = Math.min(...summaries.map((s) => s.totalCost));
  return summaries
    .map((s) => ({ ...s, cheapest: s.totalCost === minTotal }))
    .sort((a, b) => a.totalCost - b.totalCost);
}

export function formatCurrency(value: number): string {
  if (Math.abs(value) >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}M`;
  }
  if (Math.abs(value) >= 1_000) {
    return `$${(value / 1_000).toFixed(1)}K`;
  }
  return `$${value.toFixed(0)}`;
}

export function formatFullCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}
