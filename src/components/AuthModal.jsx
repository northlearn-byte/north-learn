import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, Mail, Sparkles, Crown, ShieldCheck, CheckCircle, RefreshCw } from 'lucide-react';

export const AuthModal = ({ isOpen, onClose }) => {
  const { 
    user, 
    sendVerificationEmail, 
    completeSignInWithLink, 
    logoutUser 
  } = useApp();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Auto-detect returning verification link from email
  useEffect(() => {
    const handleEmailLinkSignIn = async () => {
      try {
        const loggedUser = await completeSignInWithLink();
        if (loggedUser) {
          onClose();
        }
      } catch (err) {
        console.error(err);
        setError('Error completing sign in. Link may be expired or already used.');
      }
    };
    handleEmailLinkSignIn();
  }, []);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setSuccess(false);

    try {
      await sendVerificationEmail(email.trim().toLowerCase());
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError('Failed to send verification link. Please check your email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
      <div className="relative w-full max-w-md glass-card rounded-3xl p-6 sm:p-8 border border-sky-500/40 shadow-2xl">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {user ? (
          // ---- Logged In View ----
          <div className="text-center py-4">
            <div className="w-20 h-20 mx-auto rounded-full bg-amber-500/20 flex items-center justify-center text-4xl mb-4 border-2 border-amber-500/50 shadow-lg">
              {user.avatar}
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 flex items-center justify-center gap-2">
              {user.name}
              {user.role === 'owner' && <Crown className="w-5 h-5 text-amber-500 fill-amber-500" />}
            </h2>
            <p className="text-xs text-slate-400 mt-1 mb-2">{user.email}</p>

            {user.role === 'owner' && (
              <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 text-amber-500 rounded-full text-xs font-black uppercase border border-amber-500/40">
                <ShieldCheck className="w-4 h-4" /> App Owner & System Manager
              </div>
            )}

            <button
              onClick={() => { logoutUser(); onClose(); }}
              className="w-full py-3 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm shadow-md transition-colors"
            >
              Sign Out
            </button>
          </div>
        ) : (
          // ---- Passwordless Login Form ----
          <div>
            <div className="text-center mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 text-sky-500 text-xs font-extrabold uppercase">
                <Sparkles className="w-3.5 h-3.5" /> North Learn Secure Auth
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-2">
                Sign In / Register
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Enter your email. We'll send you a passwordless sign-in code link to access.
              </p>
            </div>

            {success ? (
              <div className="text-center p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl mb-4">
                <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Sign-in Link Sent!</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                  We sent an email to <span className="font-bold text-sky-600">{email}</span>. Click the link in your inbox to complete signing in.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none border border-slate-200 dark:border-slate-700"
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-xs text-rose-500 font-bold text-center bg-rose-500/10 py-2 rounded-xl border border-rose-500/30">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-lg shadow-sky-600/30 transition-all hover:scale-105 flex items-center justify-center gap-2"
                >
                  {loading && <RefreshCw className="w-4 h-4 animate-spin" />}
                  {loading ? 'Sending link...' : 'Send Magic Sign-In Link'}
                </button>
              </form>
            )}
            
            <p className="text-[10px] text-slate-400 text-center mt-4">
              By continuing, you agree to secure sign-in via Firebase. No passwords are stored.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
