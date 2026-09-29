import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send } from 'lucide-react';
import { generateAIResponse } from '../utils/aiParser';

// ============================================================
// BOLKHATA — Ask Khata AI Floating Widget
// ============================================================

interface Message {
  id: string;
  role: 'user' | 'ai';
  text: string;
  time: string;
}

export function AskKhata() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'ai',
      text: 'Namaste! Mujhse apne khate ke baare mein puchiye.\n\nExample:\n• "Ramesh ka kitna baaki hai?"\n• "Aaj kitna payment mila?"',
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const exampleQueries = [
    'Ramesh ka kitna baaki hai?',
    'Aaj kitna payment mila?',
    'Sabse zyada udhaar kiska?',
  ];

  function sendMessage(text: string) {
    if (!text.trim()) return;
    const time = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    const userMsg: Message = { id: Date.now() + 'u', role: 'user', text, time };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateAIResponse(text);
      const aiMsg: Message = {
        id: Date.now() + 'a',
        role: 'ai',
        text: response,
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  }

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl font-semibold text-sm shadow-2xl"
        style={{
          background: open ? '#101B20' : 'linear-gradient(135deg, #087A55, #16C784)',
          color: open ? '#A8B7B1' : '#071719',
          border: '1px solid rgba(22,199,132,0.3)',
          boxShadow: '0 8px 32px rgba(22,199,132,0.25)',
        }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        aria-label="Ask Khata AI"
      >
        {open ? <X size={18} /> : <Sparkles size={18} />}
        {!open && <span>Ask Khata</span>}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-6 z-50 w-80 rounded-3xl overflow-hidden flex flex-col"
            style={{
              background: '#101B20',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 24px 60px rgba(0,0,0,0.5), 0 0 40px rgba(22,199,132,0.08)',
              maxHeight: '70vh',
            }}
          >
            {/* Header */}
            <div className="p-4 flex items-center gap-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #087A55, #16C784)' }}>
                <Sparkles size={14} style={{ color: '#071719' }} />
              </div>
              <div>
                <p className="text-sm font-bold" style={{ color: '#F4F7F5' }}>Khata AI</p>
                <p className="text-xs" style={{ color: '#16C784' }}>● Online</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ minHeight: 200, maxHeight: 350 }}>
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className="max-w-[85%] rounded-2xl px-3 py-2.5 text-sm whitespace-pre-line"
                    style={{
                      background: msg.role === 'user' ? 'rgba(22,199,132,0.15)' : 'rgba(255,255,255,0.05)',
                      color: '#F4F7F5',
                      border: msg.role === 'user' ? '1px solid rgba(22,199,132,0.3)' : '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    {msg.text}
                    <p className="text-right mt-1" style={{ fontSize: 10, color: '#A8B7B1' }}>{msg.time}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="px-3 py-2.5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <TypingDots />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick examples */}
            {messages.length === 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1">
                {exampleQueries.map(q => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-xs px-2.5 py-1.5 rounded-full transition-all duration-150"
                    style={{ background: 'rgba(22,199,132,0.08)', color: '#16C784', border: '1px solid rgba(22,199,132,0.2)' }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-center gap-2 rounded-xl px-3 py-2" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
                  placeholder="Kuch puchiye..."
                  className="flex-1 bg-transparent outline-none text-sm"
                  style={{ color: '#F4F7F5' }}
                  aria-label="Ask Khata AI input"
                />
                <button
                  onClick={() => sendMessage(input)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-150"
                  style={{ background: input ? 'rgba(22,199,132,0.2)' : 'transparent' }}
                  aria-label="Send message"
                >
                  <Send size={14} style={{ color: '#16C784' }} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function TypingDots() {
  return (
    <div className="flex gap-1 items-center">
      {[0, 1, 2].map(i => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full"
          style={{
            background: '#16C784',
            animation: `wave 1s ease-in-out infinite`,
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
    </div>
  );
}
