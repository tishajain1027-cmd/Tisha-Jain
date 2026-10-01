// Client-side Supabase configuration for the Baby Shower RSVP form.
// Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment variables,
// or replace the fallback strings below with your Supabase Project URL and Anon Public Key.

export const SUPABASE_URL: string =
  import.meta.env.VITE_SUPABASE_URL || '';

export const SUPABASE_ANON_KEY: string =
  import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export interface SupabaseRsvpRow {
  name: string;
  guest_count: number;
  response: 'accepted' | 'declined';
  message?: string;
  submitted_at: string;
}

interface SupabaseQueryResult {
  data: unknown;
  error: { message?: string } | null;
}

interface SupabaseTableClient {
  insert: (rows: SupabaseRsvpRow[]) => Promise<SupabaseQueryResult>;
  select: (columns?: string) => Promise<SupabaseQueryResult>;
}

export interface SupabaseClientInstance {
  from: (table: string) => SupabaseTableClient;
  functions?: {
    invoke: (
      functionName: string,
      options?: { body?: Record<string, unknown> }
    ) => Promise<SupabaseQueryResult>;
  };
}

declare global {
  interface Window {
    supabase?: {
      createClient: (url: string, anonKey: string) => SupabaseClientInstance;
    };
  }
}

let cachedClient: SupabaseClientInstance | null = null;

export function isSupabaseConfigured(): boolean {
  return Boolean(
    SUPABASE_URL &&
      SUPABASE_ANON_KEY &&
      SUPABASE_URL.startsWith('https://') &&
      !SUPABASE_URL.includes('your-project-id') &&
      !SUPABASE_ANON_KEY.includes('your-public-anon-key')
  );
}

export function getSupabase(): SupabaseClientInstance | null {
  if (!isSupabaseConfigured()) {
    return null;
  }
  if (cachedClient) {
    return cachedClient;
  }
  if (typeof window !== 'undefined' && window.supabase?.createClient) {
    cachedClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    return cachedClient;
  }
  return null;
}
