import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Keep this module client-safe: only NEXT_PUBLIC_* env vars.
if (!supabaseUrl || !supabaseAnonKey) {
  // This throws at runtime if env vars are missing, which is clearer than
  // silently failing and producing confusing "fetch failed" errors.
  throw new Error(
    "Missing Supabase env vars. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

