import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Mail, Lock, Eye, EyeOff, Crown, ShieldCheck, LogIn, UserPlus, RefreshCw, Phone, MessageSquare, ChevronLeft } from 'lucide-react';

export const AuthModal = ({ isOpen, onClose }) => {
  const { user, loginUser, registerUser, logoutUser, sendPhoneOtp, verifyPhoneOtp } = useApp();

  // 'login' | 'register' | 'phone' | 'otp'
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');

  if (!isOpen) return null;

  const resetState = () => {
    setError(''); setInfo('');
    setEmail(''); setPassword('');
    setPhone(''); setOtp('');
    setLoading(false);
  };

  // ── Email / Password submit ───────────────────────────────────────────────
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password.trim()) { setError('Please fill in all fields.'); return; }
    setLoading(true);
    const result = mode === 'login' ? await loginUser(email, password) : await registerUser(email, password);
    setLoading(false);
    if (result.success) { resetState(); onClose(); }
    else setError(result.message);
  };

  // ── Send OTP ─────────────────────────────────────────────────────────────
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError(''); setInfo('');
    const cleaned = phone.replace(/\s/g, '');
    if (!cleaned) { setError('Enter your phone number.'); return; }
    setLoading(true);
    const result = await sendPhoneOtp(cleaned);
    setLoading(false);
    if (result.success) { setMode('otp'); setInfo(`Code sent to ${cleaned}`); }
    else setError(result.message);
  };

  // ── Verify OTP ───────────────────────────────────────────────────────────
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    if (otp.length < 4) { setError('Enter the 6-digit code.'); return; }
    setLoading(true);
    const result = await verifyPhoneOtp(otp);
    setLoading(false);
    if (result.success) { resetState(); onClose(); }
    else setError(result.message);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
      {/* invisible recaptcha container */}
      <div id="recaptcha-container" />

      <div className="relative w-full max-w-md glass-card rounded-3xl p-6 sm:p-8 border border-sky-500/30 shadow-2xl">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {user ? (
          /* ── Logged-in View ── */
          <div className="text-center py-4">
            <div className="w-20 h-20 mx-auto rounded-full bg-amber-500/20 flex items-center justify-center text-4xl mb-4 border-2 border-amber-500/40 shadow-lg">
              {user.avatar}
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 flex items-center justify-center gap-2">
              {user.name}
              {user.role === 'owner' && <Crown className="w-5 h-5 text-amber-500 fill-amber-500" />}
            </h2>
            <p className="text-xs text-slate-400 mt-1 mb-3">{user.email || user.phoneNumber}</p>
            {user.role === 'owner' && (
              <div className="mb-5 inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded-full text-xs font-black uppercase border border-amber-500/40">
                <ShieldCheck className="w-4 h-4" /> App Owner & System Manager
              </div>
            )}
            <button
              onClick={() => { logoutUser(); onClose(); }}
              className="w-full py-3 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm shadow-md transition-all hover:scale-105"
            >
              Sign Out
            </button>
          </div>

        ) : mode === 'otp' ? (
          /* ── OTP Entry ── */
          <div>
            <button onClick={() => { setMode('phone'); setError(''); setOtp(''); }} className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 mb-4">
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            <div className="text-center mb-6">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-sky-500/20 flex items-center justify-center mb-3 border border-sky-500/30">
                <MessageSquare className="w-7 h-7 text-sky-500" />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">Enter Code</h2>
              {info && <p className="text-xs text-emerald-500 mt-1 font-medium">{info}</p>}
              <p className="text-xs text-slate-400 mt-1">We sent a 6-digit code via SMS</p>
            </div>
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                required
                placeholder="_ _ _ _ _ _"
                value={otp}
                onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                className="w-full text-center text-2xl tracking-[0.5em] font-mono py-3 rounded-xl bg-slate-100 dark:bg-slate-800 focus:ring-2 focus:ring-sky-500 focus:outline-none border border-slate-200 dark:border-slate-700"
              />
              {error && <p className="text-xs text-rose-500 font-bold text-center bg-rose-500/10 py-2 px-3 rounded-xl border border-rose-500/20">{error}</p>}
              <button type="submit" disabled={loading} className="w-full py-3 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2">
                {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
                {loading ? 'Verifying...' : 'Verify & Sign In'}
              </button>
            </form>
          </div>

        ) : mode === 'phone' ? (
          /* ── Phone Entry ── */
          <div>
            <button onClick={() => { setMode('login'); setError(''); }} className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 mb-4">
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            <div className="text-center mb-6">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-3 border border-emerald-500/30">
                <Phone className="w-7 h-7 text-emerald-500" />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">Phone Sign-In</h2>
              <p className="text-xs text-slate-400 mt-1">We'll send you a one-time code via SMS</p>
            </div>
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Phone Number</label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="tel"
                    required
                    placeholder="+966 5X XXX XXXX"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none border border-slate-200 dark:border-slate-700"
                  />
                </div>
                <p className="text-xs text-slate-400 mt-1">Include country code: +966 for Saudi Arabia</p>
              </div>
              {error && <p className="text-xs text-rose-500 font-bold text-center bg-rose-500/10 py-2 px-3 rounded-xl border border-rose-500/20">{error}</p>}
              <button type="submit" disabled={loading} className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2">
                {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <MessageSquare className="w-4 h-4" />}
                {loading ? 'Sending...' : 'Send Code'}
              </button>
            </form>
          </div>

        ) : (
          /* ── Email Login / Register ── */
          <div>
            <div className="text-center mb-5">
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
                {mode === 'login' ? 'Welcome Back 👋' : 'Create Account 🚀'}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                {mode === 'login' ? 'Sign in to sync your progress.' : 'Register to save your progress.'}
              </p>
            </div>

            {/* Auth method tabs */}
            <div className="flex gap-2 mb-5">
              <div className="flex-1 flex gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${mode === 'login' ? 'bg-white dark:bg-slate-700 shadow text-sky-600' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  <LogIn className="w-3.5 h-3.5 inline mr-1" />Login
                </button>
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${mode === 'register' ? 'bg-white dark:bg-slate-700 shadow text-sky-600' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  <UserPlus className="w-3.5 h-3.5 inline mr-1" />Register
                </button>
              </div>
            </div>

            <form onSubmit={handleEmailSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="email" required placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none border border-slate-200 dark:border-slate-700" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type={showPassword ? 'text' : 'password'} required placeholder={mode === 'register' ? 'Min 6 characters' : '••••••••'} value={password} onChange={e => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none border border-slate-200 dark:border-slate-700" />
                  <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              {error && <p className="text-xs text-rose-500 font-bold text-center bg-rose-500/10 py-2 px-3 rounded-xl border border-rose-500/20">{error}</p>}
              <button type="submit" disabled={loading}
                className="w-full py-3 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-lg shadow-sky-600/25 transition-all hover:scale-105 flex items-center justify-center gap-2">
                {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : mode === 'login' ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
              <span className="text-xs text-slate-400 font-medium">or</span>
              <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
            </div>

            {/* Phone auth button */}
            <button
              onClick={() => { setMode('phone'); setError(''); }}
              className="w-full py-2.5 rounded-2xl border-2 border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold text-sm transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Sign in with Phone Number
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
