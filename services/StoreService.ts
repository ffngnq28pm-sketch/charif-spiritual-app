/**
 * StoreService — RevenueCat integration for Nour in-app purchases.
 *
 * SETUP (one-time):
 *   1. Create a RevenueCat project at app.revenuecat.com
 *   2. Add your API keys to .env.local:
 *        EXPO_PUBLIC_RC_KEY_IOS=appl_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
 *        EXPO_PUBLIC_RC_KEY_ANDROID=goog_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
 *   3. Build via EAS: `eas build` (react-native-purchases requires native code)
 *
 * RevenueCat dashboard config expected:
 *   Entitlement : "premium"  → linked to nour_premium_monthly + nour_premium_lifetime
 *   Offering    : "default"  → packages: nour_premium_monthly, nour_premium_lifetime
 *   Offering    : "tips"     → packages: tip_small, tip_medium, tip_large
 *
 * Product IDs to register in App Store Connect / Google Play Console:
 *   nour_premium_monthly   — auto-renewable subscription, 4,99€/mois
 *   nour_premium_lifetime  — non-consumable one-time purchase, 39,99€
 *   tip_small              — consumable, 0,99€
 *   tip_medium             — consumable, 2,99€
 *   tip_large              — consumable, 4,99€
 */

import { Platform, NativeModules } from 'react-native';
import { AsyncStorage_like } from '@/context/storage';

// ── Types ─────────────────────────────────────────────────────────────────────

export type ProductId =
  | 'nour_premium_monthly'
  | 'nour_premium_lifetime'
  | 'tip_small'
  | 'tip_medium'
  | 'tip_large';

export interface Product {
  id: ProductId;
  title: string;
  price: string;
  priceAmount: number;
  currency: string;
  description: string;
  subscriptionPeriod?: 'P1M' | 'P1Y';
  trialDays?: number;
}

export type PurchaseResult =
  | { success: true; productId: ProductId }
  | { success: false; cancelled: boolean; error?: string };

// ── Configuration ─────────────────────────────────────────────────────────────

const RC_KEY_IOS     = process.env.EXPO_PUBLIC_RC_KEY_IOS     ?? '';
const RC_KEY_ANDROID = process.env.EXPO_PUBLIC_RC_KEY_ANDROID ?? '';
const PREMIUM_ENTITLEMENT = 'premium';
const CACHE_KEY = 'nour_rc_premium_v1';

// ── Runtime state ─────────────────────────────────────────────────────────────

let _configured  = false;
let _usingRC     = false;
let _premiumCache: boolean = AsyncStorage_like.get(CACHE_KEY) === 'true';

// Components subscribe here for real-time premium state changes
const _premiumListeners = new Set<(v: boolean) => void>();

// ── Internal helpers ──────────────────────────────────────────────────────────

function getActiveKey(): string {
  return Platform.OS === 'ios' ? RC_KEY_IOS : RC_KEY_ANDROID;
}

function isRCAvailable(): boolean {
  if (Platform.OS === 'web') return false;
  // NativeModules.RNPurchases is present only when the native module is linked
  return !!NativeModules.RNPurchases && getActiveKey().length > 10;
}

function notifyListeners(isPremium: boolean) {
  _premiumCache = isPremium;
  AsyncStorage_like.set(CACHE_KEY, isPremium ? 'true' : 'false');
  _premiumListeners.forEach((fn) => fn(isPremium));
}

// ── Fallback static product catalog ──────────────────────────────────────────

