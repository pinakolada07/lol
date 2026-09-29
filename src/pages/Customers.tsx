import { motion } from 'framer-motion';
import { useState } from 'react';
import { Search, Plus, UserPlus } from 'lucide-react';
import { DashboardLayout } from '../components/Sidebar';
import { CustomerCard } from '../components/CustomerCard';
import { AskKhata } from '../components/AskKhata';
import { mockCustomers } from '../data/mockData';
import type { Customer } from '../types/models';

// ============================================================
// BOLKHATA — Customers Page
// ============================================================

export function Customers() {
  const [search, setSearch] = useState('');
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    (c.phone && c.phone.includes(search))
  );

  function handleAddCustomer() {
    if (!newName.trim()) return;
    const newCustomer: Customer = {
      id: `c-${Date.now()}`,
      name: newName.trim(),
      phone: newPhone.trim() || undefined,
      balance: 0,
      createdAt: new Date().toISOString(),
      lastTransactionAt: new Date().toISOString(),
    };
    setCustomers(prev => [newCustomer, ...prev]);
    setNewName('');
    setNewPhone('');
    setShowAddModal(false);
  }

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8 max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="font-black mb-1" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', letterSpacing: '-0.03em', color: '#F4F7F5' }}>
              Customers
            </h1>
            <p style={{ color: '#A8B7B1', fontSize: 14 }}>{customers.length} registered customers</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            id="add-customer-btn"
            className="btn-primary flex items-center gap-2 px-5 py-2.5 text-sm font-semibold"
          >
            <Plus size={16} />
            Add Customer
          </button>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative mb-6"
        >
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#A8B7B1' }} />
          <input
            type="text"
            placeholder="Search customers..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-2xl outline-none text-sm"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#F4F7F5',
            }}
            aria-label="Search customers"
          />
        </motion.div>

        {/* Summary stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Outstanding', value: `₹${mockCustomers.reduce((s, c) => s + c.balance, 0).toLocaleString('en-IN')}` },
            { label: 'Customers Due', value: `${mockCustomers.filter(c => c.balance > 0).length}` },
            { label: 'Settled', value: `${mockCustomers.filter(c => c.balance === 0).length}` },
          ].map((s, i) => (
            <div key={i} className="p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="text-xs mb-1" style={{ color: '#A8B7B1' }}>{s.label}</p>
              <p className="text-xl font-bold" style={{ color: '#F4F7F5' }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Customer grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16" style={{ color: '#A8B7B1' }}>
            <UserPlus size={40} className="mx-auto mb-3 opacity-30" />
            <p>No customers found</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {filtered.map((c, i) => (
              <CustomerCard key={c.id} customer={c} delay={i * 0.05} />
            ))}
          </div>
        )}
      </div>

      {/* Add Customer Modal */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
          onClick={() => setShowAddModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-sm p-6 rounded-3xl"
            style={{ background: '#101B20', border: '1px solid rgba(255,255,255,0.1)' }}
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold mb-5" style={{ color: '#F4F7F5' }}>Add Customer</h3>
            <div className="space-y-4 mb-6">
              <input
                type="text"
                placeholder="Customer name"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl outline-none text-sm"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#F4F7F5' }}
                aria-label="Customer name"
              />
              <input
                type="tel"
                placeholder="Phone number (optional)"
                value={newPhone}
                onChange={e => setNewPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-xl outline-none text-sm"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#F4F7F5' }}
                aria-label="Phone number"
              />
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowAddModal(false)} className="btn-ghost flex-1 py-2.5 text-sm">Cancel</button>
              <button onClick={handleAddCustomer} className="btn-primary flex-1 py-2.5 text-sm">Add Customer</button>
            </div>
          </motion.div>
        </div>
      )}

      <AskKhata />
    </DashboardLayout>
  );
}
