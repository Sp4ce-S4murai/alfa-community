import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { AstroCookies } from 'astro';

// 1. Obtém as variáveis de ambiente
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Variáveis de ambiente do Supabase não estão definidas.');
}

// 2. EXPORTA O CLIENTE VANILLA (PARA O LADO DO CLIENTE)
// ESTA É A MUDANÇA CRÍTICA: usar storage baseado em cookies no browser
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Em vez de LocalStorage (padrão), usamos um storage de cookie
    // que funciona no browser e previne erros no SSR (typeof document)
    storage: {
      getItem: (key) => {
        if (typeof document === 'undefined') return null;
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
          const c = cookies[i].trim();
          if (c.startsWith(key + '=')) {
            return decodeURIComponent(c.substring(key.length + 1));
          }
        }
        return null;
      },
      setItem: (key, value) => {
        if (typeof document === 'undefined') return;
        const secure = import.meta.env.PROD ? 'secure' : '';
        document.cookie = `${key}=${encodeURIComponent(value)}; path=/; max-age=31536000; samesite=lax; ${secure}`;
      },
      removeItem: (key) => {
        if (typeof document === 'undefined') return;
        const secure = import.meta.env.PROD ? 'secure' : '';
        document.cookie = `${key}=; path=/; max-age=0; samesite=lax; ${secure}`;
      },
    },
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// 3. EXPORTA O HELPER DO LADO DO SERVIDOR (COMO ESTAVA)
// (Usado em middleware.ts, frontmatter de .astro, etc.)
export const createSupabaseServerClient = (cookies: AstroCookies): SupabaseClient => {
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      storage: {
        getItem: (key) => cookies.get(key)?.value ?? null,
        setItem: (key, value) => {
          cookies.set(key, value, {
            path: '/',
            httpOnly: true,
            sameSite: 'lax',
            secure: import.meta.env.PROD,
            maxAge: 60 * 60 * 24 * 365,
          });
        },
        removeItem: (key) => {
          cookies.delete(key, { path: '/' });
        },
      },
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  });
};