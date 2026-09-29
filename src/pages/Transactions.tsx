import { motion } from 'framer-motion';
import { DashboardLayout } from '../components/Sidebar';
import { TransactionCard } from '../components/TransactionCard';
import { AskKhata } from '../components/AskKhata';
import { mockTransactions } from '../data/mockData';
import { useState } from 'react';

// ============================================================
// BOLKHATA — Transactions Page
// ============================================================

export function Transactions() {
  const [filter, setFilter] = useState<'ALL' | 'CREDIT' | 'PAYMENT'>('ALL');

  const filtered = mockTransactions.filter(t => filter === 'ALL' ? true : t.type === filter);

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8 max-w-3xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-black mb-1" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', letterSpacing: '-0.03em', color: '#F4F7F5' }}>
            Transactions
          </h1>
          <p style={{ color: '#A8B7B1', fontSize: 14 }}>All credits and payments</p>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6">
          {(['ALL', 'CREDIT', 'PAYMENT'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              id={`filter-${f.toLowerCase()}`}
              className="px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
              style={{
                background: filter === f ? 'rgba(22,199,132,0.15)' : 'rgba(255,255,255,0.04)',
                color: filter === f ? '#16C784' : '#A8B7B1',
                border: `1px solid ${filter === f ? 'rgba(22,199,132,0.35)' : 'rgba(255,255,255,0.06)'}`,
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Transaction list */}
        <div className="space-y-3">
          {filtered.map((tx, i) => (
            <TransactionCard key={tx.id} transaction={tx} delay={i * 0.04} />
          ))}
        </div>
      </div>
      <AskKhata />
    </DashboardLayout>
  );
}

// ─── Settings Page ─────────────────────────────────────────

export function Settings() {
  return (
    <DashboardLayout>
      <div className="p-6 md:p-8 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-black mb-1" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', letterSpacing: '-0.03em', color: '#F4F7F5' }}>
            Settings
          </h1>
        </motion.div>

        <div className="space-y-4">
          {[
            { label: 'Shop Name', value: 'My Kirana Store', type: 'text' },
            { label: 'Phone', value: '9876543210', type: 'tel' },
            { label: 'Primary Language', value: 'Hindi (हिंदी)', type: 'select' },
          ].map(s => (
            <div key={s.label} className="p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="text-xs font-semibold mb-2" style={{ color: '#A8B7B1' }}>{s.label}</p>
              <p className="text-sm font-medium" style={{ color: '#F4F7F5' }}>{s.value}</p>
            </div>
          ))}

          <div className="p-5 rounded-2xl" style={{ background: 'rgba(22,199,132,0.06)', border: '1px solid rgba(22,199,132,0.15)' }}>
            <p className="text-xs font-semibold mb-1" style={{ color: '#16C784' }}>Backend Integration</p>
            <p className="text-sm" style={{ color: '#A8B7B1' }}>Connect to Supabase for live data. Currently running in demo mode.</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
