// Simple synchronous key-value store backed by a module-level map.
// On native this would be replaced with AsyncStorage; for web localStorage would work,
// but keeping this simple and universal so it works in all environments.
const store: Record<string, string> = {};

function hasLocalStorage(): boolean {
  try {
    return typeof localStorage !== 'undefined' && localStorage !== null;
  } catch {
    return false;
  }
}

const _hasLS = hasLocalStorage();

export const AsyncStorage_like = {
  get(key: string): string | null {
    try {
      if (_hasLS) return localStorage.getItem(key);
    } catch {}
    return store[key] ?? null;
  },
  set(key: string, value: string): void {
    try {
      if (_hasLS) { localStorage.setItem(key, value); return; }
    } catch {}
    store[key] = value;
  },
  remove(key: string): void {
    try {
      if (_hasLS) { localStorage.removeItem(key); return; }
    } catch {}
    delete store[key];
  },
};
