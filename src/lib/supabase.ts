import { createClient } from '@supabase/supabase-js';
import { createServerClient } from '@supabase/ssr';


const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Variáveis de ambiente do Supabase não estão definidas.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper para páginas SSR (Astro) usando cookies
export function createSupabaseServerClient(cookies: {
  get: (name: string) => string | undefined;
  set: (name: string, value: string, options?: any) => void;
  delete: (name: string, options?: any) => void;
}) {
  return createServerClient(supabaseUrl!, supabaseAnonKey!, {
    cookies: {
      get: (name: string) => cookies.get(name),
      set: (name: string, value: string, options?: any) => {
        const isProd = import.meta.env.PROD;
        const base = options ?? {};
        cookies.set(name, value, {
          ...base,
          path: base.path ?? '/',
          httpOnly: base.httpOnly ?? true,
          sameSite: base.sameSite ?? 'lax',
          secure: base.secure ?? (isProd ? true : false),
        });
      },
      delete: (name: string, options?: any) => {
        const isProd = import.meta.env.PROD;
        const base = options ?? {};
        cookies.delete(name, {
          ...base,
          path: base.path ?? '/',
          httpOnly: base.httpOnly ?? true,
          sameSite: base.sameSite ?? 'lax',
          secure: base.secure ?? (isProd ? true : false),
        });
      },
    },
  });
}