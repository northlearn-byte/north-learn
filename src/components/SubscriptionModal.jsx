import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, CheckCircle2, Crown, Ticket, Mail, CalendarClock, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

const formatExpiry = (isoDate) => {
  if (!isoDate) return 'Lifetime ∞';
  const d = new Date(isoDate);
  const now = new Date();
  const diffMs = d - now;
  const diffDays = Math.ceil(diffMs / 86400000);
  if (diffDays <= 0) return 'Expired';
  if (diffDays === 1) return 'Expires tomorrow';
  if (diffDays < 7) return `Expires in ${diffDays} days`;
  if (diffDays < 30) return `Expires in ${Math.floor(diffDays / 7)} week(s)`;
  if (diffDays < 365) return `Expires in ${Math.floor(diffDays / 30)} month(s)`;
  return `Expires ${d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}`;
};

export const SubscriptionModal = ({ isOpen, onClose }) => {
  const { isPro, subDetails, isOwner, redeemCode, toggleProSubscription, t } = useApp();

  const [redeemInput, setRedeemInput] = useState('');
  const [redeemResult, setRedeemResult] = useState(null);
  const [isRedeeming, setIsRedeeming] = useState(false);

  if (!isOpen) return null;

  const handleRedeem = async () => {
    if (!redeemInput.trim()) return;
    setIsRedeeming(true);
    try {
      const result = await redeemCode(redeemInput);
      setRedeemResult(result);
      setIsRedeeming(false);
      if (result && result.success) {
        confetti({ particleCount: 150, spread: 90, origin: { y: 0.5 } });
        setTimeout(() => {
          setRedeemResult(null);
          setRedeemInput('');
          onClose();
        }, 2500);
      }
    } catch (err) {
      console.error(err);
      setRedeemResult({ success: false, message: 'An error occurred. Please try again.' });
      setIsRedeeming(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
      <div className="relative w-full max-w-md glass-card rounded-3xl p-6 sm:p-8 border border-amber-500/40 shadow-2xl overflow-hidden">

        {/* Decorative glow */}
        <div className="absolute -right-20 -top-20 w-56 h-56 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-amber-500/20 flex items-center justify-center mb-3 shadow-lg shadow-amber-500/20">
            <Crown className="w-9 h-9 fill-amber-500" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-50">
            North Learn PRO 👑
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Unlock all 105+ stories, Kids Zone, and full audio.
          </p>
        </div>

        {/* Current Status */}
        <div className="mb-5 p-4 rounded-2xl border flex items-center justify-between gap-3
          bg-amber-500/10 border-amber-500/30">
          <div className="flex items-center gap-2">
            {isPro
              ? <ShieldCheck className="w-5 h-5 text-emerald-500 flex-shrink-0" />
              : <Crown className="w-5 h-5 text-slate-400 flex-shrink-0" />
            }
            <div>
              <p className="text-xs font-black text-slate-700 dark:text-slate-200">
                {isPro ? 'PRO MASTER — Active' : 'Free Explorer'}
              </p>
              {isPro && (
                <p className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1 mt-0.5">
                  <CalendarClock className="w-3 h-3" />
                  {formatExpiry(subDetails?.expiresAt)}
                </p>
              )}
            </div>
          </div>
          <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
            isPro
              ? 'bg-emerald-500 text-white'
              : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
          }`}>
            {isPro ? 'Active' : 'Free'}
          </span>
        </div>

        {/* PRO Features List */}
        {!isPro && (
          <div className="space-y-2 mb-5 text-xs sm:text-sm">
            {[
              'All 105+ stories (A1 → C2) unlocked',
              'All 15 Kids Zone tales unlocked',
              'Word-by-word audio & translation',
              'Flashcards, Quiz Mode & XP rewards',
              'Daily goal tracker & streak system',
            ].map((f) => (
              <div key={f} className="flex items-center gap-2.5 text-slate-700 dark:text-slate-200 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>{f}</span>
              </div>
            ))}
          </div>
        )}

        {/* ── REDEEM CODE ────────────────────────────────── */}
        {!isPro && (
          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <Ticket className="w-5 h-5 text-sky-500 flex-shrink-0" />
              <span className="text-sm font-black text-slate-800 dark:text-slate-100">Enter Promo / Redeem Code</span>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. NORTHPRO"
                value={redeemInput}
                onChange={(e) => {
                  setRedeemInput(e.target.value.toUpperCase());
                  setRedeemResult(null);
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleRedeem()}
                className="flex-1 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 text-sm font-mono font-bold tracking-widest uppercase focus:ring-2 focus:ring-sky-500 focus:outline-none border border-slate-300 dark:border-slate-600"
              />
              <button
                onClick={handleRedeem}
                disabled={!redeemInput.trim() || isRedeeming}
                className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs disabled:opacity-50 transition-colors"
              >
                {isRedeeming ? '...' : 'Continue →'}
              </button>
            </div>

            {/* Result */}
            {redeemResult && (
              <div className={`mt-3 p-2.5 rounded-xl text-xs font-bold text-center ${
                redeemResult.success
                  ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40'
                  : 'bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/40'
              }`}>
                {redeemResult.message}
              </div>
            )}
          </div>
        )}

        {/* Contact owner */}
        {!isPro && (
          <a
            href="mailto:abooodiv96@gmail.com?subject=North Learn PRO Code Request"
            className="flex items-center justify-center gap-2 w-full mb-4 py-2.5 rounded-xl border border-sky-500/40 text-sky-600 dark:text-sky-400 hover:bg-sky-500/10 text-xs font-bold transition-colors"
          >
            <Mail className="w-4 h-4" />
            Request a code → abooodiv96@gmail.com
          </a>
        )}

        {/* PRO active — just close */}
        {isPro && !isOwner && (
          <button
            onClick={onClose}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-black text-sm shadow-lg shadow-emerald-600/20 transition-all hover:scale-[1.02]"
          >
            ✅ Enjoy PRO Master!
          </button>
        )}

        {/* Owner panel: show downgrade only for owner/testing */}
        {isPro && isOwner && (
          <button
            onClick={() => { toggleProSubscription(false); onClose(); }}
            className="w-full py-3 rounded-2xl bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold text-sm hover:bg-slate-300 transition-colors"
          >
            [Owner] Switch to Free for Testing
          </button>
        )}

      </div>
    </div>
  );
};
