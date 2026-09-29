import type { AIInterpretation } from '../types/models';
import { mockCustomers } from '../data/mockData';

// ============================================================
// BOLKHATA — AI Transaction Parser
// Parses natural language voice input into structured data
// ============================================================

interface ParseResult {
  interpretation: AIInterpretation | null;
  rawText: string;
}

// Number words in multiple languages
const numberMap: Record<string, number> = {
  // English
  one: 1, two: 2, three: 3, four: 4, five: 5,
  six: 6, seven: 7, eight: 8, nine: 9, ten: 10,
  hundred: 100, thousand: 1000,
  // Hindi
  ek: 1, do: 2, teen: 3, char: 4, paanch: 5,
  chhe: 6, saat: 7, aath: 8, nau: 9, das: 10,
  sau: 100, hazaar: 1000, hazar: 1000,
  // Compound numbers
  'paanch sau': 500, 'do hazaar': 2000, 'teen hazaar': 3000,
  'ek hazaar': 1000, 'char hazaar': 4000, 'paanch hazaar': 5000,
  'dus hazaar': 10000, 'bees hazaar': 20000,
};

// Payment indicators (someone paid you)
const paymentIndicators = [
  'diye', 'diya', 'de diya', 'de diye', 'bheja', 'bheje',
  'paid', 'payment', 'received', 'mila', 'mile', 'aaye',
  'ne diye', 'ne diya', 'waapas', 'return',
  'se liye', 'se mila', 'se payment',
  'कडून', // Marathi: "from"
];

// Credit indicators (you gave credit / goods)
const creditIndicators = [
  'ko diya', 'ko diye', 'ko maal', 'udhaar diya', 'udhar diya',
  'credit', 'maal diya', 'cheez di', 'saman diya',
  'diya udhaar', 'ko bheja', 'given', 'gave',
  'la dile', // Marathi
];

// Query indicators (asking for info, not a transaction)
const queryIndicators = [
  'kitna', 'batao', 'baaki', 'hisaab', 'total', 'aaj',
  'how much', 'balance', 'tell me', 'show', 'what',
  'sabse', 'list', 'report',
];

function parseAmount(text: string): number | null {
  // Direct number
  const directNum = text.match(/₹?\s*(\d+(?:,\d+)*(?:\.\d{1,2})?)/);
  if (directNum) {
    return parseInt(directNum[1].replace(/,/g, ''));
  }

  // Word-based compound numbers (e.g. "paanch sau", "do hazaar")
  const lower = text.toLowerCase();
  for (const [word, val] of Object.entries(numberMap)) {
    if (lower.includes(word)) {
      // Check for multiplied compounds like "teen hazaar" = 3 × 1000
      const parts = word.split(' ');
      if (parts.length === 2) {
        const multiplier = numberMap[parts[0]];
        const base = numberMap[parts[1]];
        if (multiplier && base) return multiplier * base;
      }
      return val;
    }
  }

  return null;
}

function detectCustomer(text: string): string | null {
  const lower = text.toLowerCase();

  // Try to match known customers
  for (const c of mockCustomers) {
    const nameParts = c.name.toLowerCase().split(' ');
    for (const part of nameParts) {
      if (part.length > 3 && lower.includes(part)) {
        return c.name;
      }
    }
  }

  // Fallback: extract proper noun (capitalized word or first word before "ne"/"ko"/"se")
  const neMatch = text.match(/^([A-Z][a-z]+(?:\s[A-Z][a-z]+)?)\s+(?:ne|ko|se|ka|ki)/i);
  if (neMatch) return neMatch[1];

  const firstWordMatch = text.match(/^([A-Z][a-z]+(?:\s[A-Z][a-z]+)?)/);
  if (firstWordMatch) return firstWordMatch[1];

  return null;
}

