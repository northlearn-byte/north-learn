import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck, Plus, Trash2, Copy, CheckCheck, Ticket,
  BookOpen, FileText, Layers, AlertTriangle, RefreshCw,
  ChevronRight, Zap, Users, Lock, CalendarClock, CalendarX2
} from 'lucide-react';
import { LEVELS, CATEGORIES } from '../data/stories';

// ─── Helpers ────────────────────────────────────────────────────────────────
const generateRandomCode = () => {
  const words = ['NORTH', 'LEARN', 'ABOOD', 'PRO', 'MASTER', 'VIP', 'ELITE', 'STAR', 'GOLD', 'APEX'];
  const w1 = words[Math.floor(Math.random() * words.length)];
  const w2 = words[Math.floor(Math.random() * words.length)];
  const num = Math.floor(100 + Math.random() * 900);
  return `${w1}${w2}${num}`;
};

const formatDate = (iso) => {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

// ─── Section Tab Button ──────────────────────────────────────────────────────
const SectionTab = ({ active, onClick, icon: Icon, label, color = 'sky' }) => {
  const colors = {
    sky: active ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30' : 'text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950/40',
    amber: active ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30' : 'text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40',
    emerald: active ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30' : 'text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40',
  };
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl font-bold text-sm transition-all duration-200 ${colors[color]}`}
    >
      <Icon className="w-4.5 h-4.5" />
      {label}
    </button>
  );
};

// ─── Code Card ───────────────────────────────────────────────────────────────
const isExpiredDate = (iso) => iso && new Date() > new Date(iso);
const diffLabel = (iso) => {
  if (!iso) return '∞ Lifetime';
  const diff = Math.ceil((new Date(iso) - new Date()) / 86400000);
  if (diff <= 0) return '🔴 Expired';
  if (diff === 1) return '🟡 1 day left';
  if (diff < 7) return `🟡 ${diff} days left`;
  return `🟢 ${formatDate(iso)}`;
};

const CodeCard = ({ entry, onDelete }) => {
  const [copied, setCopied] = useState(false);
  const copyCode = () => {
    navigator.clipboard.writeText(entry.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const codeExpired = isExpiredDate(entry.codeExpiresAt);
  const isUsed = !!entry.usedBy;

  return (
    <div className={`p-4 rounded-2xl border transition-all ${
      isUsed
        ? 'bg-slate-100/60 dark:bg-slate-800/40 border-slate-300 dark:border-slate-700'
        : codeExpired
        ? 'bg-slate-100/50 dark:bg-slate-800/30 border-slate-300 dark:border-slate-700 opacity-60'
        : 'bg-emerald-500/5 border-emerald-500/20 hover:border-emerald-500/40'
    }`}>
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
          isUsed ? 'bg-indigo-500/15' : codeExpired ? 'bg-slate-200 dark:bg-slate-700' : 'bg-emerald-500/15'
        }`}>
          <Ticket className={`w-5 h-5 ${isUsed ? 'text-indigo-500' : codeExpired ? 'text-slate-400' : 'text-emerald-500'}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1.5">
            <span className={`font-mono font-black text-sm tracking-wider ${
              isUsed ? 'text-indigo-600 dark:text-indigo-400' : codeExpired ? 'text-slate-400' : 'text-emerald-600 dark:text-emerald-400'
            }`}>{entry.code}</span>
            {/* Status badges */}
            {isUsed && (
              <span className="text-[10px] font-black uppercase bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-full border border-indigo-500/30">
                ✓ Used
              </span>
            )}
            {!isUsed && codeExpired && (
              <span className="text-[10px] font-black uppercase text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded-full">
                Expired
              </span>
            )}
            {!isUsed && !codeExpired && (
              <span className="text-[10px] font-black uppercase bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30">
                Available
              </span>
            )}
            {entry.label && entry.label !== entry.code && (
              <span className="text-xs text-slate-400 font-medium truncate">— {entry.label}</span>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-0.5 text-xs">
            <div className="flex items-center gap-1 text-slate-500">
              <CalendarClock className="w-3 h-3 text-amber-500 shrink-0" />
              <span>Code: <span className="font-semibold">{diffLabel(entry.codeExpiresAt)}</span></span>
            </div>
            <div className="flex items-center gap-1 text-slate-500">
              <CalendarX2 className="w-3 h-3 text-sky-500 shrink-0" />
              <span>PRO: <span className="font-semibold">
                {entry.accessDays
                  ? `${entry.accessDays}d access`
                  : '∞ Lifetime'}
              </span></span>
            </div>
            {isUsed && (
              <div className="flex items-center gap-1 text-indigo-500 col-span-2 mt-0.5">
                <Users className="w-3 h-3 shrink-0" />
                <span className="font-semibold truncate">Used by: {entry.usedBy}</span>
                {entry.usedAt && (
                  <span className="text-slate-400 font-normal ml-1">— {formatDate(entry.usedAt)}</span>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button onClick={copyCode} title="Copy" className={`p-2 rounded-xl bg-slate-100 dark:bg-slate-800 transition-colors ${isUsed ? 'opacity-40 cursor-not-allowed' : 'hover:bg-emerald-500/20 hover:text-emerald-500'} text-slate-500`}
            disabled={isUsed}
          >
            {copied ? <CheckCheck className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
          </button>
          <button onClick={() => onDelete(entry.id)} title="Delete" className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-500/20 text-slate-500 hover:text-rose-500 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};


// ─── Story Form ───────────────────────────────────────────────────────────────
const EMPTY_STORY = {
  title: '',
  level: 'A1',
  category: 'Adventure',
  readTime: '3 min',
  image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80',
  paragraphs: [{ en: '', ar: '' }]
};

const StoryForm = ({ onPublish }) => {
  const [form, setForm] = useState({ ...EMPTY_STORY, paragraphs: [{ en: '', ar: '' }] });
  const [result, setResult] = useState(null);
  const [publishing, setPublishing] = useState(false);

  const handleParagraphChange = (i, field, value) => {
    const updated = [...form.paragraphs];
    updated[i] = { ...updated[i], [field]: value };
    setForm(f => ({ ...f, paragraphs: updated }));
  };

  const addParagraph = () => {
    setForm(f => ({ ...f, paragraphs: [...f.paragraphs, { en: '', ar: '' }] }));
  };

  const removeParagraph = (i) => {
    if (form.paragraphs.length <= 1) return;
    setForm(f => ({ ...f, paragraphs: f.paragraphs.filter((_, idx) => idx !== i) }));
  };

  const handlePublish = () => {
    if (!form.title.trim()) { setResult({ success: false, message: 'Story title is required.' }); return; }
    if (!form.paragraphs[0].en.trim()) { setResult({ success: false, message: 'At least one English paragraph is required.' }); return; }

    setPublishing(true);
    const newStory = {
      id: `custom-${Date.now()}`,
      ...form,
      paragraphs: form.paragraphs.filter(p => p.en.trim()),
      custom: true
    };
    onPublish(newStory);
    setResult({ success: true, message: `✅ "${form.title}" published to the catalog!` });
    setForm({ ...EMPTY_STORY, paragraphs: [{ en: '', ar: '' }] });
    setPublishing(false);
    setTimeout(() => setResult(null), 3500);
  };

  return (
    <div className="space-y-5">
      {/* Title, Level, Category, Read Time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">Story Title *</label>
          <input
            type="text"
            placeholder="e.g. The Lost Explorer"
            value={form.title}
            onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold focus:ring-2 focus:ring-sky-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">Level</label>
          <select
            value={form.level}
            onChange={e => setForm(f => ({ ...f, level: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold focus:ring-2 focus:ring-sky-500 focus:outline-none"
          >
            {LEVELS.filter(l => l !== 'All').map(l => <option key={l}>{l}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">Category</label>
          <select
            value={form.category}
            onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold focus:ring-2 focus:ring-sky-500 focus:outline-none"
          >
            {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">Read Time</label>
          <input
            type="text"
            placeholder="e.g. 4 min"
            value={form.readTime}
            onChange={e => setForm(f => ({ ...f, readTime: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold focus:ring-2 focus:ring-sky-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">Cover Image URL</label>
          <input
            type="text"
            placeholder="https://..."
            value={form.image}
            onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-mono text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Paragraphs */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Story Paragraphs *</label>
          <button
            type="button"
            onClick={addParagraph}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-100 dark:bg-sky-900/40 text-sky-600 dark:text-sky-400 text-xs font-bold hover:bg-sky-200 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Add Paragraph
          </button>
        </div>

        <div className="space-y-4">
          {form.paragraphs.map((para, i) => (
            <div key={i} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-400 uppercase">Paragraph {i + 1}</span>
                {form.paragraphs.length > 1 && (
                  <button onClick={() => removeParagraph(i)} className="text-rose-400 hover:text-rose-500">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <div>
                <label className="text-xs text-slate-400 font-semibold mb-1 block">🇬🇧 English *</label>
                <textarea
                  rows={3}
                  placeholder="English paragraph text..."
                  value={para.en}
                  onChange={e => handleParagraphChange(i, 'en', e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none resize-none"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 font-semibold mb-1 block">🌍 Translation (optional)</label>
                <textarea
                  rows={2}
                  placeholder="Arabic / other translation..."
                  value={para.ar}
                  onChange={e => handleParagraphChange(i, 'ar', e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none resize-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Result Message */}
      {result && (
        <div className={`p-3.5 rounded-xl text-sm font-bold text-center ${
          result.success
            ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
            : 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30'
        }`}>
          {result.message}
        </div>
      )}

      {/* Publish Button */}
      <button
        onClick={handlePublish}
        disabled={publishing}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white font-black text-base shadow-xl shadow-sky-600/30 transition-all hover:scale-[1.02] disabled:opacity-60 flex items-center justify-center gap-2"
      >
        <ChevronRight className="w-5 h-5" />
        Continue — Publish Story to Catalog
      </button>
    </div>
  );
};

// Duration options for selects
const CODE_VALIDITY_OPTIONS = [
  { label: '3 Days',   days: 3 },
  { label: '1 Week',   days: 7 },
  { label: '2 Weeks',  days: 14 },
  { label: '1 Month',  days: 30 },
  { label: '3 Months', days: 90 },
  { label: '6 Months', days: 180 },
  { label: '1 Year',   days: 365 },
  { label: '∞ Never Expire', days: null },
];

const ACCESS_DURATION_OPTIONS = [
  { label: '3 Days',   days: 3 },
  { label: '1 Week',   days: 7 },
  { label: '2 Weeks',  days: 14 },
  { label: '1 Month',  days: 30 },
  { label: '3 Months', days: 90 },
  { label: '6 Months', days: 180 },
  { label: '1 Year',   days: 365 },
  { label: '∞ Lifetime', days: null },
];

// ─── Code Manager ─────────────────────────────────────────────────────────────
const CodeManager = () => {
  const { dynamicCodes, publishRedeemCode, deleteRedeemCode } = useApp();

  const [codeInput, setCodeInput]         = useState('');
  const [labelInput, setLabelInput]       = useState('');
  const [codeValidityDays, setCodeValidity] = useState(30);    // days until code stops working
  const [accessDays, setAccessDays]       = useState(30);       // days of PRO after redeem
  const [result, setResult]               = useState(null);

  const handleGenerate = () => {
    setCodeInput(generateRandomCode());
    setResult(null);
  };

  const handlePublish = async () => {
    if (!codeInput.trim()) { setResult({ success: false, message: 'Enter a code first.' }); return; }
    try {
      const res = await publishRedeemCode(codeInput, labelInput, codeValidityDays, accessDays);
      setResult(res);
      if (res && res.success) {
        setCodeInput('');
        setLabelInput('');
        setTimeout(() => setResult(null), 3000);
      }
    } catch (err) {
      console.error(err);
      setResult({ success: false, message: 'Failed to create code. Try again.' });
    }
  };

  return (
    <div className="space-y-6">
      {/* Code Creator */}
      <div className="p-5 sm:p-6 rounded-3xl bg-emerald-500/5 border border-emerald-500/25">
        <h3 className="font-black text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-5">
          <Ticket className="w-5 h-5 text-emerald-500" /> Create a New Redeem Code
        </h3>

        <div className="space-y-4">
          {/* Code input + random */}
          <div>
            <label className="text-xs font-bold text-slate-500 mb-1.5 block uppercase tracking-wide">Code *</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. NORTHVIP2026"
                value={codeInput}
                onChange={e => { setCodeInput(e.target.value.toUpperCase()); setResult(null); }}
                className="flex-1 px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono font-black tracking-widest text-sm uppercase focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
              <button onClick={handleGenerate} title="Generate random" className="px-3 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 transition-colors">
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Label */}
          <div>
            <label className="text-xs font-bold text-slate-500 mb-1.5 block uppercase tracking-wide">Label / Note (optional)</label>
            <input
              type="text"
              placeholder="e.g. Batch #3 / Ramadan offer"
              value={labelInput}
              onChange={e => setLabelInput(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          {/* Duration grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-amber-500/5 border border-amber-500/20">
              <label className="flex items-center gap-1.5 text-xs font-black text-amber-600 dark:text-amber-400 mb-2 uppercase tracking-wide">
                <CalendarClock className="w-3.5 h-3.5" /> Code Valid For
              </label>
              <select
                value={codeValidityDays ?? 'null'}
                onChange={e => setCodeValidity(e.target.value === 'null' ? null : Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-amber-300 dark:border-amber-700/50 text-sm font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-none"
              >
                {CODE_VALIDITY_OPTIONS.map(o => (
                  <option key={o.label} value={o.days ?? 'null'}>{o.label}</option>
                ))}
              </select>
              <p className="text-[10px] text-slate-400 mt-1.5">How long before this code stops being redeemable.</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-sky-500/5 border border-sky-500/20">
              <label className="flex items-center gap-1.5 text-xs font-black text-sky-600 dark:text-sky-400 mb-2 uppercase tracking-wide">
                <CalendarX2 className="w-3.5 h-3.5" /> PRO Access Duration
              </label>
              <select
                value={accessDays ?? 'null'}
                onChange={e => setAccessDays(e.target.value === 'null' ? null : Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-sky-300 dark:border-sky-700/50 text-sm font-semibold focus:ring-2 focus:ring-sky-500 focus:outline-none"
              >
                {ACCESS_DURATION_OPTIONS.map(o => (
                  <option key={o.label} value={o.days ?? 'null'}>{o.label}</option>
                ))}
              </select>
              <p className="text-[10px] text-slate-400 mt-1.5">How long the user gets PRO after redeeming this code.</p>
            </div>
          </div>

          {result && (
            <div className={`p-3 rounded-xl text-sm font-bold text-center ${
              result.success
                ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                : 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30'
            }`}>
              {result.message}
            </div>
          )}

          <button
            onClick={handlePublish}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-black text-sm shadow-lg shadow-emerald-600/20 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            <ChevronRight className="w-5 h-5" />
            Continue — Publish Redeem Code
          </button>
        </div>
      </div>

      {/* Code List */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-black text-slate-700 dark:text-slate-200 text-sm flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" />
            Custom Codes ({dynamicCodes.length})
          </h3>
          <span className="text-xs text-slate-400 font-medium">+ 5 built-in static codes</span>
        </div>

        {dynamicCodes.length === 0 ? (
          <div className="text-center py-10 text-slate-400">
            <Ticket className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="text-sm font-semibold">No custom codes yet</p>
            <p className="text-xs">Create one above and it will appear here</p>
          </div>
        ) : (
          <div className="space-y-3">
            {dynamicCodes.map(entry => (
              <CodeCard key={entry.id} entry={entry} onDelete={deleteRedeemCode} />
            ))}
          </div>
        )}
      </div>

      {/* Static Codes Info */}
      <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20">
        <div className="flex items-center gap-2 mb-2">
          <Lock className="w-4 h-4 text-amber-500" />
          <span className="text-xs font-black text-amber-600 dark:text-amber-400 uppercase tracking-wide">Built-in Static Codes — Lifetime access, never expire</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {['NORTHPRO', 'ABOODPRO', 'NORTH2026', 'VIP2026', 'NORTHLEARN'].map(c => (
            <span key={c} className="px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-600 dark:text-amber-400 font-mono font-bold text-xs">{c}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Sub-Admin Manager Component ────────────────────────────────────────────
const SubAdminManager = () => {
  const [subAdmins, setSubAdmins] = useState(() => {
    const saved = localStorage.getItem('north_learn_sub_admins');
    return saved ? JSON.parse(saved) : [
      { id: '1', email: 'editor@northlearn.com', name: 'Content Manager', role: 'Editor', canAddStories: true, canManageCodes: false },
      { id: '2', email: 'support@northlearn.com', name: 'Support Mod', role: 'Moderator', canAddStories: false, canManageCodes: true }
    ];
  });

  const [newEmail, setNewEmail] = useState('');
  const [newName, setNewName] = useState('');
  const [canAddStories, setCanAddStories] = useState(true);
  const [canManageCodes, setCanManageCodes] = useState(false);

  const handleAddSubAdmin = (e) => {
    e.preventDefault();
    if (!newEmail.trim()) return;
    const newAdmin = {
      id: Date.now().toString(),
      email: newEmail.trim(),
      name: newName.trim() || 'Sub-Admin',
      role: 'Sub-Admin',
      canAddStories,
      canManageCodes
    };
    const updated = [newAdmin, ...subAdmins];
    setSubAdmins(updated);
    localStorage.setItem('north_learn_sub_admins', JSON.stringify(updated));
    setNewEmail('');
    setNewName('');
  };

  const handleRemove = (id) => {
    const updated = subAdmins.filter(a => a.id !== id);
    setSubAdmins(updated);
    localStorage.setItem('north_learn_sub_admins', JSON.stringify(updated));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-500" /> Administrative Team & Sub-Admins
          </h3>
          <p className="text-xs text-slate-400">
            Assign team members limited permissions (e.g. adding stories or managing promo codes) without full owner access.
          </p>
        </div>
      </div>

      {/* Add Sub-Admin Form */}
      <form onSubmit={handleAddSubAdmin} className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-4">
        <h4 className="text-xs font-black uppercase text-amber-600 dark:text-amber-400 tracking-wider">Assign New Sub-Admin</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="email"
            required
            placeholder="Sub-Admin Email Address"
            value={newEmail}
            onChange={e => setNewEmail(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <input
            type="text"
            placeholder="Name / Title (e.g. Story Editor)"
            value={newName}
            onChange={e => setNewName(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        {/* Permissions checkboxes */}
        <div className="flex flex-wrap gap-4 text-xs font-bold text-slate-700 dark:text-slate-300 pt-1">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={canAddStories}
              onChange={e => setCanAddStories(e.target.checked)}
              className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500"
            />
            <span>Can Add & Edit Stories 📚</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={canManageCodes}
              onChange={e => setCanManageCodes(e.target.checked)}
              className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500"
            />
            <span>Can Manage Promo Codes 🎟️</span>
          </label>
        </div>

        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs shadow-md transition-all"
        >
          Add Sub-Admin Member
        </button>
      </form>

      {/* Sub-Admins List */}
      <div className="space-y-3">
        {subAdmins.map(admin => (
          <div key={admin.id} className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-2">
                  {admin.name} <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-semibold">{admin.email}</span>
                </div>
                <div className="text-xs text-slate-400 flex gap-3 mt-1">
                  <span>Perms:</span>
                  {admin.canAddStories && <span className="text-sky-500 font-bold">✓ Add Stories</span>}
                  {admin.canManageCodes && <span className="text-emerald-500 font-bold">✓ Promo Codes</span>}
                </div>
              </div>
            </div>

            <button
              onClick={() => handleRemove(admin.id)}
              className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
              title="Remove Sub-Admin"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Stats Overview ───────────────────────────────────────────────────────────
const StatsOverview = ({ stories, dynamicCodes }) => {
  const cards = [
    { label: 'Total Stories', value: stories.length, icon: BookOpen, color: 'sky', bg: 'bg-sky-500/10', text: 'text-sky-600 dark:text-sky-400' },
    { label: 'Custom Stories', value: stories.filter(s => s.custom).length, icon: FileText, color: 'indigo', bg: 'bg-indigo-500/10', text: 'text-indigo-600 dark:text-indigo-400' },
    { label: 'Active Codes', value: dynamicCodes.length + 5, icon: Ticket, color: 'emerald', bg: 'bg-emerald-500/10', text: 'text-emerald-600 dark:text-emerald-400' },
    { label: 'Levels Covered', value: new Set(stories.map(s => s.level)).size, icon: Layers, color: 'amber', bg: 'bg-amber-500/10', text: 'text-amber-600 dark:text-amber-400' },
  ];
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map(({ label, value, icon: Icon, bg, text }) => (
        <div key={label} className={`p-4 rounded-2xl ${bg} border border-current/10`}>
          <Icon className={`w-6 h-6 ${text} mb-2`} />
          <div className={`text-2xl font-black ${text}`}>{value}</div>
          <div className="text-xs text-slate-500 font-semibold mt-0.5">{label}</div>
        </div>
      ))}
    </div>
  );
};

// ─── Main Owner Manager Component ─────────────────────────────────────────────
export const OwnerManager = () => {
  const { isOwner, user, stories, addStory, dynamicCodes, setIsAuthOpen } = useApp();
  const [section, setSection] = useState('codes'); // 'codes' | 'stories'

  // Guard: not owner
  if (!isOwner) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-rose-500/10 flex items-center justify-center mb-6">
          <AlertTriangle className="w-10 h-10 text-rose-500" />
        </div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">Restricted Access</h2>
        <p className="text-slate-500 text-sm mb-6">This panel is only accessible to the App Owner.</p>
        <button
          onClick={() => setIsAuthOpen(true)}
          className="px-6 py-3 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-md transition-all"
        >
          Sign In as Owner
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">

      {/* Header */}
      <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-7 sm:p-10 text-white shadow-2xl overflow-hidden mb-8 border border-slate-700/50">
        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-2xl">
              {user?.avatar || '👑'}
            </div>
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" /> Owner Manager Panel
              </span>
              <p className="text-slate-400 text-xs mt-0.5">{user?.email}</p>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black leading-tight">
            North Learn — Control Center
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Manage stories, publish redeem codes, and control PRO access for all users.
          </p>
        </div>
      </div>

      {/* Stats */}
      <StatsOverview stories={stories} dynamicCodes={dynamicCodes} />

      {/* Section Tabs */}
      <div className="flex items-center gap-3 mb-6 p-1.5 bg-slate-100 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 w-fit">
        <SectionTab
          active={section === 'codes'}
          onClick={() => setSection('codes')}
          icon={Ticket}
          label="Redeem Codes"
          color="emerald"
        />
        <SectionTab
          active={section === 'stories'}
          onClick={() => setSection('stories')}
          icon={BookOpen}
          label="Add Story"
          color="sky"
        />
        <SectionTab
          active={section === 'team'}
          onClick={() => setSection('team')}
          icon={Users}
          label="Sub-Admins & Permissions"
          color="amber"
        />
      </div>

      {/* Content Panel */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700/60">
        {section === 'codes' && <CodeManager />}
        {section === 'stories' && (
          <div>
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="w-5 h-5 text-sky-500" />
              <h3 className="font-black text-slate-800 dark:text-slate-100 text-lg">Add New Story</h3>
            </div>
            <StoryForm onPublish={addStory} />
          </div>
        )}
        {section === 'team' && <SubAdminManager />}
      </div>
    </div>
  );
};
