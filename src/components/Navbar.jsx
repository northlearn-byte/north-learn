import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LANGUAGES } from '../data/stories';
import {
  Moon, Sun, Flame, Zap, Compass,
  BookOpen, Bookmark, LayoutDashboard,
  User, Crown, Smile, ShieldCheck
} from 'lucide-react';

// ═══════════════════════════════════════════════════════
//  MOBILE BOTTOM NAV  (shown only on < lg screens)
// ═══════════════════════════════════════════════════════
export const MobileBottomNav = () => {
  const { activeTab, setActiveTab, isOwner, setIsAuthOpen, setIsSubOpen, user, isPro } = useApp();

  const tabs = [
    { id: 'catalog',   icon: BookOpen,         label: 'Stories',  activeOn: ['catalog','reader'] },
    { id: 'kids',      icon: Smile,            label: 'Kids 🧸',  color: 'pink' },
    { id: 'vocab',     icon: Bookmark,         label: 'Words' },
    { id: 'dashboard', icon: LayoutDashboard,  label: 'Stats' },
    ...(isOwner ? [{ id: 'manager', icon: ShieldCheck, label: 'Owner', color: 'amber' }] : []),
  ];

  const isActive = (tab) =>
    tab.activeOn ? tab.activeOn.includes(activeTab) : activeTab === tab.id;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden
                 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md
                 border-t border-slate-200 dark:border-slate-800
                 safe-area-inset-bottom"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex items-stretch justify-around" style={{ height: '56px' }}>
        {tabs.map((tab) => {
          const active = isActive(tab);
          const colorMap = {
            pink:  active ? 'text-pink-500 dark:text-pink-400'  : 'text-slate-400 dark:text-slate-500',
            amber: active ? 'text-amber-500'                    : 'text-slate-400 dark:text-slate-500',
          };
          const textColor = colorMap[tab.color] ?? (active ? 'text-sky-600 dark:text-sky-400' : 'text-slate-400 dark:text-slate-500');
          const bgActive = tab.color === 'pink'
            ? 'bg-pink-500/15'
            : tab.color === 'amber'
            ? 'bg-amber-500/15'
            : 'bg-sky-500/15';

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center flex-1 gap-0.5 text-[10px] font-bold transition-all duration-200 ${textColor}`}
            >
              <div className={`p-1.5 rounded-xl transition-all duration-200 ${active ? `${bgActive} scale-110` : ''}`}>
                <tab.icon className="w-5 h-5" />
              </div>
              <span className="leading-none">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

// ═══════════════════════════════════════════════════════
//  MAIN NAVBAR
// ═══════════════════════════════════════════════════════
export const Navbar = () => {
  const {
    targetLang, setTargetLang,
    darkMode, setDarkMode,
    stats,
    activeTab, setActiveTab,
    user, isPro, isOwner,
    setIsAuthOpen, setIsSubOpen
  } = useApp();

  const desktopTabs = [
    { id: 'catalog',   icon: BookOpen,        label: 'Stories',        activeOn: ['catalog','reader'] },
    { id: 'kids',      icon: Smile,           label: 'Kids Zone 🧸',   color: 'pink' },
    { id: 'vocab',     icon: Bookmark,        label: 'Vocabulary' },
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    ...(isOwner ? [{ id: 'manager', icon: ShieldCheck, label: 'Manager 👑', color: 'amber' }] : []),
  ];

  const isActive = (tab) =>
    tab.activeOn ? tab.activeOn.includes(activeTab) : activeTab === tab.id;

  const tabCls = (tab) => {
    const active = isActive(tab);
    if (tab.color === 'pink')
      return active
        ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md font-extrabold'
        : 'text-pink-600 dark:text-pink-400 hover:bg-pink-500/10';
    if (tab.color === 'amber')
      return active
        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-sm font-black'
        : 'text-amber-600 dark:text-amber-400 hover:bg-amber-500/10';
    return active
      ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-400 shadow-sm font-bold'
      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200';
  };

  return (
    <>
      {/* ── TOP HEADER ────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 gap-2 sm:gap-4">

            {/* Logo */}
            <div
              onClick={() => setActiveTab('catalog')}
              className="flex items-center gap-2 sm:gap-3 cursor-pointer group shrink-0"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-sky-400 flex items-center justify-center shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform duration-200">
                <Compass className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <span className="text-base sm:text-xl font-bold bg-gradient-to-r from-sky-600 via-sky-500 to-amber-500 bg-clip-text text-transparent leading-tight block">
                  North Learn
                </span>
                <span className="text-[10px] sm:text-xs font-semibold text-slate-400 dark:text-slate-500 -mt-0.5 block hidden sm:block">
                  Language Academy 🧭
                </span>
              </div>
            </div>

            {/* Desktop Nav (hidden on mobile — bottom nav handles it) */}
            <nav className="hidden lg:flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
              {desktopTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${tabCls(tab)}`}
                >
                  <tab.icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              ))}
            </nav>

            {/* Right Controls */}
            <div className="flex items-center gap-1.5 sm:gap-2">

              {/* PRO Badge */}
              <button
                onClick={() => setIsSubOpen(true)}
                className={`flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-full text-xs font-black transition-all ${
                  isPro
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                <Crown className="w-3.5 h-3.5 fill-current text-amber-500 shrink-0" />
                <span className="hidden sm:inline whitespace-nowrap">
                  {isPro ? 'PRO' : 'Upgrade'}
                </span>
              </button>

              {/* Streak — hidden on xs */}
              <div className="hidden sm:flex items-center gap-1 bg-amber-500/10 border border-amber-500/30 px-2 py-1 rounded-full text-amber-600 dark:text-amber-400 text-xs font-bold">
                <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500 shrink-0" />
                <span>{stats.streakDays}d</span>
              </div>

              {/* XP — hidden on mobile */}
              <div className="hidden md:flex items-center gap-1 bg-sky-500/10 border border-sky-500/30 px-2 py-1 rounded-full text-sky-600 dark:text-sky-400 text-xs font-bold">
                <Zap className="w-3.5 h-3.5 fill-sky-500 text-sky-500 shrink-0" />
                <span>{stats.totalXp} XP</span>
              </div>

              {/* Language Picker */}
              <div className="relative">
                <select
                  value={targetLang}
                  onChange={(e) => setTargetLang(e.target.value)}
                  className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-semibold text-xs pl-2 pr-5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer appearance-none max-w-[72px] sm:max-w-none"
                >
                  {LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-400">▼</div>
              </div>

              {/* Auth */}
              <button
                onClick={() => setIsAuthOpen(true)}
                className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                title="Account"
              >
                {user
                  ? <span className="text-lg leading-none">{user.avatar}</span>
                  : <User className="w-4 h-4 text-sky-500" />
                }
              </button>

              {/* Dark Mode */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-1.5 sm:p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                title={darkMode ? 'Light Mode' : 'Dark Mode'}
              >
                {darkMode
                  ? <Sun className="w-4 h-4 text-amber-400 fill-amber-400/20" />
                  : <Moon className="w-4 h-4 text-slate-700" />
                }
              </button>

            </div>
          </div>
        </div>
      </header>

      {/* ── MOBILE BOTTOM NAV ─────────────────────────── */}
      <MobileBottomNav />
    </>
  );
};
