import { useState, useEffect, useCallback } from 'react';
import { supabaseEnabled, getSupabase } from '@/lib/supabase';
import { AsyncStorage_like } from '@/context/storage';

const LOCAL_KEY = 'nour_favorites_v1';

function loadLocal(): Set<string> {
  const raw = AsyncStorage_like.get(LOCAL_KEY);
  if (!raw) return new Set();
  try { return new Set(JSON.parse(raw)); } catch { return new Set(); }
}

function saveLocal(ids: Set<string>) {
  AsyncStorage_like.set(LOCAL_KEY, JSON.stringify([...ids]));
}

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const sb = getSupabase();
        if (!sb) {
          setFavoriteIds(loadLocal());
          setLoading(false);
          return;
        }
        const { data: session } = await sb.auth.getSession();
        if (!session.session) {
          setFavoriteIds(loadLocal());
          setLoading(false);
          return;
        }
        const { data } = await sb.from('favorites').select('card_id');
        if (data) setFavoriteIds(new Set(data.map((f: any) => f.card_id)));
      } catch {
        setFavoriteIds(loadLocal());
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const toggleFavorite = useCallback(async (cardId: string) => {
    const sb = getSupabase();
    let userId: string | undefined;

    if (sb) {
      try {
        const { data: session } = await sb.auth.getSession();
        userId = session.session?.user.id;
      } catch {}
    }

    setFavoriteIds((prev) => {
      const next = new Set(prev);
      next.has(cardId) ? next.delete(cardId) : next.add(cardId);
      if (!userId) saveLocal(next);
      return next;
    });

    if (sb && userId) {
      try {
        if (favoriteIds.has(cardId)) {
          await sb.from('favorites').delete().eq('card_id', cardId).eq('user_id', userId);
        } else {
          await sb.from('favorites').insert({ card_id: cardId, user_id: userId });
        }
      } catch {}
    }
  }, [favoriteIds]);

  return { favoriteIds, toggleFavorite, loading };
}
