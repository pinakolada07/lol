import { motion } from 'framer-motion';
import { Mic2, CheckCircle2, MessageSquare, Clock } from 'lucide-react';
import { DashboardLayout } from '../components/Sidebar';
import { AskKhata } from '../components/AskKhata';
import { mockVoiceHistory } from '../data/mockData';
import type { VoiceCommand } from '../types/models';

// ============================================================
// BOLKHATA — Voice History Page
// ============================================================

export function VoiceHistory() {
  return (
    <DashboardLayout>
      <div className="p-6 md:p-8 max-w-3xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <Mic2 size={20} style={{ color: '#16C784' }} />
            <h1 className="font-black" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', letterSpacing: '-0.03em', color: '#F4F7F5' }}>
              Voice History
            </h1>
          </div>
          <p style={{ color: '#A8B7B1', fontSize: 14 }}>Every voice command, interpreted and tracked.</p>
        </motion.div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Confirmed', value: mockVoiceHistory.filter(v => v.status === 'confirmed').length, icon: CheckCircle2, color: '#16C784' },
            { label: 'Answered', value: mockVoiceHistory.filter(v => v.status === 'answered').length, icon: MessageSquare, color: '#A8B7B1' },
            { label: 'Today', value: mockVoiceHistory.filter(v => new Date(v.createdAt).toDateString() === new Date('2026-09-29').toDateString()).length, icon: Clock, color: '#38E39A' },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <Icon size={16} className="mb-2" style={{ color }} />
              <p className="text-2xl font-bold mb-0.5" style={{ color: '#F4F7F5' }}>{value}</p>
              <p className="text-xs" style={{ color: '#A8B7B1' }}>{label}</p>
            </div>
          ))}
        </div>

        {/* Voice commands list */}
        <div className="space-y-4">
          {mockVoiceHistory.map((cmd, i) => (
            <VoiceCommandCard key={cmd.id} command={cmd} delay={i * 0.06} />
          ))}
        </div>
      </div>
      <AskKhata />
    </DashboardLayout>
  );
}

function VoiceCommandCard({ command, delay }: { command: VoiceCommand; delay: number }) {
  const date = new Date(command.createdAt);
  const isToday = new Date().toDateString() === date.toDateString();
  const dateStr = isToday ? 'Today' : date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  const timeStr = date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

  const statusConfig = {
    confirmed: { color: '#16C784', label: '✓ Added', bg: 'rgba(22,199,132,0.1)' },
    answered: { color: '#A8B7B1', label: '✓ Answered', bg: 'rgba(168,183,177,0.1)' },
    pending: { color: '#38E39A', label: 'Pending', bg: 'rgba(56,227,154,0.1)' },
    rejected: { color: '#ef4444', label: 'Rejected', bg: 'rgba(239,68,68,0.1)' },
  };
  const sc = statusConfig[command.status];

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.35 }}
      className="p-5 rounded-2xl"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{ background: 'rgba(22,199,132,0.1)' }}>
            <Mic2 size={14} style={{ color: '#16C784' }} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold mb-1" style={{ color: '#F4F7F5' }}>
              "{command.transcript}"
            </p>
            {/* Interpretation */}
            {command.interpretation && command.interpretation.customer && (
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="text-xs px-2 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.05)', color: '#A8B7B1' }}>
                  👤 {command.interpretation.customer}
                </span>
                {command.interpretation.amount && (
                  <span className="text-xs px-2 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.05)', color: '#38E39A' }}>
                    ₹{command.interpretation.amount}
                  </span>
                )}
                {command.interpretation.transactionType && (
                  <span className="text-xs px-2 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.05)', color: '#A8B7B1' }}>
                    {command.interpretation.transactionType === 'PAYMENT' ? 'Payment' : 'Credit'}
                  </span>
                )}
                <span className="text-xs px-2 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.05)', color: '#A8B7B1' }}>
                  {Math.round(command.interpretation.confidence * 100)}% confidence
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <span className="text-xs font-semibold px-2 py-1 rounded-full" style={{ background: sc.bg, color: sc.color }}>
            {sc.label}
          </span>
          <p className="text-xs mt-2" style={{ color: '#A8B7B1' }}>{dateStr} · {timeStr}</p>
        </div>
      </div>
    </motion.div>
  );
}
