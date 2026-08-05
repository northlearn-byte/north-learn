import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { StoryCatalog } from './components/StoryCatalog';
import { StoryReader } from './components/StoryReader';
import { VocabularyBank } from './components/VocabularyBank';
import { Dashboard } from './components/Dashboard';
import { KidsSection } from './components/KidsSection';
import { OwnerManager } from './components/OwnerManager';
import { AuthModal } from './components/AuthModal';
import { SubscriptionModal } from './components/SubscriptionModal';
import { Translator } from './components/Translator';

const MainContent = () => {
  const { activeTab, isAuthOpen, setIsAuthOpen, isSubOpen, setIsSubOpen } = useApp();

  return (
    <main className="pb-20 lg:pb-8 min-h-[calc(100vh-3.5rem)] sm:min-h-[calc(100vh-4rem)]">
      {activeTab === 'catalog' && <StoryCatalog />}
      {activeTab === 'kids' && <KidsSection />}
      {activeTab === 'reader' && <StoryReader />}
      {activeTab === 'vocab' && <VocabularyBank />}
      {activeTab === 'dashboard' && <Dashboard />}
      {activeTab === 'manager' && <OwnerManager />}
      {activeTab === 'translator' && <Translator />}

      {/* Auth & Subscription Modals */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      <SubscriptionModal isOpen={isSubOpen} onClose={() => setIsSubOpen(false)} />
    </main>
  );
};

export function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 font-sans selection:bg-sky-500 selection:text-white transition-colors duration-300">
        <Navbar />
        <MainContent />
      </div>
    </AppProvider>
  );
}

export default App;
