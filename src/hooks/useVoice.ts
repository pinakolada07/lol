import { useState, useEffect, useRef, useCallback } from 'react';

// ============================================================
// BOLKHATA — Voice Recognition Hook
// Wraps Web Speech API with graceful fallback
// ============================================================

export type VoiceState = 'idle' | 'listening' | 'processing' | 'done' | 'error';

interface UseVoiceReturn {
  state: VoiceState;
  transcript: string;
  isSupported: boolean;
  startListening: () => void;
  stopListening: () => void;
  reset: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnySpeechRecognition = any;

export function useVoice(onTranscript?: (text: string) => void): UseVoiceReturn {
  const [state, setState] = useState<VoiceState>('idle');
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef<AnySpeechRecognition>(null);
  const transcriptRef = useRef('');

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    setIsSupported(!!SpeechRecognitionAPI);

    if (SpeechRecognitionAPI) {
      const recognition = new SpeechRecognitionAPI();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'hi-IN';

      recognition.onresult = (event: AnySpeechRecognition) => {
        const results = event.results as AnySpeechRecognition;
        let finalText = '';
        let interimText = '';
        for (let i = 0; i < results.length; i++) {
          const r = results[i];
          if (r.isFinal) {
            finalText += r[0].transcript;
          } else {
            interimText += r[0].transcript;
          }
        }
        const text = finalText || interimText;
        transcriptRef.current = text;
        setTranscript(text);
      };

      recognition.onend = () => {
        setState(prev => {
          if (prev === 'listening') {
            if (transcriptRef.current) {
              onTranscript?.(transcriptRef.current);
              return 'processing';
            }
            return 'idle';
          }
          return prev;
        });
      };

      recognition.onerror = (event: AnySpeechRecognition) => {
        console.warn('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          setState('error');
        } else {
          setState('idle');
        }
      };

      recognitionRef.current = recognition;
    }

    return () => {
      recognitionRef.current?.abort();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startListening = useCallback(() => {
    transcriptRef.current = '';
    setTranscript('');
    setState('listening');

    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch {
        // Already started
      }
    }
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setState(prev => prev === 'listening' ? 'processing' : prev);
  }, []);

  const reset = useCallback(() => {
    recognitionRef.current?.abort();
    transcriptRef.current = '';
    setTranscript('');
    setState('idle');
  }, []);

  return { state, transcript, isSupported, startListening, stopListening, reset };
}
