import { motion } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid
} from 'recharts';
import { DashboardLayout } from '../components/Sidebar';
import { AskKhata } from '../components/AskKhata';
import { analyticsData, weeklyData, cashFlowData, mockCustomers } from '../data/mockData';

// ============================================================
// BOLKHATA — Analytics Page
// ============================================================

const tooltipStyle = {
  contentStyle: {
    background: '#101B20',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 12,
    color: '#F4F7F5',
    fontSize: 12,
  },
  labelStyle: { color: '#A8B7B1' },
  cursor: { fill: 'rgba(22,199,132,0.06)' },
};

export function Analytics() {
  const topCustomers = [...mockCustomers]
    .sort((a, b) => b.balance - a.balance)
    .slice(0, 5);

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8 max-w-5xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <p className="text-xs font-bold tracking-widest mb-1" style={{ color: '#16C784' }}>ANALYTICS</p>
          <h1 className="font-black mb-1" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', letterSpacing: '-0.03em', color: '#F4F7F5' }}>
            Business Overview
          </h1>
          <p style={{ color: '#A8B7B1', fontSize: 14 }}>Demo data — connect your account for live insights</p>
        </motion.div>

        {/* KPI grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Credit', value: `₹${analyticsData.totalCredit.toLocaleString('en-IN')}` },
            { label: 'Total Payments', value: `₹${analyticsData.totalPayments.toLocaleString('en-IN')}` },
            { label: 'Outstanding', value: `₹${analyticsData.totalOutstanding.toLocaleString('en-IN')}`, accent: true },
            { label: 'Active Customers', value: `${analyticsData.activeCustomers}` },
          ].map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="p-5 rounded-2xl"
              style={{
                background: m.accent ? 'rgba(8,122,85,0.15)' : 'rgba(255,255,255,0.03)',
                border: m.accent ? '1px solid rgba(22,199,132,0.25)' : '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <p className="text-xs mb-2" style={{ color: '#A8B7B1' }}>{m.label}</p>
              <p className="text-2xl font-bold" style={{ color: m.accent ? '#38E39A' : '#F4F7F5', letterSpacing: '-0.02em' }}>{m.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Cash flow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-3xl"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <p className="text-sm font-semibold mb-4" style={{ color: '#F4F7F5' }}>Cash Flow (Demo)</p>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={cashFlowData}>
                <defs>
                  <linearGradient id="inflowGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16C784" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#16C784" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="month" tick={{ fill: '#A8B7B1', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip {...tooltipStyle} formatter={(v: any) => [`₹${Number(v || 0).toLocaleString('en-IN')}`, '']} />
                <Area type="monotone" dataKey="inflow" stroke="#16C784" strokeWidth={2} fill="url(#inflowGrad)" name="Inflow" />
                <Area type="monotone" dataKey="outflow" stroke="#087A55" strokeWidth={2} fill="transparent" name="Outflow" strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-2">
              <span className="flex items-center gap-1.5 text-xs" style={{ color: '#A8B7B1' }}>
                <span className="w-3 h-0.5 rounded" style={{ background: '#16C784', display: 'inline-block' }} />
                Inflow
              </span>
              <span className="flex items-center gap-1.5 text-xs" style={{ color: '#A8B7B1' }}>
                <span className="w-3 h-0.5 rounded" style={{ background: '#087A55', display: 'inline-block' }} />
                Outflow
              </span>
            </div>
          </motion.div>

          {/* Weekly transactions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-6 rounded-3xl"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <p className="text-sm font-semibold mb-4" style={{ color: '#F4F7F5' }}>Weekly Transactions (Demo)</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={weeklyData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="day" tick={{ fill: '#A8B7B1', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip {...tooltipStyle} formatter={(v: any) => [`₹${Number(v || 0).toLocaleString('en-IN')}`, '']} />
                <Bar dataKey="credit" fill="rgba(22,199,132,0.25)" radius={[4, 4, 0, 0]} name="Credit" />
                <Bar dataKey="payment" fill="#16C784" radius={[4, 4, 0, 0]} name="Payment" />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-2">
              <span className="flex items-center gap-1.5 text-xs" style={{ color: '#A8B7B1' }}>
                <span className="w-3 h-3 rounded-sm inline-block" style={{ background: 'rgba(22,199,132,0.25)' }} />
                Credit
              </span>
              <span className="flex items-center gap-1.5 text-xs" style={{ color: '#A8B7B1' }}>
                <span className="w-3 h-3 rounded-sm inline-block" style={{ background: '#16C784' }} />
                Payment
              </span>
            </div>
          </motion.div>
        </div>

        {/* Outstanding customers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 rounded-3xl"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p className="text-sm font-semibold mb-5" style={{ color: '#F4F7F5' }}>Outstanding Customers (Top 5)</p>
          <div className="space-y-4">
            {topCustomers.map((c, i) => {
              const pct = (c.balance / topCustomers[0].balance) * 100;
              return (
                <div key={c.id} className="flex items-center gap-4">
                  <span className="text-xs w-4 text-center" style={{ color: '#A8B7B1' }}>{i + 1}</span>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold" style={{ background: 'rgba(22,199,132,0.15)', color: '#16C784' }}>
                    {c.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium" style={{ color: '#F4F7F5' }}>{c.name}</span>
                      <span className="text-sm font-bold" style={{ color: '#38E39A' }}>₹{c.balance.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ delay: 0.5 + i * 0.1, duration: 0.6, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{ background: 'linear-gradient(to right, #087A55, #16C784)' }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
      <AskKhata />
    </DashboardLayout>
  );
}
