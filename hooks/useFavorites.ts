import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
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
        const { data: session } = await supabase.auth.getSession();
        if (!session.session) {
          // No session: use local storage
          setFavoriteIds(loadLocal());
          setLoading(false);
          return;
        }
        const { data } = await supabase.from('favorites').select('card_id');
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
    const { data: session } = await supabase.auth.getSession();
    const userId = session.session?.user.id;

    setFavoriteIds((prev) => {
      const next = new Set(prev);
      if (next.has(cardId)) {
        next.delete(cardId);
      } else {
        next.add(cardId);
      }
      if (!userId) saveLocal(next);
      return next;
    });

    if (userId) {
      if (favoriteIds.has(cardId)) {
        await supabase.from('favorites').delete().eq('card_id', cardId).eq('user_id', userId);
      } else {
        await supabase.from('favorites').insert({ card_id: cardId, user_id: userId });
      }
    }
  }, [favoriteIds]);

  return { favoriteIds, toggleFavorite, loading };
}
