import { Anchor, Bell, LayoutDashboard, Settings, Ship, TrendingUp } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Dashboard', icon: LayoutDashboard, active: true },
  { label: 'Forecasts', icon: TrendingUp, active: false },
  { label: 'Settings', icon: Settings, active: false },
];

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/[0.06] bg-navy-975/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo + product name */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-teal-400/20 bg-teal-500/10">
            <Anchor className="h-5 w-5 text-teal-400" strokeWidth={2.2} />
          </div>
          <div className="leading-tight">
            <span className="text-base font-bold tracking-tight text-white">FreightAI</span>
            <p className="hidden text-[11px] text-slate-400 sm:block">
              Freight Rate Forecasting &amp; Procurement Intelligence
            </p>
          </div>
        </div>

        {/* Dashboard navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              className={item.active ? 'nav-link-active' : 'nav-link'}
            >
              <span className="flex items-center gap-1.5">
                <item.icon className="h-3.5 w-3.5" />
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 text-xs text-slate-400 lg:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-50"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-400"></span>
            </span>
            Model online
          </div>
          <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/5 hover:text-slate-200">
            <Bell className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-800 text-xs font-semibold text-teal-300">
              OP
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