const CATALOG: Product[] = [
  {
    id: 'nour_premium_monthly',
    title: 'Nour Premium — Mensuel',
    price: '4,99€',
    priceAmount: 4.99,
    currency: 'EUR',
    description: 'Accès complet · résiliable à tout moment',
    subscriptionPeriod: 'P1M',
  },
  {
    id: 'nour_premium_lifetime',
    title: 'Nour Premium — À vie',
    price: '39,99€',
    priceAmount: 39.99,
    currency: 'EUR',
    description: 'Accès permanent · toutes les mises à jour futures',
  },
  {
    id: 'tip_small',
    title: 'Petite offrande',
    price: '0,99€',
    priceAmount: 0.99,
    currency: 'EUR',
    description: 'Un geste symbolique',
  },
  {
    id: 'tip_medium',
    title: 'Offrande généreuse',
    price: '2,99€',
    priceAmount: 2.99,
    currency: 'EUR',
    description: 'Enrichir le contenu spirituel',
  },
  {
    id: 'tip_large',
    title: 'Grande offrande',
    price: '4,99€',
    priceAmount: 4.99,
    currency: 'EUR',
    description: "Bâtir l'héritage",
  },
];

// ── Mock store (Expo Go / web / no API key configured) ────────────────────────

const MOCK_KEY    = 'nour_mock_premium_v2';
const MOCK_EXPIRY = 'nour_mock_premium_expiry_v2';

const MockStore = {
  purchase(productId: ProductId): Promise<PurchaseResult> {
    return new Promise((resolve) =>
      setTimeout(() => {
        const isPremiumProduct =
          productId === 'nour_premium_monthly' ||
          productId === 'nour_premium_lifetime';
        if (isPremiumProduct) {
          AsyncStorage_like.set(MOCK_KEY, 'true');
          if (productId === 'nour_premium_lifetime') {
            // Lifetime — no expiry
            AsyncStorage_like.remove(MOCK_EXPIRY);
          } else {
            AsyncStorage_like.set(MOCK_EXPIRY, String(Date.now() + 30 * 86400000));
          }
          notifyListeners(true);
        }
        resolve({ success: true, productId });
      }, 700),
    );
  },

  restore(): Promise<boolean> {
    return new Promise((resolve) =>
      setTimeout(() => {
        const ok = MockStore.isActive();
        if (ok) notifyListeners(true);
        resolve(ok);
      }, 900),
    );
  },

  isActive(): boolean {
    if (AsyncStorage_like.get(MOCK_KEY) !== 'true') return false;
    const expiry = AsyncStorage_like.get(MOCK_EXPIRY);
    if (!expiry) return true;
    return Date.now() < parseInt(expiry, 10);
  },

  unlock(durationMs = 30 * 86400000) {
    AsyncStorage_like.set(MOCK_KEY, 'true');
    AsyncStorage_like.set(MOCK_EXPIRY, String(Date.now() + durationMs));
    notifyListeners(true);
  },

  revoke() {
    AsyncStorage_like.remove(MOCK_KEY);
    AsyncStorage_like.remove(MOCK_EXPIRY);
    notifyListeners(false);
  },
};

// ── RevenueCat layer ──────────────────────────────────────────────────────────

// Lazy require avoids crash when native module is not linked (Expo Go / web)
type RCType = any;
type CustomerInfo = any;
type RCPackage = any;

let _RC: RCType | null = null;

function getRC(): RCType | null {
  if (_RC) return _RC;
  try {
    _RC = require('react-native-purchases').default as RCType;
    return _RC;
  } catch {
    return null;
  }
}

function isPremiumInCustomerInfo(info: CustomerInfo): boolean {
  return PREMIUM_ENTITLEMENT in info.entitlements.active;
}

async function findPackageByProductId(
  rc: RCType,
  productId: string,
): Promise<RCPackage | null> {
  const { all } = await rc.getOfferings();
  for (const offering of Object.values(all) as any[]) {
    const pkg = (offering as any).availablePackages.find(
      (p: any) => p.product.identifier === productId,
    );
    if (pkg) return pkg;
  }
  return null;
}

