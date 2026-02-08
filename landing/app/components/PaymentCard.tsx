'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface PaymentCardProps {
  studentName: string;
  amount: string;
  status: 'paid' | 'pending';
  delay?: number;
}

export default function PaymentCard({ studentName, amount, status, delay = 0 }: PaymentCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="perspective-1000 cursor-pointer"
      onClick={handleClick}
    >
      <motion.div
        className="preserve-3d relative w-full h-32 transition-transform duration-500"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {/* Front - Pending */}
        <div
          className={`backface-hidden absolute inset-0 rounded-xl border-2 p-4 ${
            status === 'pending'
              ? 'border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-slate-900/50'
              : 'border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-slate-900/50'
          } backdrop-blur-sm`}
        >
          <div className="flex flex-col justify-between h-full">
            <div>
              <p className="text-sm text-slate-400 font-medium">{studentName}</p>
              <p className="text-2xl font-bold text-white mt-1">{amount}</p>
            </div>
            <div className="flex items-center justify-between">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  status === 'pending'
                    ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                }`}
              >
                {status === 'pending' ? 'Pending' : 'Paid'}
              </span>
              <span className="text-xs text-slate-500">Tap to flip</span>
            </div>
          </div>
        </div>

        {/* Back - Paid */}
        <div
          className="backface-hidden absolute inset-0 rounded-xl border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-slate-900/50 backdrop-blur-sm p-4"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="flex flex-col justify-between h-full">
            <div>
              <p className="text-sm text-slate-400 font-medium">{studentName}</p>
              <p className="text-2xl font-bold text-white mt-1">{amount}</p>
            </div>
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                Paid
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              </span>
              <span className="text-xs text-slate-500">Tap again</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
