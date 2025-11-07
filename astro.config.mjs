// @ts-check
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import vercel from '@astrojs/vercel'; // <-- IMPORTAR O ADAPTADOR VERCEL
import { supabase } from '@supabase/auth-helpers-astro'; // <-- IMPORTAR A INTEGRAÇÃO SUPABASE
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  
  // 1. DEFINIR O ADAPTADOR CORRETO
  adapter: vercel(), 
  
  // 2. ADICIONAR A INTEGRAÇÃO DO SUPABASE
  integrations: [
    supabase()
  ],
  
  // (O resto da sua configuração de vite/alias está correta)
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
        '@lib': fileURLToPath(new URL('./src/lib', import.meta.url)),
        '@layouts': fileURLToPath(new URL('./src/layouts', import.meta.url)),
        '@styles': fileURLToPath(new URL('./src/styles', import.meta.url))
      }
    }
  }
});