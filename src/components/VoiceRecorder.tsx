import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { Mic, MicOff, Loader2, Check } from 'lucide-react';
import type { AIInterpretation } from '../types/models';
import { parseVoiceInput, demoCommands } from '../utils/aiParser';
import { useVoice } from '../hooks/useVoice';

// ============================================================
// BOLKHATA — Voice Recorder Component
// The signature interaction
// ============================================================

type VoiceStep = 'idle' | 'listening' | 'processing' | 'understanding' | 'confirm' | 'confirmed';

interface VoiceRecorderProps {
  onTransactionConfirmed?: (interpretation: AIInterpretation, transcript: string) => void;
  compact?: boolean;
}

export function VoiceRecorder({ onTransactionConfirmed, compact = false }: VoiceRecorderProps) {
  const [step, setStep] = useState<VoiceStep>('idle');
  const [transcript, setTranscript] = useState('');
  const [interpretation, setInterpretation] = useState<AIInterpretation | null>(null);
  const [demoIdx, setDemoIdx] = useState(0);
  const [ambiguousChoice, setAmbiguousChoice] = useState<'PAYMENT' | 'CREDIT' | null>(null);
  const controls = useAnimation();
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { isSupported, startListening, stopListening, transcript: voiceTranscript, state: voiceState } = useVoice();

  // Sync voice state from hook to our step
  useEffect(() => {
    if (voiceState === 'listening' && step === 'listening') return;
    if (voiceState === 'processing' && step === 'listening') {
      handleProcessTranscript(voiceTranscript || transcript);
    }
  }, [voiceState, voiceTranscript]);

  function handleProcessTranscript(text: string) {
    if (!text) return;
    setTranscript(text);
    setStep('processing');
    setTimeout(() => {
      const result = parseVoiceInput(text);
      setInterpretation(result.interpretation);
      setStep('understanding');
    }, 1800);
  }

  function handleMicPress() {
    if (step !== 'idle') return;
    setStep('listening');
    if (isSupported) {
      startListening();
      holdTimer.current = setTimeout(() => stopListening(), 6000);
    }
  }

  function handleMicRelease() {
    if (step !== 'listening') return;
    if (holdTimer.current) clearTimeout(holdTimer.current);
    if (isSupported) {
      stopListening();
    } else {
      // Demo mode: use cycling demo commands
      const demo = demoCommands[demoIdx % demoCommands.length];
      setDemoIdx(prev => prev + 1);
      handleProcessTranscript(demo);
    }
  }

  function handleConfirm() {
    if (!interpretation) return;
    const final: AIInterpretation = {
      ...interpretation,
      transactionType: ambiguousChoice || interpretation.transactionType,
    };
    setStep('confirmed');
    onTransactionConfirmed?.(final, transcript);
    setTimeout(() => {
      setStep('idle');
      setTranscript('');
      setInterpretation(null);
      setAmbiguousChoice(null);
    }, 2000);
  }

  function handleEdit() {
    setStep('idle');
    setTranscript('');
    setInterpretation(null);
  }

  const micSize = compact ? 72 : 100;

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Step indicator */}
      <AnimatePresence mode="wait">
        {step === 'idle' && (
          <motion.div key="idle-hint" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            className="text-center"
          >
            <p className="text-sm font-medium mb-1" style={{ color: '#A8B7B1' }}>
              {isSupported ? 'Hold to speak' : 'Tap to demo'}
            </p>
            <p className="text-xs" style={{ color: 'rgba(168,183,177,0.5)' }}>
              Hindi · Marathi · Hinglish · English
            </p>
          </motion.div>
        )}

        {step === 'listening' && (
          <motion.div key="listening" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <WaveformVisual />
            <p className="text-center text-sm font-semibold mt-2" style={{ color: '#16C784' }}>LISTENING...</p>
          </motion.div>
        )}

        {step === 'processing' && (
          <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex items-center gap-2"
          >
            <Loader2 size={18} className="animate-spin" style={{ color: '#16C784' }} />
            <span className="text-sm font-medium" style={{ color: '#16C784' }}>AI is understanding...</span>
          </motion.div>
        )}

        {(step === 'understanding' || step === 'confirm') && interpretation && (
          <motion.div key="understanding"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-sm"
          >
            <AIInterpretationCard
              transcript={transcript}
              interpretation={interpretation}
              ambiguousChoice={ambiguousChoice}
              onAmbiguousChoice={setAmbiguousChoice}
              onConfirm={handleConfirm}
              onEdit={handleEdit}
            />
          </motion.div>
        )}

        {step === 'confirmed' && (
          <motion.div key="confirmed"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-2"
          >
            <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #16C784, #38E39A)' }}>
              <Check size={28} style={{ color: '#071719' }} />
            </div>
            <p className="text-sm font-semibold" style={{ color: '#16C784' }}>Khata Updated!</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Microphone button */}
      {(step === 'idle' || step === 'listening') && (
        <motion.button
          aria-label="Hold to speak"
          onMouseDown={handleMicPress}
          onMouseUp={handleMicRelease}
          onMouseLeave={() => step === 'listening' && handleMicRelease()}
          onTouchStart={handleMicPress}
          onTouchEnd={handleMicRelease}
          animate={controls}
          whileTap={{ scale: 0.95 }}
          className="relative flex items-center justify-center rounded-full cursor-pointer select-none"
          style={{
            width: micSize,
            height: micSize,
            background: step === 'listening'
              ? 'linear-gradient(135deg, #16C784, #38E39A)'
              : 'rgba(16, 27, 32, 0.8)',
            border: step === 'listening'
              ? '2px solid rgba(56,227,154,0.6)'
              : '1.5px solid rgba(22,199,132,0.3)',
            boxShadow: step === 'listening'
              ? '0 0 40px rgba(22,199,132,0.6), 0 0 80px rgba(22,199,132,0.2)'
              : '0 0 20px rgba(22,199,132,0.15)',
          }}
        >
          {/* Pulse rings when listening */}
          {step === 'listening' && (
            <>
              <span className="pulse-ring absolute inset-0 rounded-full" style={{ border: '2px solid rgba(22,199,132,0.4)' }} />
              <span className="pulse-ring absolute inset-0 rounded-full" style={{ border: '2px solid rgba(22,199,132,0.2)', animationDelay: '0.5s' }} />
            </>
          )}
          {step === 'listening'
            ? <MicOff size={compact ? 28 : 36} style={{ color: '#071719' }} />
            : <Mic size={compact ? 28 : 36} style={{ color: '#16C784' }} />
          }
        </motion.button>
      )}
    </div>
  );
}

