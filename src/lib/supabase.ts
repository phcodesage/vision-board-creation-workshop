import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Define a helper to check if keys are valid and not placeholders
const isConfigured = (url: string, key: string) => {
  return (
    url && 
    key && 
    url.length > 0 && 
    key.length > 0 &&
    !url.includes('your-project-id') && 
    !key.includes('your-anon-key') && 
    !key.includes('your-service-role-key')
  );
};

// Return null if not configured, otherwise return a working client
export const getSupabase = () => {
  if (!isConfigured(supabaseUrl, supabaseAnonKey)) {
    return null;
  }
  return createClient(supabaseUrl, supabaseAnonKey);
};

export const getSupabaseAdmin = () => {
  if (!isConfigured(supabaseUrl, supabaseServiceRoleKey)) {
    return null;
  }
  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
};

// DO NOT export static clients here to prevent module-level initialization crashes
