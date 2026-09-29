import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';
import type { Transaction } from '../types/models';

// ============================================================
// BOLKHATA — Transaction Card Component
// ============================================================

interface TransactionCardProps {
  transaction: Transaction;
  animate?: boolean;
  delay?: number;
}

export function TransactionCard({ transaction, animate = true, delay = 0 }: TransactionCardProps) {
  const isPayment = transaction.type === 'PAYMENT';
  const date = new Date(transaction.date);
  const isToday = new Date().toDateString() === date.toDateString();
  const timeStr = date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
  const dateStr = isToday ? 'Today' : date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });

  const card = (
    <div
      className="flex items-center justify-between p-4 rounded-2xl card-hover"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* Left: icon + info */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: isPayment ? 'rgba(22,199,132,0.12)' : 'rgba(168,183,177,0.08)',
          }}
        >
          {isPayment
            ? <TrendingUp size={18} style={{ color: '#16C784' }} />
            : <TrendingDown size={18} style={{ color: '#A8B7B1' }} />
          }
        </div>
        <div>
          <p className="text-sm font-semibold" style={{ color: '#F4F7F5' }}>{transaction.customerName}</p>
          <p className="text-xs mt-0.5" style={{ color: '#A8B7B1' }}>
            {isPayment ? 'Payment received' : 'Credit'} · {dateStr} · {timeStr}
          </p>
        </div>
      </div>

      {/* Right: amount + source */}
      <div className="text-right">
        <p className="text-base font-bold" style={{ color: isPayment ? '#38E39A' : '#A8B7B1' }}>
          {isPayment ? '+' : ''}₹{transaction.amount.toLocaleString('en-IN')}
        </p>
        {transaction.source === 'voice' && (
          <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(22,199,132,0.1)', color: '#16C784' }}>
            🎙 AI
          </span>
        )}
      </div>
    </div>
  );

  if (!animate) return card;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
    >
      {card}
    </motion.div>
  );
}

// ─── Stat Card ─────────────────────────────────────────────

interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
  trend?: 'up' | 'down' | 'neutral';
  accent?: boolean;
  delay?: number;
}

export function StatCard({ label, value, sub, trend, accent, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="p-5 rounded-2xl card-hover"
      style={{
        background: accent
          ? 'linear-gradient(135deg, rgba(8,122,85,0.3), rgba(22,199,132,0.1))'
          : 'rgba(255,255,255,0.03)',
        border: accent
          ? '1px solid rgba(22,199,132,0.25)'
          : '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <p className="text-xs font-semibold tracking-wider mb-3 uppercase" style={{ color: '#A8B7B1' }}>{label}</p>
      <p className="text-3xl font-bold mb-1" style={{ color: accent ? '#38E39A' : '#F4F7F5', letterSpacing: '-0.02em' }}>
        {value}
      </p>
      {sub && (
        <p className="text-xs flex items-center gap-1" style={{ color: trend === 'up' ? '#16C784' : trend === 'down' ? '#ef4444' : '#A8B7B1' }}>
          {trend === 'up' && <ArrowUpRight size={12} />}
          {sub}
        </p>
      )}
    </motion.div>
  );
}
