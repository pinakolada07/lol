import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../components/Sidebar';
import { VoiceRecorder } from '../components/VoiceRecorder';
import { TransactionCard, StatCard } from '../components/TransactionCard';
import { AskKhata } from '../components/AskKhata';
import { mockTransactions, analyticsData } from '../data/mockData';
import type { AIInterpretation } from '../types/models';
import type { Transaction } from '../types/models';

// ============================================================
// BOLKHATA — Dashboard Page
// ============================================================

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

export function Dashboard() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [confirmedCount, setConfirmedCount] = useState(0);

  function handleTransactionConfirmed(interpretation: AIInterpretation, _transcript: string) {
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      customerId: 'c1', // default to Ramesh for demo
      customerName: interpretation.customer,
      type: interpretation.transactionType,
      amount: interpretation.amount,
      description: interpretation.description,
      date: new Date().toISOString(),
      source: 'voice',
      confidence: interpretation.confidence,
    };
    setTransactions(prev => [newTx, ...prev]);
    setConfirmedCount(prev => prev + 1);
  }

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8 max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-black mb-1" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', letterSpacing: '-0.03em', color: '#F4F7F5' }}>
            {getGreeting()}.
          </h1>
          <p style={{ color: '#A8B7B1' }}>Here's what's happening in your shop today.</p>
        </motion.div>

        {/* Metric cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <StatCard label="TOTAL UDHAAR" value={`₹${analyticsData.totalOutstanding.toLocaleString('en-IN')}`} sub="Outstanding balance" accent delay={0.05} />
          <StatCard label="PAYMENTS TODAY" value={`₹${(analyticsData.todayPayments + confirmedCount * 500).toLocaleString('en-IN')}`} sub="↑ Updated live" trend="up" delay={0.1} />
          <StatCard label="CUSTOMERS DUE" value={`${analyticsData.customersDue}`} sub="Need follow-up" delay={0.15} />
        </div>

        {/* Voice card — primary action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 p-8 rounded-3xl"
          style={{
            background: 'rgba(16,27,32,0.8)',
            border: '1px solid rgba(22,199,132,0.2)',
            boxShadow: '0 0 40px rgba(22,199,132,0.07)',
          }}
        >
          <h2 className="text-lg font-bold mb-1 text-center" style={{ color: '#F4F7F5' }}>
            What happened in your shop?
          </h2>
          <p className="text-sm text-center mb-8" style={{ color: '#A8B7B1' }}>
            Speak in Hindi, Marathi, Hinglish or English
          </p>
          <VoiceRecorder onTransactionConfirmed={handleTransactionConfirmed} />
        </motion.div>

        {/* Recent transactions */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold" style={{ color: '#F4F7F5' }}>Recent Transactions</h2>
            <button
              onClick={() => navigate('/transactions')}
              className="text-xs font-medium"
              style={{ color: '#16C784' }}
            >
              View all →
            </button>
          </div>
          <div className="space-y-3">
            {transactions.slice(0, 6).map((tx, i) => (
              <TransactionCard key={tx.id} transaction={tx} delay={0.05 * i} />
            ))}
          </div>
        </div>
      </div>
      <AskKhata />
    </DashboardLayout>
  );
}
