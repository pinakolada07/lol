import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

// ============================================================
// BOLKHATA — Navbar Component
// ============================================================

const navLinks = [
  { label: 'Product', href: '#product' },
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Customers', href: '#customers' },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      style={{ background: 'linear-gradient(to bottom, rgba(7,23,25,0.9), transparent)', backdropFilter: 'blur(12px)' }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <BolkhataLogo />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium transition-colors duration-200"
              style={{ color: '#A8B7B1' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#F4F7F5')}
              onMouseLeave={e => (e.currentTarget.style.color = '#A8B7B1')}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="btn-ghost text-sm px-5 py-2 font-medium"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="btn-primary text-sm px-5 py-2"
          >
            Get Started
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg"
          style={{ color: '#A8B7B1' }}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden mt-4 p-4 rounded-2xl glass"
        >
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              className="block py-3 text-sm font-medium border-b"
              style={{ color: '#A8B7B1', borderColor: 'rgba(255,255,255,0.06)' }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="flex gap-3 pt-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="btn-ghost flex-1 py-2 text-sm"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="btn-primary flex-1 py-2 text-sm"
            >
              Get Started
            </button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}

export function BolkhataLogo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const fontSize = size === 'sm' ? '18px' : size === 'lg' ? '28px' : '22px';

  return (
    <div className="flex items-center gap-2">
      {/* Icon mark */}
      <div
        className="relative flex items-center justify-center rounded-xl"
        style={{
          width: size === 'sm' ? 28 : 34,
          height: size === 'sm' ? 28 : 34,
          background: 'linear-gradient(135deg, #087A55, #16C784)',
          boxShadow: '0 0 20px rgba(22,199,132,0.35)',
        }}
      >
        {/* Microphone inside the "o" */}
        <svg width={size === 'sm' ? 14 : 18} height={size === 'sm' ? 14 : 18} viewBox="0 0 18 18" fill="none">
          <rect x="6" y="2" width="6" height="9" rx="3" fill="rgba(7,23,25,0.9)" />
          <path d="M3 9.5C3 13 5.686 15.5 9 15.5S15 13 15 9.5" stroke="rgba(7,23,25,0.9)" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="9" y1="15.5" x2="9" y2="17" stroke="rgba(7,23,25,0.9)" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="6.5" y1="17" x2="11.5" y2="17" stroke="rgba(7,23,25,0.9)" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </div>
      {/* Wordmark */}
      <span style={{ fontSize, fontWeight: 800, letterSpacing: '-0.03em', color: '#F4F7F5', lineHeight: 1 }}>
        b<span className="text-gradient-green">o</span>lkhata
      </span>
    </div>
  );
}
