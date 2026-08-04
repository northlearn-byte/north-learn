const STORAGE_KEYS = {
  USER: 'north_learn_user',
};

// ---- User Helpers ----
export const getStoredUser = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USER);
    return data ? JSON.parse(data) : null; // Default = Guest (null)
  } catch (e) {
    return null;
  }
};

export const saveStoredUser = (user) => {
  try {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  } catch (e) {
    console.error('Failed to save user', e);
  }
};

// ---- Per-User Key Helper ----
const userKey = (email, suffix) => `north_learn_${email}_${suffix}`;

// ---- Stats (Per-User) ----
const DEFAULT_STATS = {
  streakDays: 0,
  totalXp: 0,
  lastLogin: new Date().toISOString().split('T')[0],
  minutesToday: 0
};

export const getStoredStats = (email) => {
  try {
    const key = email ? userKey(email, 'stats') : 'north_learn_guest_stats';
    const data = localStorage.getItem(key);
    if (!data) return { ...DEFAULT_STATS };
    const parsed = JSON.parse(data);
    const today = new Date().toISOString().split('T')[0];
    if (parsed.lastLogin !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      parsed.streakDays = parsed.lastLogin === yesterday ? parsed.streakDays + 1 : 1;
      parsed.lastLogin = today;
      parsed.minutesToday = 0;
      localStorage.setItem(key, JSON.stringify(parsed));
    }
    return parsed;
  } catch (e) {
    return { ...DEFAULT_STATS };
  }
};

export const saveStoredStats = (email, stats) => {
  try {
    const key = email ? userKey(email, 'stats') : 'north_learn_guest_stats';
    localStorage.setItem(key, JSON.stringify(stats));
  } catch (e) {
    console.error('Failed to save stats', e);
  }
};

// ---- Vocabulary (Per-User) ----
export const getStoredVocabulary = (email) => {
  try {
    const key = email ? userKey(email, 'vocab') : 'north_learn_guest_vocab';
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

export const saveVocabularyWord = (email, word, translation, languageCode, example = '') => {
  try {
    const vocab = getStoredVocabulary(email);
    const exists = vocab.findIndex(
      v => v.word.toLowerCase() === word.toLowerCase() && v.languageCode === languageCode
    );
    if (exists >= 0) return vocab[exists];
    const newWord = {
      id: `v-${Date.now()}`,
      word, translation, languageCode, example,
      learnedStatus: 0,
      createdAt: new Date().toISOString()
    };
    const updated = [newWord, ...vocab];
    const key = email ? userKey(email, 'vocab') : 'north_learn_guest_vocab';
    localStorage.setItem(key, JSON.stringify(updated));
    return newWord;
  } catch (e) {
    console.error('Failed to save word', e);
  }
};

export const removeVocabularyWord = (email, id) => {
  try {
    const vocab = getStoredVocabulary(email);
    const updated = vocab.filter(v => v.id !== id);
    const key = email ? userKey(email, 'vocab') : 'north_learn_guest_vocab';
    localStorage.setItem(key, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to remove word', e);
    return [];
  }
};

// ---- Settings (Per-User or Global) ----
const DEFAULT_SETTINGS = {
  targetLanguage: 'ar',
  darkMode: true,
  audioSpeed: 1.0,
};

export const getStoredSettings = (email) => {
  try {
    const key = email ? userKey(email, 'settings') : 'north_learn_settings';
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : { ...DEFAULT_SETTINGS };
  } catch (e) {
    return { ...DEFAULT_SETTINGS };
  }
};

export const saveStoredSettings = (email, settings) => {
  try {
    const key = email ? userKey(email, 'settings') : 'north_learn_settings';
    localStorage.setItem(key, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save settings', e);
  }
};

// ---- Subscription (Per-User) ----
export const getStoredSubscription = (email) => {
  try {
    if (!email) return { isPro: false };
    const key = userKey(email, 'subscription');
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : { isPro: false };
  } catch (e) {
    return { isPro: false };
  }
};

export const saveStoredSubscription = (email, sub) => {
  try {
    if (!email) return;
    const key = userKey(email, 'subscription');
    localStorage.setItem(key, JSON.stringify(sub));
  } catch (e) {
    console.error('Failed to save subscription', e);
  }
};

// ---- Custom Stories (Global / Owner) ----
export const getCustomStories = () => {
  try {
    const data = localStorage.getItem('north_learn_custom_stories');
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return null;
  }
};

export const saveCustomStories = (stories) => {
  try {
    localStorage.setItem('north_learn_custom_stories', JSON.stringify(stories));
  } catch (e) {
    console.error('Failed to save custom stories', e);
  }
};
