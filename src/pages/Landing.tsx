import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, ArrowRight, CheckCircle2, Sparkles, Globe2, TrendingUp, Shield, Zap } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { VoiceRecorder } from '../components/VoiceRecorder';
import { AskKhata } from '../components/AskKhata';

// ============================================================
// BOLKHATA — Landing Page
// ============================================================

export function Landing() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen" style={{ background: '#071719' }}>
      {/* Global background glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div style={{
          position: 'absolute', top: 0, right: 0, width: '60%', height: '60%',
          background: 'radial-gradient(circle at 80% 10%, rgba(22,199,132,0.12), transparent 50%)',
        }} />
        <div style={{
          position: 'absolute', bottom: '20%', left: 0, width: '40%', height: '40%',
          background: 'radial-gradient(circle at 10% 80%, rgba(8,122,85,0.1), transparent 50%)',
        }} />
      </div>

      <Navbar />

      <HeroSection navigate={navigate} />
      <FeatureStrip />
      <JustSayItSection />
      <AIUnderstandsSection />
      <DigitalKhataSection navigate={navigate} />
      <AskKhataSection />
      <AnalyticsPreview />
      <LanguageSection />
      <FinalCTA navigate={navigate} />

      <footer className="text-center py-8 text-xs" style={{ color: '#A8B7B1', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        © 2026 BOLKHATA. Bas bolo. Hisaab ho jayega.
      </footer>

      <AskKhata />
    </div>
  );
}

// ─── Hero Section ────────────────────────────────────────

function HeroSection({ navigate }: { navigate: ReturnType<typeof useNavigate> }) {
  return (
    <section id="product" className="relative min-h-screen flex items-center pt-24 px-6">
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: copy */}
        <div>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8"
            style={{ background: 'rgba(22,199,132,0.1)', border: '1px solid rgba(22,199,132,0.2)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#16C784' }} />
            <span className="text-xs font-semibold" style={{ color: '#16C784' }}>AI-Powered Digital Khata</span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-black mb-6"
            style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)', lineHeight: 1.05, letterSpacing: '-0.03em', color: '#F4F7F5' }}
          >
            Your Kirana Khata.<br />
            Just by{' '}
            <span className="text-gradient-green">Speaking.</span>
          </motion.h1>

          {/* Body */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg mb-10 max-w-lg leading-relaxed"
            style={{ color: '#A8B7B1' }}
          >
            Record udhaar, payments and customer balances in your own language.
            BOLKHATA uses AI to understand what you say and keeps your khata updated.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-4 mb-8"
          >
            <button
              onClick={() => navigate('/dashboard')}
              id="cta-start-khata"
              className="btn-primary flex items-center gap-2 px-7 py-4 text-base font-bold"
            >
              <Mic size={20} />
              Start Your Khata
            </button>
            <a
              href="#how-it-works"
              id="cta-see-how"
              className="btn-ghost flex items-center gap-2 px-7 py-4 text-base font-medium"
            >
              See How It Works
              <ArrowRight size={18} />
            </a>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="flex flex-wrap gap-5"
          >
            {[
              '🎙 Voice Powered',
              '🇮🇳 Hindi + Marathi + Hinglish',
              '🤖 AI Verified',
            ].map(label => (
              <span key={label} className="text-sm flex items-center gap-1.5" style={{ color: '#A8B7B1' }}>
                <span style={{ color: '#16C784', fontSize: 10 }}>●</span>
                {label}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Right: hero visual */}
        <div className="relative flex justify-center">
          <HeroKhataCard />
        </div>
      </div>

      {/* Hero stats */}
      <HeroStats />
    </section>
  );
}

function HeroKhataCard() {
  return (
    <div className="relative w-full max-w-sm">
      {/* Main floating card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="animate-float glass-green rounded-3xl p-6"
        style={{ boxShadow: '0 0 60px rgba(22,199,132,0.15), 0 24px 48px rgba(0,0,0,0.4)' }}
      >
        {/* Card header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-xs font-semibold tracking-widest mb-1" style={{ color: '#16C784' }}>AI KHATA</p>
            <p className="text-lg font-bold" style={{ color: '#F4F7F5' }}>Ramesh Sharma</p>
          </div>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-base font-bold" style={{ background: 'rgba(22,199,132,0.2)', color: '#16C784' }}>
            R
          </div>
        </div>

        <div className="mb-5 p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.04)' }}>
          <p className="text-xs mb-1" style={{ color: '#A8B7B1' }}>Outstanding</p>
          <p className="text-4xl font-black" style={{ color: '#38E39A', letterSpacing: '-0.03em' }}>₹2,450</p>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div>
            <p style={{ color: '#A8B7B1' }} className="text-xs">Last payment</p>
            <p className="font-semibold" style={{ color: '#F4F7F5' }}>₹500 · Today</p>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: 'rgba(22,199,132,0.12)', border: '1px solid rgba(22,199,132,0.2)' }}>
            <CheckCircle2 size={12} style={{ color: '#16C784' }} />
            <span className="text-xs font-semibold" style={{ color: '#16C784' }}>AI VERIFIED</span>
          </div>
        </div>
      </motion.div>

      {/* Floating mini cards */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.9 }}
        className="absolute -right-8 top-4 glass rounded-2xl p-3 text-center"
        style={{ animation: 'float 3.5s ease-in-out infinite', animationDelay: '0.5s' }}
      >
        <p className="text-xs font-semibold" style={{ color: '#16C784' }}>+₹1,200</p>
        <p className="text-xs" style={{ color: '#A8B7B1' }}>Credit</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.0 }}
        className="absolute -left-10 bottom-16 glass rounded-2xl p-3 text-center"
        style={{ animation: 'float 4.5s ease-in-out infinite', animationDelay: '1s' }}
      >
        <p className="text-xs font-medium mb-1" style={{ color: '#A8B7B1' }}>🎙 Voice</p>
        <p className="text-xs" style={{ color: '#16C784' }}>Payment received</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="absolute -bottom-6 right-4 glass rounded-2xl px-4 py-2 flex items-center gap-2"
        style={{ animation: 'float 5s ease-in-out infinite', animationDelay: '2s' }}
      >
        <Sparkles size={12} style={{ color: '#16C784' }} />
        <div>
          <p className="text-xs font-semibold" style={{ color: '#16C784' }}>98%</p>
          <p style={{ fontSize: 10, color: '#A8B7B1' }}>AI Confidence</p>
        </div>
      </motion.div>

      {/* Waveform below card */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="flex items-center justify-center gap-1 mt-10"
      >
        {Array.from({ length: 16 }).map((_, i) => (
          <span
            key={i}
            className="wave-bar rounded-full"
            style={{
              width: 2,
              height: [4, 8, 14, 20, 14, 28, 20, 14, 28, 20, 14, 8, 20, 14, 8, 4][i],
              background: 'rgba(22,199,132,0.4)',
              animationDelay: `${i * 0.06}s`,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}

function HeroStats() {
  const stats = [
    { value: '4+', label: 'Languages' },
    { value: '24/7', label: 'Voice Access' },
    { value: 'AI', label: 'Transaction Parsing' },
    { value: '< 2s', label: 'Response Time' },
  ];

  return (
    <div className="absolute bottom-10 left-6 right-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + i * 0.1 }}
            className="text-center p-4 rounded-2xl"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <p className="text-2xl font-black mb-0.5" style={{ color: '#38E39A', letterSpacing: '-0.02em' }}>{s.value}</p>
            <p className="text-xs" style={{ color: '#A8B7B1' }}>{s.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Feature Strip ────────────────────────────────────────

function FeatureStrip() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const features = [
    { icon: '🎙', title: 'Speak Your Transactions', desc: 'No typing. Just tell your khata what happened.' },
    { icon: '🤖', title: 'AI Understands Your Hisaab', desc: 'Hindi, Marathi, Hinglish or English — all understood.' },
    { icon: '📒', title: 'Automatic Balance', desc: 'Every credit and payment updates instantly.' },
  ];

  return (
    <section id="features" ref={ref} className="px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-0 rounded-3xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15 }}
              className="p-8 relative"
              style={{
                background: 'rgba(255,255,255,0.02)',
                borderRight: i < 2 ? '1px solid rgba(255,255,255,0.08)' : 'none',
              }}
            >
              <span className="text-3xl mb-4 block">{f.icon}</span>
              <h3 className="text-base font-bold mb-2" style={{ color: '#F4F7F5' }}>{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#A8B7B1' }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Just Say It Section ──────────────────────────────────

function JustSayItSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="how-it-works" ref={ref} className="px-6 py-24">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-bold tracking-widest mb-3" style={{ color: '#16C784' }}>JUST SAY IT</p>
          <h2 className="font-black mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.03em', color: '#F4F7F5', lineHeight: 1.1 }}>
            Your voice becomes<br />your khata.
          </h2>
          <p className="text-lg mb-12" style={{ color: '#A8B7B1' }}>
            What happened in your shop?
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="p-10 rounded-3xl"
          style={{
            background: 'rgba(16,27,32,0.8)',
            border: '1px solid rgba(22,199,132,0.15)',
            boxShadow: '0 0 60px rgba(22,199,132,0.08)',
          }}
        >
          {/* Example phrase */}
          <div className="mb-8 p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.04)' }}>
            <p className="text-sm mb-1" style={{ color: '#A8B7B1' }}>Example:</p>
            <p className="text-xl font-semibold italic" style={{ color: '#F4F7F5' }}>"Ramesh ne 500 rupaye diye"</p>
          </div>

          {/* Voice recorder */}
          <VoiceRecorder />
        </motion.div>
      </div>
    </section>
  );
}

// ─── AI Understands Section ───────────────────────────────

function AIUnderstandsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="px-6 py-24" style={{ background: 'rgba(255,255,255,0.01)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-bold tracking-widest mb-3" style={{ color: '#16C784' }}>AI UNDERSTANDS YOU</p>
            <h2 className="font-black mb-5" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '-0.03em', color: '#F4F7F5', lineHeight: 1.1 }}>
              Speak naturally.<br />AI does the rest.
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: '#A8B7B1' }}>
              No forms, no dropdowns, no typing. BOLKHATA's AI engine understands how real shopkeepers speak — in Hindi, Marathi, Hinglish or English.
            </p>

            <div className="space-y-4">
              {[
                { lang: 'Hinglish', phrase: '"Ramesh ne paanch sau diye"' },
                { lang: 'Marathi', phrase: '"Ramesh कडून पाचशे रुपये मिळाले"' },
                { lang: 'English', phrase: '"Ramesh paid 500 rupees"' },
              ].map(ex => (
                <div
                  key={ex.lang}
                  className="flex items-center gap-4 p-4 rounded-2xl"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <span className="text-xs font-bold px-2 py-1 rounded-full" style={{ background: 'rgba(22,199,132,0.1)', color: '#16C784', flexShrink: 0 }}>
                    {ex.lang}
                  </span>
                  <span className="text-sm italic" style={{ color: '#F4F7F5' }}>{ex.phrase}</span>
                  <span className="ml-auto text-xs" style={{ color: '#A8B7B1', flexShrink: 0 }}>→ ₹500 Payment</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: the AI interpretation card demo */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="p-6 rounded-3xl"
            style={{
              background: 'rgba(16,27,32,0.9)',
              border: '1px solid rgba(22,199,132,0.15)',
              boxShadow: '0 0 40px rgba(22,199,132,0.08)',
            }}
          >
            {/* Demo AI interpretation */}
            <p className="text-xs font-bold tracking-widest mb-4" style={{ color: '#16C784' }}>AI UNDERSTANDING</p>

            <div className="p-4 rounded-2xl mb-4" style={{ background: 'rgba(255,255,255,0.04)' }}>
              <p className="text-xs mb-2" style={{ color: '#A8B7B1' }}>Transcript:</p>
              <p className="text-sm font-medium italic" style={{ color: '#F4F7F5' }}>"Ramesh ne paanch sau diye"</p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                { label: 'CUSTOMER', value: 'Ramesh Sharma', color: '#F4F7F5' },
                { label: 'TRANSACTION', value: 'Payment Received', color: '#16C784' },
                { label: 'AMOUNT', value: '₹500', color: '#38E39A' },
                { label: 'AI CONFIDENCE', value: '98%', color: '#16C784' },
              ].map(field => (
                <div key={field.label} className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)' }}>
                  <p className="text-xs mb-1" style={{ color: '#A8B7B1' }}>{field.label}</p>
                  <p className="text-sm font-bold" style={{ color: field.color }}>{field.value}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button className="btn-ghost flex-1 py-2.5 text-sm font-semibold">Edit</button>
              <button className="btn-primary flex-1 py-2.5 text-sm font-semibold">Confirm Transaction</button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Digital Khata Section ────────────────────────────────

function DigitalKhataSection({ navigate }: { navigate: ReturnType<typeof useNavigate> }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const transactions = [
    { type: 'PAYMENT', amount: 500, label: 'Payment received', time: '10:42 AM' },
    { type: 'CREDIT', amount: 1200, label: 'Credit — ration items', time: '4:21 PM · 22 Sep' },
    { type: 'PAYMENT', amount: 750, label: 'Payment received', time: '7:10 PM · 20 Sep' },
  ];

  return (
    <section id="customers" ref={ref} className="px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: khata visual */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="p-6 rounded-3xl"
            style={{
              background: 'rgba(16,27,32,0.9)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
            }}
          >
            {/* Customer header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold" style={{ background: 'rgba(22,199,132,0.2)', color: '#16C784' }}>R</div>
              <div>
                <p className="font-bold" style={{ color: '#F4F7F5' }}>Ramesh Sharma</p>
                <p className="text-xs" style={{ color: '#A8B7B1' }}>Customer since Jan 2026</p>
              </div>
              <button
                onClick={() => navigate('/customers/c1')}
                className="ml-auto btn-primary py-2 px-4 text-xs"
              >
                🎙 Add Transaction
              </button>
            </div>

            {/* Outstanding */}
            <div className="p-5 rounded-2xl mb-6" style={{ background: 'rgba(22,199,132,0.06)', border: '1px solid rgba(22,199,132,0.15)' }}>
              <p className="text-xs mb-1" style={{ color: '#A8B7B1' }}>Outstanding</p>
              <p className="text-4xl font-black" style={{ color: '#38E39A', letterSpacing: '-0.03em' }}>₹2,450</p>
            </div>

            {/* Timeline */}
            <div className="space-y-1">
              <p className="text-xs font-bold tracking-widest mb-3" style={{ color: '#A8B7B1' }}>TODAY</p>
              {transactions.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center justify-between py-3"
                  style={{ borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: t.type === 'PAYMENT' ? '#16C784' : '#A8B7B1' }} />
                    <div>
                      <p className="text-sm" style={{ color: '#F4F7F5' }}>{t.label}</p>
                      <p className="text-xs" style={{ color: '#A8B7B1' }}>{t.time}</p>
                    </div>
                  </div>
                  <p className="text-sm font-bold" style={{ color: t.type === 'PAYMENT' ? '#38E39A' : '#A8B7B1' }}>
                    {t.type === 'PAYMENT' ? '+' : ''}₹{t.amount}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: copy */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <p className="text-xs font-bold tracking-widest mb-3" style={{ color: '#16C784' }}>YOUR DIGITAL KHATA</p>
            <h2 className="font-black mb-5" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '-0.03em', color: '#F4F7F5', lineHeight: 1.1 }}>
              Every customer.<br />Every transaction.<br />Always updated.
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: '#A8B7B1' }}>
              A beautiful, real-time ledger for every customer. See who owes what, when they last paid, and manage your entire shop's credit with confidence.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Shield, label: 'Always Accurate', desc: 'AI double-checks before saving' },
                { icon: Zap, label: 'Instant Updates', desc: 'Balance changes in real-time' },
                { icon: TrendingUp, label: 'Smart Insights', desc: 'Know who needs reminders' },
                { icon: Globe2, label: 'Any Language', desc: 'Hindi, Marathi, English' },
              ].map(({ icon: Icon, label, desc }) => (
                <div key={label} className="p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <Icon size={18} className="mb-2" style={{ color: '#16C784' }} />
                  <p className="text-sm font-semibold mb-1" style={{ color: '#F4F7F5' }}>{label}</p>
                  <p className="text-xs" style={{ color: '#A8B7B1' }}>{desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Ask Khata Section ────────────────────────────────────

function AskKhataSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const examples = [
    { q: '"Ramesh ka kitna baaki hai?"', a: 'Ramesh currently owes ₹2,450\nLast payment: ₹500 today' },
    { q: '"Aaj kitna payment mila?"', a: 'Total payments today:\n₹8,200 from 4 customers' },
    { q: '"Sabse zyada kisne udhaar liya?"', a: 'Mahesh Kumar\n₹12,400 outstanding' },
  ];

  return (
    <section ref={ref} className="px-6 py-24" style={{ background: 'rgba(255,255,255,0.01)' }}>
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="text-xs font-bold tracking-widest mb-3" style={{ color: '#16C784' }}>ASK YOUR KHATA</p>
          <h2 className="font-black mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '-0.03em', color: '#F4F7F5', lineHeight: 1.1 }}>
            Your khata answers<br />your questions.
          </h2>
          <p className="text-base" style={{ color: '#A8B7B1' }}>
            Just ask. In Hindi or English. BOLKHATA AI responds instantly.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {examples.map((ex, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15 }}
              className="p-6 rounded-2xl text-left"
              style={{ background: 'rgba(16,27,32,0.8)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <p className="text-sm font-semibold mb-4 italic" style={{ color: '#F4F7F5' }}>{ex.q}</p>
              <div className="p-4 rounded-xl" style={{ background: 'rgba(22,199,132,0.06)', border: '1px solid rgba(22,199,132,0.15)' }}>
                <div className="flex items-center gap-1.5 mb-2">
                  <Sparkles size={12} style={{ color: '#16C784' }} />
                  <span className="text-xs font-semibold" style={{ color: '#16C784' }}>Khata AI</span>
                </div>
                <p className="text-sm whitespace-pre-line" style={{ color: '#F4F7F5' }}>{ex.a}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <p className="text-xs mt-6" style={{ color: '#A8B7B1' }}>Demo data shown. Connect to your shop for live answers.</p>
      </div>
    </section>
  );
}

// ─── Analytics Preview ────────────────────────────────────

function AnalyticsPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const navigate = useNavigate();

  const bars = [65, 80, 55, 90, 72, 85, 68];
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <section ref={ref} className="px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <p className="text-xs font-bold tracking-widest mb-3" style={{ color: '#16C784' }}>SEE YOUR BUSINESS</p>
          <h2 className="font-black mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '-0.03em', color: '#F4F7F5' }}>
            Analytics that make sense.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="p-8 rounded-3xl cursor-pointer"
          style={{ background: 'rgba(16,27,32,0.8)', border: '1px solid rgba(255,255,255,0.08)' }}
          onClick={() => navigate('/analytics')}
        >
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Credit', value: '₹21,600' },
              { label: 'Total Payments', value: '₹8,050' },
              { label: 'Outstanding', value: '₹42,500' },
              { label: 'Customers', value: '8' },
            ].map((m, i) => (
              <div key={i} className="p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-xs mb-1" style={{ color: '#A8B7B1' }}>{m.label}</p>
                <p className="text-xl font-bold" style={{ color: '#F4F7F5' }}>{m.value}</p>
              </div>
            ))}
          </div>

          {/* Mini bar chart */}
          <div>
            <p className="text-xs font-semibold mb-4" style={{ color: '#A8B7B1' }}>Weekly Transactions (Demo)</p>
            <div className="flex items-end gap-3">
              {bars.map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={inView ? { height: h * 1.2 } : { height: 0 }}
                    transition={{ delay: 0.4 + i * 0.08, duration: 0.5, ease: 'easeOut' }}
                    className="w-full rounded-t-lg"
                    style={{ background: i === 5 ? 'linear-gradient(to top, #16C784, #38E39A)' : 'rgba(22,199,132,0.2)' }}
                  />
                  <span className="text-xs" style={{ color: '#A8B7B1' }}>{days[i]}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs mt-4 text-center" style={{ color: '#A8B7B1' }}>
            Click to explore full analytics →
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Language Section ─────────────────────────────────────

function LanguageSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [activeLang, setActiveLang] = useState<'hi' | 'mr' | 'en'>('hi');

  const langs: Record<string, { label: string; phrase: string; code: string }> = {
    hi: { label: 'हिंदी', phrase: '"Ramesh ne paanch sau rupaye diye"', code: 'Hindi' },
    mr: { label: 'मराठी', phrase: '"Ramesh कडून पाचशे रुपये मिळाले"', code: 'Marathi' },
    en: { label: 'English', phrase: '"Ramesh paid five hundred rupees"', code: 'English' },
  };

  return (
    <section ref={ref} className="px-6 py-24" style={{ background: 'rgba(255,255,255,0.01)' }}>
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-10"
        >
          <p className="text-xs font-bold tracking-widest mb-3" style={{ color: '#16C784' }}>YOUR LANGUAGE</p>
          <h2 className="font-black mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '-0.03em', color: '#F4F7F5' }}>
            Speak the way you speak.
          </h2>
          <p className="text-base" style={{ color: '#A8B7B1' }}>
            All these mean the same transaction:
          </p>
        </motion.div>

        {/* Language selector */}
        <div className="flex justify-center gap-2 mb-8">
          {Object.entries(langs).map(([key, { label }]) => (
            <button
              key={key}
              onClick={() => setActiveLang(key as 'hi' | 'mr' | 'en')}
              id={`lang-${key}`}
              className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200"
              style={{
                background: activeLang === key ? 'rgba(22,199,132,0.2)' : 'rgba(255,255,255,0.04)',
                color: activeLang === key ? '#16C784' : '#A8B7B1',
                border: `1px solid ${activeLang === key ? 'rgba(22,199,132,0.4)' : 'rgba(255,255,255,0.08)'}`,
              }}
            >
              {label}
            </button>
          ))}
        </div>

        <motion.div
          key={activeLang}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-3xl mb-6"
          style={{ background: 'rgba(16,27,32,0.9)', border: '1px solid rgba(22,199,132,0.2)' }}
        >
          <p className="text-xs font-bold tracking-widest mb-4" style={{ color: '#16C784' }}>{langs[activeLang].code.toUpperCase()} INPUT</p>
          <p className="text-2xl font-bold italic mb-6" style={{ color: '#F4F7F5' }}>{langs[activeLang].phrase}</p>
          <div className="flex justify-center">
            <ArrowRight size={20} style={{ color: '#16C784' }} />
          </div>
        </motion.div>

        {/* Result */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Customer', value: 'Ramesh Sharma' },
            { label: 'Type', value: 'Payment Received' },
            { label: 'Amount', value: '₹500' },
          ].map(f => (
            <div key={f.label} className="p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="text-xs mb-1" style={{ color: '#A8B7B1' }}>{f.label}</p>
              <p className="text-sm font-bold" style={{ color: '#38E39A' }}>{f.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Final CTA ────────────────────────────────────────────

function FinalCTA({ navigate }: { navigate: ReturnType<typeof useNavigate> }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="px-6 py-32 text-center relative overflow-hidden">
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(circle at 50% 50%, rgba(22,199,132,0.1), transparent 60%)',
        pointerEvents: 'none',
      }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto relative z-10"
      >
        <p className="text-xs font-bold tracking-widest mb-6" style={{ color: '#16C784' }}>
          Ready to leave the notebook behind?
        </p>
        <h2 className="font-black mb-6" style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)', letterSpacing: '-0.03em', color: '#F4F7F5', lineHeight: 1.0 }}>
          Your khata.<br />
          Your voice.<br />
          <span className="text-gradient-green">Your business.</span>
        </h2>
        <p className="text-lg mb-10" style={{ color: '#A8B7B1' }}>
          Stop writing every transaction. Start speaking.
        </p>
        <button
          onClick={() => navigate('/dashboard')}
          id="cta-final-start"
          className="btn-primary inline-flex items-center gap-3 px-10 py-5 text-lg font-bold"
        >
          <Mic size={24} />
          Start BOLKHATA
        </button>
        <p className="mt-5 text-sm font-semibold" style={{ color: '#A8B7B1' }}>
          Bas bolo. Hisaab ho jayega. ✦
        </p>
      </motion.div>
    </section>
  );
}
