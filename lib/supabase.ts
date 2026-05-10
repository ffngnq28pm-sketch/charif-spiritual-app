import 'react-native-url-polyfill/auto';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL ?? '';
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '';

export const supabaseEnabled = supabaseUrl.length > 10 && supabaseKey.length > 10;

// Lazy singleton — only created when credentials are present
let _client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!supabaseEnabled) return null;
  if (!_client) {
    try {
      _client = createClient(supabaseUrl, supabaseKey);
    } catch {
      return null;
    }
  }
  return _client;
}

// Legacy export — returns null when not configured (callers must guard)
export const supabase = supabaseEnabled
  ? createClient(supabaseUrl, supabaseKey)
  : null as unknown as SupabaseClient;