// ─── Waveform Visual ─────────────────────────────────────
function WaveformVisual() {
  const bars = [3, 5, 8, 12, 8, 14, 10, 6, 12, 8, 5, 3];
  return (
    <div className="flex items-end gap-1 justify-center" style={{ height: 40 }}>
      {bars.map((h, i) => (
        <span
          key={i}
          className="wave-bar rounded-full"
          style={{
            width: 3,
            height: h * 2.5,
            background: `linear-gradient(to top, #16C784, #38E39A)`,
            animationDelay: `${i * 0.07}s`,
            animationDuration: `${0.8 + (i % 3) * 0.15}s`,
          }}
        />
      ))}
    </div>
  );
}

// ─── AI Interpretation Card ───────────────────────────────
interface AIInterpretationCardProps {
  transcript: string;
  interpretation: AIInterpretation;
  ambiguousChoice: 'PAYMENT' | 'CREDIT' | null;
  onAmbiguousChoice: (v: 'PAYMENT' | 'CREDIT') => void;
  onConfirm: () => void;
  onEdit: () => void;
}

function AIInterpretationCard({
  transcript,
  interpretation,
  ambiguousChoice,
  onAmbiguousChoice,
  onConfirm,
  onEdit,
}: AIInterpretationCardProps) {
  const confidencePct = Math.round(interpretation.confidence * 100);
  const isAmbiguous = interpretation.ambiguous;

  return (
    <div className="glass-green rounded-2xl p-5 space-y-4 w-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold tracking-widest" style={{ color: '#16C784' }}>AI UNDERSTANDING</span>
        </div>
        <span className="text-xs font-semibold px-2 py-1 rounded-full" style={{ background: 'rgba(22,199,132,0.12)', color: '#16C784' }}>
          {confidencePct}% confidence
        </span>
      </div>

      {/* Transcript */}
      <div className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)' }}>
        <p className="text-xs mb-1" style={{ color: '#A8B7B1' }}>I heard:</p>
        <p className="text-sm font-medium italic" style={{ color: '#F4F7F5' }}>"{transcript}"</p>
      </div>

      {/* Interpretation grid */}
      {!isAmbiguous ? (
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)' }}>
            <p className="text-xs mb-1" style={{ color: '#A8B7B1' }}>CUSTOMER</p>
            <p className="text-sm font-bold" style={{ color: '#F4F7F5' }}>{interpretation.customer}</p>
          </div>
          <div className="text-center p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)' }}>
            <p className="text-xs mb-1" style={{ color: '#A8B7B1' }}>TYPE</p>
            <p className="text-sm font-bold" style={{ color: interpretation.transactionType === 'PAYMENT' ? '#16C784' : '#F4F7F5' }}>
              {interpretation.transactionType === 'PAYMENT' ? 'Payment' : 'Credit'}
            </p>
          </div>
          <div className="text-center p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)' }}>
            <p className="text-xs mb-1" style={{ color: '#A8B7B1' }}>AMOUNT</p>
            <p className="text-sm font-bold" style={{ color: '#38E39A' }}>₹{interpretation.amount}</p>
          </div>
        </div>
      ) : (
        /* Ambiguous confirmation */
        <div className="space-y-3">
          <p className="text-xs font-semibold" style={{ color: '#A8B7B1' }}>Let's confirm what happened:</p>
          {[
            { value: 'PAYMENT' as const, label: `${interpretation.customer} paid you ₹${interpretation.amount}` },
            { value: 'CREDIT' as const, label: `You gave ${interpretation.customer} ₹${interpretation.amount} credit` },
          ].map(opt => (
            <button
              key={opt.value}
              onClick={() => onAmbiguousChoice(opt.value)}
              className="w-full text-left p-3 rounded-xl flex items-center gap-3 transition-all duration-200"
              style={{
                background: ambiguousChoice === opt.value ? 'rgba(22,199,132,0.15)' : 'rgba(255,255,255,0.04)',
                border: `1.5px solid ${ambiguousChoice === opt.value ? 'rgba(22,199,132,0.5)' : 'transparent'}`,
                color: '#F4F7F5',
              }}
            >
              <span className="w-4 h-4 rounded-full flex-shrink-0 border-2 flex items-center justify-center"
                style={{ borderColor: ambiguousChoice === opt.value ? '#16C784' : '#A8B7B1' }}
              >
                {ambiguousChoice === opt.value && (
                  <span className="w-2 h-2 rounded-full" style={{ background: '#16C784' }} />
                )}
              </span>
              <span className="text-sm font-medium">{opt.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 pt-1">
        <button
          onClick={onEdit}
          className="btn-ghost flex-1 py-2.5 text-sm font-semibold"
        >
          Edit
        </button>
        <button
          onClick={onConfirm}
          disabled={isAmbiguous && !ambiguousChoice}
          className="btn-primary flex-1 py-2.5 text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Confirm Transaction
        </button>
      </div>
    </div>
  );
}
