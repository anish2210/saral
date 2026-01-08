import { type ClassValue, clsx } from 'clsx';

// Simple cn function for combining class names
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Format currency in INR
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Format month string (YYYY-MM) to readable format
export function formatMonth(monthStr: string): string {
  const [year, month] = monthStr.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
}

// Get current month in YYYY-MM format
export function getCurrentMonth(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

// Get array of last N months
export function getLastNMonths(n: number): string[] {
  const months: string[] = [];
  const now = new Date();

  for (let i = 0; i < n; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() - i);
    months.push(`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`);
  }

  return months;
}

// Get array of months from start date to current month
export function getMonthsFromStart(startDate: string | undefined): string[] {
  const months: string[] = [];
  const now = new Date();
  const currentMonth = new Date(now.getFullYear(), now.getMonth());

  // If no start date, return last 6 months as default
  if (!startDate) {
    return getLastNMonths(6);
  }

  const [year, month] = startDate.split('-').map(Number);
  const start = new Date(year, month - 1);

  // If start date is in the future, return empty array
  if (start > currentMonth) {
    return [];
  }

  // Generate all months from start to current
  const current = new Date(start);
  while (current <= currentMonth) {
    months.push(`${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}`);
    current.setMonth(current.getMonth() + 1);
  }

  // Return in reverse order (most recent first)
  return months.reverse();
}

// Get fee for a specific month based on fee history
export function getFeeForMonth(
  month: string,
  feeHistory: { amount: number; effectiveFrom: string }[] | undefined,
  defaultFee: number
): number {
  if (!feeHistory || feeHistory.length === 0) {
    return defaultFee;
  }

  // Sort by effectiveFrom in ascending order
  const sorted = [...feeHistory].sort((a, b) =>
    a.effectiveFrom.localeCompare(b.effectiveFrom)
  );

  // Find the applicable fee for this month
  // The fee that applies is the last one with effectiveFrom <= month
  let applicableFee = sorted[0].amount;
  for (const entry of sorted) {
    if (entry.effectiveFrom <= month) {
      applicableFee = entry.amount;
    } else {
      break;
    }
  }

  return applicableFee;
}

// Format date for display
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

// Format phone number for display
export function formatPhone(phone: string): string {
  if (!phone) return '';
  // Basic Indian phone number formatting
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  return phone;
}

// Generate share link for student payment view
export function getPublicPaymentLink(publicToken: string): string {
  return `${window.location.origin}/p/${publicToken}`;
}

// Copy text to clipboard
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
