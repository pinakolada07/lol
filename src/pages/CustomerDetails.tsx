import { motion } from 'framer-motion';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Calendar, Mic } from 'lucide-react';
import { DashboardLayout } from '../components/Sidebar';
import { VoiceRecorder } from '../components/VoiceRecorder';
import { AskKhata } from '../components/AskKhata';
import { mockCustomers, mockTransactions } from '../data/mockData';
import type { Transaction, AIInterpretation } from '../types/models';

// ============================================================
// BOLKHATA — Customer Details / Khata Page
// ============================================================

export function CustomerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const customer = mockCustomers.find(c => c.id === id) || mockCustomers[0];
  const [transactions, setTransactions] = useState<Transaction[]>(
    mockTransactions.filter(t => t.customerId === (id || 'c1'))
  );
  const [showVoice, setShowVoice] = useState(false);

  const balance = transactions.reduce((sum, t) => {
    return sum + (t.type === 'CREDIT' ? t.amount : -t.amount);
  }, 0);

  function handleTransactionConfirmed(interp: AIInterpretation) {
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      customerId: customer.id,
      customerName: customer.name,
      type: interp.transactionType,
      amount: interp.amount,
      description: interp.description,
      date: new Date().toISOString(),
      source: 'voice',
      confidence: interp.confidence,
    };
    setTransactions(prev => [newTx, ...prev]);
    setShowVoice(false);
  }

  // Group by date
  const grouped = transactions.reduce<Record<string, Transaction[]>>((acc, t) => {
    const date = new Date(t.date);
    const key = date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
    if (!acc[key]) acc[key] = [];
    acc[key].push(t);
    return acc;
  }, {});

  const createdDate = new Date(customer.createdAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8 max-w-3xl">
        {/* Back */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => navigate('/customers')}
          className="flex items-center gap-2 mb-6 text-sm font-medium transition-colors"
          style={{ color: '#A8B7B1' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#F4F7F5')}
          onMouseLeave={e => (e.currentTarget.style.color = '#A8B7B1')}
          aria-label="Back to customers"
        >
          <ArrowLeft size={16} />
          Customers
        </motion.button>

        {/* Customer header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start justify-between mb-8"
        >
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold"
              style={{ background: 'rgba(22,199,132,0.2)', color: '#16C784' }}
            >
              {customer.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-black mb-1" style={{ color: '#F4F7F5', letterSpacing: '-0.02em' }}>
                {customer.name}
              </h1>
              <div className="flex items-center gap-4 text-xs" style={{ color: '#A8B7B1' }}>
                {customer.phone && (
                  <span className="flex items-center gap-1">
                    <Phone size={11} /> {customer.phone}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Calendar size={11} /> Customer since {createdDate}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Outstanding card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-3xl mb-6"
          style={{
            background: 'rgba(16,27,32,0.8)',
            border: `1px solid ${balance > 0 ? 'rgba(22,199,132,0.25)' : 'rgba(255,255,255,0.08)'}`,
            boxShadow: balance > 0 ? '0 0 30px rgba(22,199,132,0.08)' : 'none',
          }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold mb-2" style={{ color: '#A8B7B1' }}>
                {balance > 0 ? 'Outstanding (they owe you)' : balance < 0 ? 'You owe them' : 'Settled'}
              </p>
              <p className="text-5xl font-black" style={{ color: balance > 0 ? '#38E39A' : balance < 0 ? '#ef4444' : '#A8B7B1', letterSpacing: '-0.03em' }}>
                ₹{Math.abs(balance).toLocaleString('en-IN')}
              </p>
            </div>
            <button
              onClick={() => setShowVoice(!showVoice)}
              id="add-transaction-voice"
              className="btn-primary flex items-center gap-2 px-4 py-2.5 text-sm font-bold"
            >
              <Mic size={16} />
              Add Transaction
            </button>
          </div>
        </motion.div>

        {/* Voice recorder inline */}
        {showVoice && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-6 rounded-3xl"
            style={{ background: 'rgba(16,27,32,0.8)', border: '1px solid rgba(22,199,132,0.2)' }}
          >
            <p className="text-sm font-semibold mb-4 text-center" style={{ color: '#A8B7B1' }}>
              What happened with {customer.name}?
            </p>
            <VoiceRecorder onTransactionConfirmed={handleTransactionConfirmed} compact />
          </motion.div>
        )}

        {/* Transaction Timeline */}
        <div>
          <h2 className="text-base font-bold mb-5" style={{ color: '#F4F7F5' }}>Transaction History</h2>

          {Object.entries(grouped).length === 0 ? (
            <p className="text-sm" style={{ color: '#A8B7B1' }}>No transactions yet.</p>
          ) : (
            <div className="space-y-8">
              {Object.entries(grouped).map(([dateLabel, txs], gi) => (
                <motion.div
                  key={dateLabel}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: gi * 0.08 }}
                >
                  <p className="text-xs font-bold tracking-widest mb-4" style={{ color: '#A8B7B1' }}>
                    {dateLabel.toUpperCase()}
                  </p>
                  <div className="space-y-0 relative pl-6" style={{ borderLeft: '1px solid rgba(255,255,255,0.08)' }}>
                    {txs.map((tx, i) => {
                      const time = new Date(tx.date).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
                      return (
                        <div key={tx.id} className="relative flex items-start gap-4 py-4" style={{ borderBottom: i < txs.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                          {/* Timeline dot */}
                          <div
                            className="absolute -left-[1.55rem] top-5 w-2.5 h-2.5 rounded-full"
                            style={{
                              background: tx.type === 'PAYMENT' ? '#16C784' : '#A8B7B1',
                              boxShadow: tx.type === 'PAYMENT' ? '0 0 8px rgba(22,199,132,0.5)' : 'none',
                            }}
                          />
                          {/* Content */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="text-sm font-semibold" style={{ color: '#F4F7F5' }}>
                                  {tx.type === 'PAYMENT' ? 'Payment Received' : 'Credit'}
                                </p>
                                {tx.description && (
                                  <p className="text-xs mt-0.5" style={{ color: '#A8B7B1' }}>{tx.description}</p>
                                )}
                                <p className="text-xs mt-1" style={{ color: '#A8B7B1' }}>{time}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-lg font-bold" style={{ color: tx.type === 'PAYMENT' ? '#38E39A' : '#F4F7F5' }}>
                                  {tx.type === 'PAYMENT' ? '+' : ''}₹{tx.amount.toLocaleString('en-IN')}
                                </p>
                                {tx.source === 'voice' && (
                                  <span className="text-xs" style={{ color: '#16C784' }}>🎙 Voice</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
      <AskKhata />
    </DashboardLayout>
  );
}

// ─── Khata Page (overview) ────────────────────────────────

export function Khata() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8 max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-black mb-1" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', letterSpacing: '-0.03em', color: '#F4F7F5' }}>
            Khata
          </h1>
          <p style={{ color: '#A8B7B1', fontSize: 14 }}>Your complete ledger overview</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          {mockCustomers.filter(c => c.balance > 0).map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              onClick={() => navigate(`/customers/${c.id}`)}
              className="p-5 rounded-2xl card-hover cursor-pointer flex items-center justify-between"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold" style={{ background: 'rgba(8,122,85,0.2)', color: '#16C784' }}>
                  {c.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: '#F4F7F5' }}>{c.name}</p>
                  <p className="text-xs" style={{ color: '#A8B7B1' }}>View Khata →</p>
                </div>
              </div>
              <p className="text-lg font-bold" style={{ color: '#38E39A' }}>₹{c.balance.toLocaleString('en-IN')}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <AskKhata />
    </DashboardLayout>
  );
}
