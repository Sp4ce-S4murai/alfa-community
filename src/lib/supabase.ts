import { createClient } from '@supabase/supabase-js';

// Obtém as variáveis de ambiente do Astro
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string | undefined;

// Validação
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Variáveis de ambiente do Supabase (URL e Anon Key) não estão definidas.');
}

// Exporta o cliente inicializado
export const supabase = createClient(supabaseUrl, supabaseAnonKey);