async function rcPurchase(productId: ProductId): Promise<PurchaseResult> {
  const rc = getRC()!;
  try {
    const pkg = await findPackageByProductId(rc, productId);

    let customerInfo: CustomerInfo;

    if (pkg) {
      ({ customerInfo } = await rc.purchasePackage(pkg));
    } else {
      // Product not in any offering — fetch directly (consumables not in default offering)
      const products = await rc.getProducts([productId]);
      if (!products.length) {
        return {
          success: false,
          cancelled: false,
          error: "Produit introuvable dans l'App Store",
        };
      }
      // purchaseStoreProduct available in react-native-purchases v7+
      ({ customerInfo } = await (rc as any).purchaseStoreProduct(products[0]));
    }

    if (isPremiumInCustomerInfo(customerInfo)) notifyListeners(true);
    return { success: true, productId };
  } catch (e: any) {
    // RC error code '1' or userCancelled flag = user dismissed the sheet
    if (e?.code === '1' || e?.userCancelled === true) {
      return { success: false, cancelled: true };
    }
    return {
      success: false,
      cancelled: false,
      error: e?.message ?? 'Erreur lors de l\'achat',
    };
  }
}

async function rcRestore(): Promise<boolean> {
  const rc = getRC()!;
  try {
    const customerInfo = await rc.restorePurchases();
    const isPremium = isPremiumInCustomerInfo(customerInfo);
    notifyListeners(isPremium);
    return isPremium;
  } catch {
    return false;
  }
}

// ── Public API ────────────────────────────────────────────────────────────────

export const StoreService = {
  /**
   * Initialize RevenueCat. Call once at app startup (root _layout.tsx).
   * Safe to call multiple times — no-op after first call.
   */
  async configure(): Promise<void> {
    if (_configured) return;
    _configured = true;

    if (!isRCAvailable()) {
      // No RC native module or no API key → use mock
      const active = MockStore.isActive();
      if (active !== _premiumCache) notifyListeners(active);
      return;
    }

    const rc = getRC();
    if (!rc) return;

    _usingRC = true;

    try {
      if (__DEV__) {
        const { LOG_LEVEL } = require('react-native-purchases');
        rc.setLogLevel(LOG_LEVEL.DEBUG);
      }

      rc.configure({ apiKey: getActiveKey() });

      // Fetch current entitlement state (handles offline via RC cache)
      const customerInfo = await rc.getCustomerInfo();
      notifyListeners(isPremiumInCustomerInfo(customerInfo));

      // Live listener: fires on renewal, expiry, server-side revocation, etc.
      rc.addCustomerInfoUpdateListener((info) => {
        notifyListeners(isPremiumInCustomerInfo(info));
      });
    } catch (e) {
      if (__DEV__) console.warn('[StoreService] RevenueCat configure failed:', e);
      // Degrade gracefully: keep cached value
    }
  },

  /** Product catalog (static — prices come from App Store at checkout). */
  async getProducts(): Promise<Product[]> {
    return CATALOG;
  },

  /** Purchase a product. RevenueCat in production, mock in Expo Go / web. */
  async purchase(productId: ProductId): Promise<PurchaseResult> {
    if (_usingRC) return rcPurchase(productId);
    return MockStore.purchase(productId);
  },

  /** Restore previous purchases (required button in App Store guidelines). */
  async restore(): Promise<boolean> {
    if (_usingRC) return rcRestore();
    return MockStore.restore();
  },

  /**
   * Synchronous premium check — fast cache read, always fresh after configure().
   * Used in usePremium initial state and isCardLocked.
   */
  isPremiumActive(): boolean {
    if (!_usingRC) return MockStore.isActive();
    return _premiumCache;
  },

  /**
   * Subscribe to premium state changes.
   * Fires on: purchase, restore, subscription renewal/expiry, RC server webhook.
   * Returns an unsubscribe function — call it in useEffect cleanup.
   */
  onPremiumChange(fn: (isPremium: boolean) => void): () => void {
    _premiumListeners.add(fn);
    return () => _premiumListeners.delete(fn);
  },

  /** Dev-only bypass — never called in production RevenueCat flow. */
  unlockPremium(durationMs = 30 * 86400000) {
    if (_usingRC && !__DEV__) return; // Silent no-op in prod RC builds
    MockStore.unlock(durationMs);
  },

  /** Dev-only: revoke premium (for testing paywall). */
  revokePremium() {
    MockStore.revoke();
  },
};
