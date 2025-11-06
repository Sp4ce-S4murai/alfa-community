import { createServerClient } from '@supabase/ssr';
import type { APIContext, MiddlewareNext } from 'astro';

// Rotas protegidas (como tínhamos antes)
const protectedRoutes = ['/', '/membros', '/cursos', '/perfil', '/post', '/conta'];
const authRoutes = ['/login', '/cadastro'];

// 1. Criamos o cliente DENTRO do middleware
export const onRequest = async (context: APIContext, next: MiddlewareNext) => {
  const supabase = createServerClient(
    import.meta.env.PUBLIC_SUPABASE_URL!,
    import.meta.env.PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name: string) => context.cookies.get(name)?.value,
        set: (name: string, value: string, options?: any) => {
          context.cookies.set(name, value, { ...(options ?? {}), path: options?.path ?? '/' });
        },
        remove: (name: string, options?: any) => {
          context.cookies.delete(name, { ...(options ?? {}), path: options?.path ?? '/' });
        },
      },
    }
  );

  // Disponibiliza o cliente para as páginas SSR
  context.locals.supabase = supabase;

  // 2. Obtém o utilizador autenticado
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    context.locals.user = user;
  }

  // 3. Lógica de proteção de rotas
  const currentPath = context.url.pathname;
  const isProtectedRoute = protectedRoutes.some(
    (route) => (currentPath.startsWith(route) && route.length > 1) || currentPath === '/'
  );
  const isAuthRoute = authRoutes.includes(currentPath);

  if (isProtectedRoute && !user) {
    return context.redirect('/login');
  }

  if (isAuthRoute && user) {
    return context.redirect('/');
  }

  // 4. Segue o fluxo normal
  return next();
};