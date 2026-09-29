import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Users, BookOpen, ArrowLeftRight,
  BarChart2, Mic2, Settings, Sparkles, Home, Mic, MoreHorizontal
} from 'lucide-react';
import { BolkhataLogo } from './Navbar';

// ============================================================
// BOLKHATA — Dashboard Sidebar + Mobile Bottom Nav
// ============================================================

const navItems = [
  { label: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'Customers', icon: Users, path: '/customers' },
  { label: 'Khata', icon: BookOpen, path: '/khata' },
  { label: 'Transactions', icon: ArrowLeftRight, path: '/transactions' },
  { label: 'Analytics', icon: BarChart2, path: '/analytics' },
  { label: 'Voice History', icon: Mic2, path: '/voice-history' },
];

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside
      className="desktop-sidebar flex flex-col h-full"
      style={{
        width: 240,
        background: '#101B20',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div className="p-6 pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <BolkhataLogo size="sm" />
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map(item => {
          const active = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`sidebar-item w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left ${active ? 'sidebar-item-active' : ''}`}
              style={{ color: active ? '#16C784' : '#A8B7B1' }}
              aria-current={active ? 'page' : undefined}
            >
              <item.icon size={18} />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Divider */}
      <div className="mx-4" style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />

      {/* AI Assistant */}
      <div className="p-4 space-y-2">
        <button
          onClick={() => navigate('/dashboard')}
          className="sidebar-item w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left"
          style={{ color: '#A8B7B1' }}
        >
          <Sparkles size={18} />
          <span className="text-sm font-medium">AI Assistant</span>
        </button>
        <button
          onClick={() => navigate('/settings')}
          className="sidebar-item w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left"
          style={{ color: '#A8B7B1' }}
        >
          <Settings size={18} />
          <span className="text-sm font-medium">Settings</span>
        </button>

        {/* AI status */}
        <div className="flex items-center gap-2 mt-3 px-3 py-3 rounded-xl" style={{ background: 'rgba(22,199,132,0.08)', border: '1px solid rgba(22,199,132,0.15)' }}>
          <span className="w-2 h-2 rounded-full" style={{ background: '#16C784', boxShadow: '0 0 6px rgba(22,199,132,0.6)' }} />
          <div>
            <p className="text-xs font-semibold" style={{ color: '#16C784' }}>AI Assistant</p>
            <p className="text-xs" style={{ color: '#A8B7B1' }}>Ready</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

// ─── Mobile Bottom Nav ────────────────────────────────────

export function MobileNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const mobileItems = [
    { label: 'Home', icon: Home, path: '/dashboard' },
    { label: 'Khata', icon: BookOpen, path: '/khata' },
    { label: '', icon: Mic, path: null, isMic: true },
    { label: 'Customers', icon: Users, path: '/customers' },
    { label: 'More', icon: MoreHorizontal, path: '/analytics' },
  ];

  return (
    <nav
      className="mobile-nav fixed bottom-0 left-0 right-0 z-40 items-center justify-around px-2 py-2"
      style={{
        background: 'rgba(16,27,32,0.95)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255,255,255,0.08)',
      }}
      aria-label="Mobile navigation"
    >
      {mobileItems.map((item, i) => {
        if (item.isMic) {
          return (
            <button
              key={i}
              onClick={() => navigate('/dashboard')}
              className="w-14 h-14 rounded-2xl flex items-center justify-center -mt-4 shadow-xl"
              style={{ background: 'linear-gradient(135deg, #087A55, #16C784)', boxShadow: '0 0 24px rgba(22,199,132,0.5)' }}
              aria-label="Voice input"
            >
              <Mic size={24} style={{ color: '#071719' }} />
            </button>
          );
        }
        const active = item.path && location.pathname === item.path;
        return (
          <button
            key={i}
            onClick={() => item.path && navigate(item.path)}
            className="flex flex-col items-center gap-0.5 px-3 py-1"
            style={{ color: active ? '#16C784' : '#A8B7B1' }}
          >
            <item.icon size={20} />
            <span style={{ fontSize: 10, fontWeight: 500 }}>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

// ─── Dashboard Layout Wrapper ──────────────────────────────

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#071719' }}>
      <Sidebar />
      <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
        {children}
      </main>
      <MobileNav />
    </div>
  );
}
