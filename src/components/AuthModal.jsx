import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Mail, Lock, Eye, EyeOff, Crown, ShieldCheck, LogIn, UserPlus, RefreshCw } from 'lucide-react';

export const AuthModal = ({ isOpen, onClose }) => {
  const { user, loginUser, registerUser, logoutUser } = useApp();

  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    const result = mode === 'login'
      ? await loginUser(email, password)
      : await registerUser(email, password);
    setLoading(false);

    if (result.success) {
      setEmail('');
      setPassword('');
      onClose();
    } else {
      setError(result.message);
    }
  };

  const switchMode = () => {
    setMode(m => m === 'login' ? 'register' : 'login');
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
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
            <p className="text-xs text-slate-400 mt-1 mb-3">{user.email}</p>

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
        ) : (
          /* ── Login / Register Form ── */
          <div>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
                {mode === 'login' ? 'Welcome Back 👋' : 'Create Account 🚀'}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                {mode === 'login'
                  ? 'Sign in to sync your progress across devices.'
                  : 'Register to save your vocabulary, streak & XP.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none border border-slate-200 dark:border-slate-700"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder={mode === 'register' ? 'Min 6 characters' : '••••••••'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none border border-slate-200 dark:border-slate-700"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <p className="text-xs text-rose-500 font-bold text-center bg-rose-500/10 py-2 px-3 rounded-xl border border-rose-500/20">
                  {error}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-lg shadow-sky-600/25 transition-all hover:scale-105 flex items-center justify-center gap-2"
              >
                {loading
                  ? <RefreshCw className="w-4 h-4 animate-spin" />
                  : mode === 'login'
                  ? <LogIn className="w-4 h-4" />
                  : <UserPlus className="w-4 h-4" />}
                {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            {/* Switch Mode */}
            <p className="text-xs text-slate-400 text-center mt-5">
              {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
              {' '}
              <button onClick={switchMode} className="text-sky-500 font-bold hover:underline">
                {mode === 'login' ? 'Register' : 'Sign In'}
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