function detectTransactionType(text: string): 'CREDIT' | 'PAYMENT' | null {
  const lower = text.toLowerCase();

  for (const ind of paymentIndicators) {
    if (lower.includes(ind)) return 'PAYMENT';
  }
  for (const ind of creditIndicators) {
    if (lower.includes(ind)) return 'CREDIT';
  }

  return null;
}

function isQuery(text: string): boolean {
  const lower = text.toLowerCase();
  return queryIndicators.some(q => lower.includes(q));
}

function isAmbiguous(text: string, type: 'CREDIT' | 'PAYMENT' | null): boolean {
  if (type !== null) return false;
  const lower = text.toLowerCase();
  // "ko X diye" can mean gave or owed
  return lower.includes(' ko ') && !lower.includes('maal') && !lower.includes('udhaar');
}

export function parseVoiceInput(text: string): ParseResult {
  if (!text || text.trim().length === 0) {
    return { interpretation: null, rawText: text };
  }

  // If it's a query, don't parse as transaction
  if (isQuery(text)) {
    return { interpretation: null, rawText: text };
  }

  const customer = detectCustomer(text);
  const amount = parseAmount(text);
  let transactionType = detectTransactionType(text);
  const ambiguous = isAmbiguous(text, transactionType);

  // If ambiguous set type to null
  if (ambiguous) transactionType = null;

  // Confidence scoring
  let confidence = 0.5;
  if (customer) confidence += 0.2;
  if (amount) confidence += 0.2;
  if (transactionType) confidence += 0.15;
  confidence = Math.min(confidence, 0.98);

  if (!customer && !amount) {
    return { interpretation: null, rawText: text };
  }

  return {
    interpretation: {
      customer: customer || 'Unknown',
      transactionType: transactionType || 'PAYMENT',
      amount: amount || 0,
      currency: 'INR',
      confidence,
      description: text,
      ambiguous,
    },
    rawText: text,
  };
}

// Demo voice commands for showcase
export const demoCommands = [
  'Ramesh ne paanch sau rupaye diye',
  'Mohan ko do hazaar ka maal diya',
  'Rajesh se teen hazaar liye',
  'Amit ne ek hazaar diya',
  'Suresh ko paanch hazaar ka maal diya',
  'Mahesh ne do hazaar bheje',
  'Vijay ne 500 rupaye de diye',
];

export function generateAIResponse(query: string): string {
  const lower = query.toLowerCase();

  if (lower.includes('ramesh')) {
    if (lower.includes('baaki') || lower.includes('kitna') || lower.includes('balance')) {
      return 'Ramesh Sharma ka abhi ₹2,450 baaki hai.\n\nLast payment: ₹500 aaj 10:42 AM ko.';
    }
    if (lower.includes('transaction') || lower.includes('history')) {
      return 'Ramesh Sharma ki recent transactions:\n\n• ₹500 payment — aaj\n• ₹1,200 credit — 22 Sep\n• ₹750 payment — 20 Sep';
    }
  }

  if (lower.includes('aaj') && lower.includes('payment')) {
    return 'Aaj ka total payment: ₹8,200\n\nBreakdown:\n• Ramesh Sharma — ₹500\n• Amit Jain — ₹800\n• Other — ₹6,900';
  }

  if (lower.includes('sabse') && lower.includes('zyada')) {
    return 'Sabse zyada udhaar:\n\n1. Mahesh Kumar — ₹12,400\n2. Rajesh General Stores — ₹7,800\n3. Suresh Traders — ₹5,200';
  }

  if (lower.includes('mohan')) {
    return 'Mohan Patil ka ₹1,800 baaki hai.\n\nLast transaction: ₹2,000 credit aaj 9:18 AM.';
  }

  if (lower.includes('outstanding') || lower.includes('total')) {
    return 'Total outstanding:\n\n₹42,500\n\n18 customers due payments.';
  }

  return 'Aapka sawaal samajh aa gaya. Demo mode mein limited data available hai. Full version mein real-time data milega.';
}
