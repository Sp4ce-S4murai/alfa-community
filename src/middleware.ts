import { supabase } from '@lib/supabase';
import type { APIContext, MiddlewareNext } from 'astro';

// Define quais rotas são protegidas
const protectedRoutes = ['/', '/membros', '/cursos', '/perfil', '/post'];

export async function onRequest(context: APIContext, next: MiddlewareNext) {
  // 1. Verifica se a rota atual é protegida
  const isProtectedRoute = protectedRoutes.some((route) => {
    // Lógica de verificação mais precisa:
    if (route === '/') {
      return context.url.pathname === '/'; // Apenas a raiz exata
    }
    return context.url.pathname.startsWith(route);
  });

  // Se não for rota protegida (ex: /login, /cadastro), apenas continue
  if (!isProtectedRoute) {
    return next();
  }

  // 2. Tenta obter o usuário a partir dos cookies
  const accessToken = context.cookies.get('sb-access-token');
  const refreshToken = context.cookies.get('sb-refresh-token');

  let user: any = null;

  if (accessToken && refreshToken) {
    const { data } = await supabase.auth.setSession({
      access_token: accessToken.value,
      refresh_token: refreshToken.value,
    });
    user = data.user;
  }

  // 3. Lógica de Redirecionamento
  if (!user) {
    // Usuário não logado e em rota protegida: REDIRECIONA
    return context.redirect('/login');
  }

  // 4. Usuário está logado e em rota protegida:
  // Salva o usuário no 'context.locals' para que as páginas .astro possam usá-lo
  context.locals.user = user;

  // Continua para a renderização da página
  return next();
}