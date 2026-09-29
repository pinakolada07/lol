// ============================================================
// BOLKHATA — Data Models
// Structured for future Supabase integration
// ============================================================

export interface Customer {
  id: string;
  name: string;
  phone?: string;
  balance: number; // positive = they owe you, negative = you owe them
  createdAt: string;
  lastTransactionAt: string;
  avatar?: string;
  tags?: string[];
}

export interface Transaction {
  id: string;
  customerId: string;
  customerName: string;
  type: 'CREDIT' | 'PAYMENT';
  amount: number;
  description?: string;
  date: string;
  source: 'voice' | 'manual';
  confidence?: number;
  language?: string;
}

export interface VoiceCommand {
  id: string;
  transcript: string;
  interpretation: {
    customer?: string;
    amount?: number;
    transactionType?: 'CREDIT' | 'PAYMENT';
    confidence: number;
    ambiguous?: boolean;
  } | null;
  status: 'pending' | 'confirmed' | 'rejected' | 'answered';
  createdAt: string;
}

export interface AIInterpretation {
  customer: string;
  transactionType: 'CREDIT' | 'PAYMENT';
  amount: number;
  currency: 'INR';
  confidence: number;
  description?: string;
  ambiguous?: boolean;
}
