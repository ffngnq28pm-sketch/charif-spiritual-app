import { useState, useEffect, useCallback } from 'react';
import { StoreService, ProductId, PurchaseResult } from '@/services/StoreService';

/** Nombre de cartes accessibles sans abonnement (par index dans CARDS[]). */
export const FREE_CARD_LIMIT = 50;

export type PremiumPlan = 'monthly' | 'lifetime';

export interface PremiumState {
  isPremium: boolean;
  isLoading: boolean;
  purchasePlan: (plan: PremiumPlan) => Promise<PurchaseResult>;
  restorePurchases: () => Promise<boolean>;
  purchaseTip: (size: 'small' | 'medium' | 'large') => Promise<PurchaseResult>;
  isCardLocked: (cardIndex: number) => boolean;
  unlockPremium: () => void;
}

const PLAN_MAP: Record<PremiumPlan, ProductId> = {
  monthly: 'nour_premium_monthly',
  lifetime: 'nour_premium_lifetime',
};
const TIP_MAP: Record<'small' | 'medium' | 'large', ProductId> = {
  small: 'tip_small',
  medium: 'tip_medium',
  large: 'tip_large',
};

// Partagé entre toutes les instances du hook sans Context
let _isPremium = false;
let _listeners: Array<(v: boolean) => void> = [];

function broadcast(v: boolean) {
  _isPremium = v;
  _listeners.forEach((fn) => fn(v));
}

export function usePremium(): PremiumState {
  const [isPremium, setIsPremium] = useState(_isPremium);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Sync from persistent cache on mount (fast path)
    const stored = StoreService.isPremiumActive();
    if (stored !== _isPremium) broadcast(stored);

    // Register in the module-level broadcast list
    _listeners.push(setIsPremium);

    // Subscribe to RevenueCat live updates (renewal, expiry, webhook)
    const unsubRC = StoreService.onPremiumChange(broadcast);

    return () => {
      _listeners = _listeners.filter((fn) => fn !== setIsPremium);
      unsubRC();
    };
  }, []);

  const purchasePlan = useCallback(async (plan: PremiumPlan): Promise<PurchaseResult> => {
    setIsLoading(true);
    try {
      const result = await StoreService.purchase(PLAN_MAP[plan]);
      if (result.success) broadcast(true);
      return result;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const restorePurchases = useCallback(async (): Promise<boolean> => {
    setIsLoading(true);
    try {
      const ok = await StoreService.restore();
      if (ok) broadcast(true);
      return ok;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const purchaseTip = useCallback(
    async (size: 'small' | 'medium' | 'large'): Promise<PurchaseResult> => {
      setIsLoading(true);
      try {
        return await StoreService.purchase(TIP_MAP[size]);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const isCardLocked = useCallback(
    (cardIndex: number) => !isPremium && cardIndex >= FREE_CARD_LIMIT,
    [isPremium]
  );

  const unlockPremium = useCallback(() => {
    StoreService.unlockPremium();
    broadcast(true);
  }, []);

  return { isPremium, isLoading, purchasePlan, restorePurchases, purchaseTip, isCardLocked, unlockPremium };
}
