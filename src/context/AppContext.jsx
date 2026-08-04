import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../services/firebase';
import { 
  onAuthStateChanged, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut 
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  collection, 
  query, 
  getDocs, 
  deleteDoc, 
  onSnapshot 
} from 'firebase/firestore';
import { INITIAL_STORIES, LANGUAGES, translateWord } from '../data/stories';

const AppContext = createContext();

const STATIC_CODES = ['NORTHPRO', 'ABOODPRO', 'NORTH2026', 'VIP2026', 'NORTHLEARN'];
export const FREE_STORIES_PER_LEVEL = 3;
const OWNER_EMAIL = 'abooodiv96@gmail.com';

const isExpired = (isoDate) => {
  if (!isoDate) return false;
  return new Date() > new Date(isoDate);
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Per-user dynamic states fetched from Firestore
  const [stats, setStats] = useState({ streakDays: 0, totalXp: 0, lastLogin: '', minutesToday: 0 });
  const [vocabulary, setVocabulary] = useState([]);
  const [isPro, setIsPro] = useState(false);
  const [subDetails, setSubDetails] = useState({ isPro: false, expiresAt: null });
  const [targetLang, setTargetLangState] = useState('ar');
  const [darkMode, setDarkModeState] = useState(true);
  const [audioSpeed, setAudioSpeedState] = useState(1.0);

  // Owner specific dynamic states
  const [dynamicCodes, setDynamicCodes] = useState([]);
  const [stories, setStories] = useState(INITIAL_STORIES);

  // Modals & Navigation
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSubOpen, setIsSubOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('catalog');
  const [selectedStory, setSelectedStory] = useState(null);

  // Sync dark mode to html class
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  // 1. Firebase Auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const emailLower = firebaseUser.email.toLowerCase();
        
        // Basic user object
        const tempUser = {
          uid: firebaseUser.uid,
          email: emailLower,
          name: emailLower === OWNER_EMAIL ? 'Abood (Owner & Manager)' : emailLower.split('@')[0],
          avatar: emailLower === OWNER_EMAIL ? '👑' : '🧭',
          role: emailLower === OWNER_EMAIL ? 'owner' : 'user'
        };
        setUser(tempUser);

        // Fetch User Data from Firestore
        await syncUserData(tempUser);
      } else {
        setUser(null);
        resetStateToGuest();
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 2. Real-time sync for global stories and redeem codes (especially if owner updates them)
  useEffect(() => {
    if (!db) return;

    // Stream dynamic codes
    const codesQuery = query(collection(db, 'redeem_codes'));
    const unsubCodes = onSnapshot(codesQuery, (snapshot) => {
      const codes = [];
      snapshot.forEach(doc => {
        codes.push({ id: doc.id, ...doc.data() });
      });
      setDynamicCodes(codes);
    });

    // Stream custom stories
    const storiesQuery = query(collection(db, 'custom_stories'));
    const unsubStories = onSnapshot(storiesQuery, (snapshot) => {
      const customList = [];
      snapshot.forEach(doc => {
        customList.push({ id: doc.id, ...doc.data() });
      });
      // Merge initial local stories with live custom stories
      setStories([...customList, ...INITIAL_STORIES]);
    });

    return () => {
      unsubCodes();
      unsubStories();
    };
  }, []);

  // Handle setting active story once stories are loaded
  useEffect(() => {
    if (stories.length > 0 && !selectedStory) {
      setSelectedStory(stories[0]);
    }
  }, [stories]);

  const resetStateToGuest = () => {
    setStats({ streakDays: 0, totalXp: 0, lastLogin: '', minutesToday: 0 });
    setVocabulary([]);
    setIsPro(false);
    setSubDetails({ isPro: false, expiresAt: null });
    setTargetLangState('ar');
    setDarkModeState(true);
    setAudioSpeedState(1.0);
  };

  // Sync user profile stats, vocabulary, subscription from Firestore
  const syncUserData = async (currentUser) => {
    try {
      const userDocRef = doc(db, 'users', currentUser.uid);
      const userSnap = await getDoc(userDocRef);

      let currentStats = { streakDays: 0, totalXp: 0, lastLogin: new Date().toISOString().split('T')[0], minutesToday: 0 };
      let currentSettings = { targetLanguage: 'ar', darkMode: true, audioSpeed: 1.0 };
      let currentSub = { isPro: currentUser.email === OWNER_EMAIL, expiresAt: null };

      if (userSnap.exists()) {
        const data = userSnap.data();
        if (data.stats) currentStats = { ...currentStats, ...data.stats };
        if (data.settings) currentSettings = { ...currentSettings, ...data.settings };
        if (data.subscription) currentSub = { ...currentSub, ...data.subscription };
      } else {
        // Create initial record in Firestore
        await setDoc(userDocRef, {
          email: currentUser.email,
          stats: currentStats,
          settings: currentSettings,
          subscription: currentSub,
          createdAt: new Date().toISOString()
        });
      }

      // Handle owner bypass for PRO
      if (currentUser.email === OWNER_EMAIL) {
        currentSub = { isPro: true, expiresAt: null };
      }

      // Check for subscription expiry
      if (currentSub.isPro && currentSub.expiresAt && isExpired(currentSub.expiresAt)) {
        currentSub = { isPro: false, expiresAt: null };
        await updateDoc(userDocRef, { subscription: currentSub });
      }

      // Update state
      setStats(currentStats);
      setTargetLangState(currentSettings.targetLanguage || 'ar');
      setDarkModeState(currentSettings.darkMode !== false);
      setAudioSpeedState(currentSettings.audioSpeed || 1.0);
      setIsPro(currentSub.isPro);
      setSubDetails(currentSub);

      // Fetch user's Vocabulary Bank from subcollection
      const vocabQuery = query(collection(db, 'users', currentUser.uid, 'vocabulary'));
      const vocabSnap = await getDocs(vocabQuery);
      const vocabList = [];
      vocabSnap.forEach(doc => {
        vocabList.push({ id: doc.id, ...doc.data() });
      });
      setVocabulary(vocabList);

    } catch (e) {
      console.error("Error syncing user data from Firestore:", e);
    }
  };

  // ── Email + Password Auth ─────────────────────────────────────────────────
  const registerUser = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
      return { success: true };
    } catch (err) {
      const msg = err.code === 'auth/email-already-in-use'
        ? 'This email is already registered. Try logging in.'
        : err.code === 'auth/weak-password'
        ? 'Password must be at least 6 characters.'
        : err.message;
      return { success: false, message: msg };
    }
  };

  const loginUser = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
      return { success: true };
    } catch (err) {
      const msg = err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential'
        ? 'Incorrect email or password.'
        : err.message;
      return { success: false, message: msg };
    }
  };

  const logoutUser = async () => {
    await signOut(auth);
  };

  // ── Realtime DB Updaters ──────────────────────────────────────────────────
  const updateFirestoreSettings = async (updates) => {
    if (!user) return;
    try {
      const userDocRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userDocRef);
      const currentSettings = userSnap.exists() ? (userSnap.data().settings || {}) : {};
      await updateDoc(userDocRef, { settings: { ...currentSettings, ...updates } });
    } catch (e) {
      console.error(e);
    }
  };

  const setTargetLang = (langCode) => {
    setTargetLangState(langCode);
    updateFirestoreSettings({ targetLanguage: langCode });
  };

  const setDarkMode = (isDark) => {
    setDarkModeState(isDark);
    updateFirestoreSettings({ darkMode: isDark });
  };

  const setAudioSpeed = (speed) => {
    setAudioSpeedState(speed);
    updateFirestoreSettings({ audioSpeed: speed });
  };

  const addXp = async (amount) => {
    const updatedStats = { ...stats, totalXp: (stats.totalXp || 0) + amount };
    setStats(updatedStats);
    if (user) {
      try {
        await updateDoc(doc(db, 'users', user.uid), { stats: updatedStats });
      } catch (e) {
        console.error(e);
      }
    }
  };

  // ── Vocabulary Subcollection ──────────────────────────────────────────────
  const saveWord = async (word, translation, example = '') => {
    const targetTranslation = translation || translateWord(word, targetLang);
    const newWord = {
      word,
      translation: targetTranslation,
      languageCode: targetLang,
      example,
      learnedStatus: 0,
      createdAt: new Date().toISOString()
    };

    if (user) {
      try {
        const docRef = doc(collection(db, 'users', user.uid, 'vocabulary'));
        await setDoc(docRef, newWord);
        setVocabulary([{ id: docRef.id, ...newWord }, ...vocabulary]);
        await addXp(15);
      } catch (e) {
        console.error(e);
      }
    } else {
      // Fallback local memory for guests
      setVocabulary([{ id: `guest-${Date.now()}`, ...newWord }, ...vocabulary]);
    }
  };

  const deleteWord = async (id) => {
    if (user) {
      try {
        await deleteDoc(doc(db, 'users', user.uid, 'vocabulary', id));
        setVocabulary(vocabulary.filter(v => v.id !== id));
      } catch (e) {
        console.error(e);
      }
    } else {
      setVocabulary(vocabulary.filter(v => v.id !== id));
    }
  };

  // ── Redeem Code System ────────────────────────────────────────────────────
  const redeemCode = async (code) => {
    if (!user) return { success: false, message: '❌ Please login first to redeem a code.' };
    const normalized = code.trim().toUpperCase();

    if (STATIC_CODES.includes(normalized)) {
      const updated = { isPro: true, expiresAt: null };
      setIsPro(true);
      setSubDetails(updated);
      await updateDoc(doc(db, 'users', user.uid), { subscription: updated });
      return { success: true, message: '🎉 Static code accepted! Lifetime PRO activated.' };
    }

    // Get fresh dynamic code from live list
    const dynCode = dynamicCodes.find(c => c.code === normalized);
    if (dynCode) {
      if (dynCode.codeExpiresAt && isExpired(dynCode.codeExpiresAt)) {
        return { success: false, message: '⏰ This code has expired.' };
      }
      if (dynCode.usedBy) {
        return { success: false, message: '🚫 This code has already been used by another account.' };
      }

      // Calculate new expiry date based on now
      const accessExpiresAt = dynCode.accessDays
        ? new Date(new Date().getTime() + dynCode.accessDays * 86400000).toISOString()
        : null;

      // Update redeem code status in Firestore
      await setDoc(doc(db, 'redeem_codes', dynCode.id), {
        ...dynCode,
        usedBy: user.email,
        usedAt: new Date().toISOString(),
        usageCount: 1
      });

      // Grant PRO to current user
      const updated = { isPro: true, expiresAt: accessExpiresAt };
      setIsPro(true);
      setSubDetails(updated);
      await updateDoc(doc(db, 'users', user.uid), { subscription: updated });

      const label = accessExpiresAt
        ? `until ${new Date(accessExpiresAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}`
        : 'Lifetime';

      return { success: true, message: `🎉 Code accepted! PRO activated ${label}.` };
    }

    return { success: false, message: '❌ Invalid code.' };
  };

  // ── Owner: Publish dynamic code ──────────────────────────────────────────
  const publishRedeemCode = async (code, label = '', codeExpiryDays = null, accessDays = null) => {
    const normalized = code.trim().toUpperCase();
    if (!normalized) return { success: false, message: 'Code cannot be empty.' };

    const now = new Date();
    const codeExpiresAt = codeExpiryDays
      ? new Date(now.getTime() + codeExpiryDays * 86400000).toISOString()
      : null;

    const newCode = {
      code: normalized,
      label: label || normalized,
      createdAt: now.toISOString(),
      codeExpiresAt,
      accessDays,
      usageCount: 0,
      usedBy: null,
      usedAt: null
    };

    try {
      const docRef = doc(collection(db, 'redeem_codes'));
      await setDoc(docRef, newCode);
      return { success: true, message: `✅ Code "${normalized}" published successfully!` };
    } catch (e) {
      return { success: false, message: `❌ Error: ${e.message}` };
    }
  };

  const deleteRedeemCode = async (id) => {
    try {
      await deleteDoc(doc(db, 'redeem_codes', id));
    } catch (e) {
      console.error(e);
    }
  };

  // ── Owner: Publish Custom Story ───────────────────────────────────────────
  const addStory = async (newStory) => {
    try {
      const docRef = doc(collection(db, 'custom_stories'));
      await setDoc(docRef, newStory);
    } catch (e) {
      console.error("Error adding story to Firestore:", e);
    }
  };

  const deleteStory = async (storyId) => {
    try {
      await deleteDoc(doc(db, 'custom_stories', storyId));
    } catch (e) {
      console.error("Error deleting story from Firestore:", e);
    }
  };

  // ── Speech ────────────────────────────────────────────────────────────────
  const speakText = (text, lang = 'en-US', speed = audioSpeed, onBoundary = null, onEnd = null) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = speed;
    if (onBoundary) {
      utterance.onboundary = (e) => {
        if (e.name === 'word') onBoundary(e.charIndex, e.charLength);
      };
    }
    if (onEnd) utterance.onend = () => onEnd();
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeech = () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  };

  const selectStory = (story) => {
    setSelectedStory(story);
    setActiveTab('reader');
  };

  const isOwner = user?.email === OWNER_EMAIL;

  return (
    <AppContext.Provider
      value={{
        targetLang, setTargetLang,
        darkMode, setDarkMode,
        audioSpeed, setAudioSpeed,
        stats, addXp,
        vocabulary, saveWord, deleteWord,
        user, loginUser, registerUser, logoutUser,
        isOwner,
        isPro, subDetails, redeemCode,
        dynamicCodes, publishRedeemCode, deleteRedeemCode,
        isAuthOpen, setIsAuthOpen,
        isSubOpen, setIsSubOpen,
        activeTab, setActiveTab,
        stories, addStory, deleteStory,
        selectedStory, selectStory,
        speakText, stopSpeech,
        currentLanguageObj: LANGUAGES.find(l => l.code === targetLang) || LANGUAGES[0],
        OWNER_EMAIL,
        loading
      }}
    >
      {!loading && children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
