import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { Customer } from '../types/models';

// ============================================================
// BOLKHATA — Customer Card Component
// ============================================================

interface CustomerCardProps {
  customer: Customer;
  delay?: number;
}

export function CustomerCard({ customer, delay = 0 }: CustomerCardProps) {
  const navigate = useNavigate();
  const lastDate = new Date(customer.lastTransactionAt);
  const isToday = new Date().toDateString() === lastDate.toDateString();
  const dateLabel = isToday ? 'Today' : lastDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });

  const statusColor = customer.balance > 5000
    ? '#ef4444'
    : customer.balance > 0
      ? '#F4F7F5'
      : '#16C784';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35 }}
      onClick={() => navigate(`/customers/${customer.id}`)}
      className="p-5 rounded-2xl card-hover cursor-pointer group"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0"
            style={{ background: 'rgba(8,122,85,0.25)', color: '#16C784' }}
          >
            {customer.name.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-semibold" style={{ color: '#F4F7F5' }}>{customer.name}</p>
            {customer.phone && (
              <p className="text-xs" style={{ color: '#A8B7B1' }}>{customer.phone}</p>
            )}
          </div>
        </div>
        <ArrowRight
          size={16}
          className="transition-transform duration-200 group-hover:translate-x-1"
          style={{ color: '#A8B7B1' }}
        />
      </div>

      {/* Balance */}
      <div className="mb-3">
        <p className="text-xs mb-1" style={{ color: '#A8B7B1' }}>Outstanding</p>
        <p className="text-2xl font-bold" style={{ color: statusColor, letterSpacing: '-0.02em' }}>
          ₹{customer.balance.toLocaleString('en-IN')}
        </p>
      </div>

      {/* Last transaction */}
      <div className="flex items-center justify-between">
        <p className="text-xs" style={{ color: '#A8B7B1' }}>
          Last transaction · {dateLabel}
        </p>
        {customer.balance === 0 && (
          <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: 'rgba(22,199,132,0.12)', color: '#16C784' }}>
            Settled
          </span>
        )}
        {customer.balance > 5000 && (
          <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: 'rgba(239,68,68,0.12)', color: '#ef4444' }}>
            High Due
          </span>
        )}
      </div>
    </motion.div>
  );
}
