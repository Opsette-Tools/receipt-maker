export interface BusinessInfo {
  businessName: string;
  phone: string;
  email: string;
  address: string;
  logo: string; // base64
}

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export type PaymentMethod = 'Cash' | 'Check' | 'Venmo' | 'Zelle' | 'Card' | 'Other';

export interface ReceiptData {
  receiptNumber: string;
  date: string; // ISO string
  clientName: string;
  lineItems: LineItem[];
  taxEnabled: boolean;
  taxRate: number;
  paymentMethod: PaymentMethod;
  notes: string;
  businessInfo: BusinessInfo;
}

export interface SavedReceipt extends ReceiptData {
  savedAt: string;
  subtotal: number;
  tax: number;
  total: number;
}
