import { createSupabaseServerClient } from './lib/supabase';
import type { APIContext, MiddlewareNext } from 'astro';

// Define quais rotas são protegidas
const protectedRoutes = ['/', '/membros', '/cursos', '/perfil', '/post'];

// Define rotas que um utilizador logado NÃO deve aceder
const authRoutes = ['/login', '/cadastro'];

export async function onRequest(context: APIContext, next: MiddlewareNext) {
  
  // 1. Cria o cliente Supabase para o servidor (lê os cookies)
  const supabase = createSupabaseServerClient(context.cookies);

  // 2. Tenta obter o utilizador
  // Esta única linha lê o cookie e valida a sessão
  const { data: { user } } = await supabase.auth.getUser();

  // 3. Salva o utilizador no 'context.locals' para as páginas .astro usarem
  if (user) {
    context.locals.user = user;
  }

  // ---- LÓGICA DE REDIRECIONAMENTO ----

  const currentPath = context.url.pathname;
  const isProtectedRoute = protectedRoutes.some(route => {
    if (route === '/') return currentPath === '/';
    return currentPath.startsWith(route);
  });
  const isAuthRoute = authRoutes.includes(currentPath);

  // 4. Se estiver numa rota protegida e NÃO tiver utilizador
  if (isProtectedRoute && !user) {
    return context.redirect('/login');
  }

  // 5. Se estiver numa rota de login (ex: /login) e TIVER utilizador
  if (isAuthRoute && user) {
    // Redireciona para o 'início' (o feed)
    return context.redirect('/');
  }
  
  // 6. Se nada disto acontecer, apenas continua para a página
  return next();
}